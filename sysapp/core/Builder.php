<?php defined('_ROOT_') OR exit('No direct script access allowed');

class Builder {
    private $db;
    private $table;
    private $select = '*';
    private $where = [];
    private $orderBy = [];
    private $limit;
    private $offset;
    private $joins = [];
    private $groupBy = [];
    private $having = [];

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function table($table) {
        $this->table = $table;
        return $this;
    }

    public function select($columns) {
        $this->select = is_array($columns) ? implode(', ', $columns) : $columns;
        return $this;
    }

    public function where($column, $operator = null, $value = null) {
        if ($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->where[] = [
            'column' => $column,
            'operator' => $operator,
            'value' => $value,
            'type' => 'AND'
        ];

        return $this;
    }

    public function orWhere($column, $operator = null, $value = null) {
        if ($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->where[] = [
            'column' => $column,
            'operator' => $operator,
            'value' => $value,
            'type' => 'OR'
        ];

        return $this;
    }

    public function whereIn($column, array $values) {
        $this->where[] = [
            'column' => $column,
            'operator' => 'IN',
            'value' => $values,
            'type' => 'AND'
        ];

        return $this;
    }

    public function whereNotIn($column, array $values) {
        $this->where[] = [
            'column' => $column,
            'operator' => 'NOT IN',
            'value' => $values,
            'type' => 'AND'
        ];

        return $this;
    }

    public function join($table, $first, $operator = null, $second = null, $type = 'INNER') {
        $this->joins[] = [
            'table' => $table,
            'first' => $first,
            'operator' => $operator,
            'second' => $second,
            'type' => $type
        ];

        return $this;
    }

    public function leftJoin($table, $first, $operator = null, $second = null) {
        return $this->join($table, $first, $operator, $second, 'LEFT');
    }

    public function rightJoin($table, $first, $operator = null, $second = null) {
        return $this->join($table, $first, $operator, $second, 'RIGHT');
    }

    public function orderBy($column, $direction = 'ASC') {
        $this->orderBy[] = [
            'column' => $column,
            'direction' => strtoupper($direction)
        ];

        return $this;
    }

    public function groupBy($columns) {
        $this->groupBy = is_array($columns) ? $columns : [$columns];
        return $this;
    }

    public function having($column, $operator = null, $value = null) {
        if ($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->having[] = [
            'column' => $column,
            'operator' => $operator,
            'value' => $value
        ];

        return $this;
    }

    public function limit($limit) {
        $this->limit = $limit;
        return $this;
    }

    public function offset($offset) {
        $this->offset = $offset;
        return $this;
    }

    private function buildSelect() {
        return "SELECT {$this->select} FROM {$this->table}";
    }

    private function buildJoins() {
        $sql = '';
        foreach ($this->joins as $join) {
            $sql .= " {$join['type']} JOIN {$join['table']} ON {$join['first']}";
            if ($join['operator'] !== null) {
                $sql .= " {$join['operator']} {$join['second']}";
            }
        }
        return $sql;
    }

    private function buildWhere() {
        if (empty($this->where)) {
            return '';
        }

        $sql = ' WHERE';
        $first = true;

        foreach ($this->where as $where) {
            if (!$first) {
                $sql .= " {$where['type']}";
            }

            if ($where['operator'] === 'IN' || $where['operator'] === 'NOT IN') {
                $values = array_map(function($value) {
                    return is_string($value) ? "'{$value}'" : $value;
                }, $where['value']);
                $sql .= " {$where['column']} {$where['operator']} (" . implode(', ', $values) . ")";
            } else {
                $value = is_string($where['value']) ? "'{$where['value']}'" : $where['value'];
                $sql .= " {$where['column']} {$where['operator']} {$value}";
            }

            $first = false;
        }

        return $sql;
    }

    private function buildGroupBy() {
        if (empty($this->groupBy)) {
            return '';
        }
        return ' GROUP BY ' . implode(', ', $this->groupBy);
    }

    private function buildHaving() {
        if (empty($this->having)) {
            return '';
        }

        $sql = ' HAVING';
        $first = true;

        foreach ($this->having as $having) {
            if (!$first) {
                $sql .= ' AND';
            }

            $value = is_string($having['value']) ? "'{$having['value']}'" : $having['value'];
            $sql .= " {$having['column']} {$having['operator']} {$value}";

            $first = false;
        }

        return $sql;
    }

    private function buildOrderBy() {
        if (empty($this->orderBy)) {
            return '';
        }

        $orders = array_map(function($order) {
            return "{$order['column']} {$order['direction']}";
        }, $this->orderBy);

        return ' ORDER BY ' . implode(', ', $orders);
    }

    private function buildLimit() {
        if ($this->limit === null) {
            return '';
        }

        $sql = " LIMIT {$this->limit}";
        if ($this->offset !== null) {
            $sql .= " OFFSET {$this->offset}";
        }

        return $sql;
    }

    public function get() {
        $sql = $this->buildSelect();
        $sql .= $this->buildJoins();
        $sql .= $this->buildWhere();
        $sql .= $this->buildGroupBy();
        $sql .= $this->buildHaving();
        $sql .= $this->buildOrderBy();
        $sql .= $this->buildLimit();

        $this->db->query($sql);
        return $this->db->resultSet();
    }

    public function first() {
        $this->limit(1);
        $result = $this->get();
        return !empty($result) ? $result[0] : null;
    }

    public function insert(array $data) {
        $columns = implode(', ', array_keys($data));
        $values = implode(', ', array_fill(0, count($data), '?'));
        
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$values})";
        
        $this->db->query($sql);
        foreach ($data as $value) {
            $this->db->bind('?', $value);
        }
        
        return $this->db->execute();
    }

    public function update(array $data) {
        $sets = [];
        foreach ($data as $column => $value) {
            $sets[] = "{$column} = ?";
        }
        
        $sql = "UPDATE {$this->table} SET " . implode(', ', $sets);
        $sql .= $this->buildWhere();
        
        $this->db->query($sql);
        foreach ($data as $value) {
            $this->db->bind('?', $value);
        }
        
        return $this->db->execute();
    }

    public function delete() {
        $sql = "DELETE FROM {$this->table}";
        $sql .= $this->buildWhere();
        
        $this->db->query($sql);
        return $this->db->execute();
    }

    public function count() {
        $this->select = 'COUNT(*) as count';
        $result = $this->first();
        return (int) $result['count'];
    }
} 