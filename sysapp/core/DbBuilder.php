<?php defined('_ROOT_') OR exit('No direct script access allowed');

class DbBuilder {
    private $db;
    private $table;
    private $select = '*';
    private $where = [];
    private $params = [];
    private $paramCount = 0;
    private $joins = [];
    private $orWhere = [];
    private $orderBy = [];
    private $groupBy = [];

    public function __construct($table = '') {
        $this->db = Database::getInstance();
        $this->table = $table;
    }

    public function table($table) {
        $this->table = $table;
        return $this;
    }

    public function select($columns) {
        if(is_array($columns)) {
            $this->select = implode(', ', $columns);
        } else {
            $this->select = $columns;
        }
        return $this;
    }

    public function where($field, $operator = null, $value = null) {
        // Support where array
        if(is_array($field)) {
            foreach($field as $key => $val) {
                $this->paramCount++;
                $param = ":where{$this->paramCount}";
                $this->where[] = "{$key} = {$param}";
                $this->params[$param] = $val;
            }
            return $this;
        }

        // Support where with operator
        if($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->paramCount++;
        $param = ":where{$this->paramCount}";
        $this->where[] = "{$field} {$operator} {$param}";
        $this->params[$param] = $value;

        return $this;
    }

    public function selectDistinct($columns) {
        if(is_array($columns)) {
            $this->select = 'DISTINCT ' . implode(', ', $columns);
        } else {
            $this->select = 'DISTINCT ' . $columns;
        }
        return $this;
    }

    public function join($table, $first, $operator = null, $second = null, $type = 'INNER') {
        if($operator === null) {
            $this->joins[] = "{$type} JOIN {$table} ON {$first}";
        } else {
            if($second === null) {
                $second = $operator;
                $operator = '=';
            }
            $this->joins[] = "{$type} JOIN {$table} ON {$first} {$operator} {$second}";
        }
        return $this;
    }

    public function leftJoin($table, $first, $operator = null, $second = null) {
        return $this->join($table, $first, $operator, $second, 'LEFT');
    }

    public function rightJoin($table, $first, $operator = null, $second = null) {
        return $this->join($table, $first, $operator, $second, 'RIGHT');
    }

    public function whereIn($field, $values) {
        if(empty($values)) return $this;
        
        $params = [];
        foreach($values as $i => $value) {
            $this->paramCount++;
            $param = ":wherein{$this->paramCount}";
            $params[] = $param;
            $this->params[$param] = $value;
        }
        
        $this->where[] = "{$field} IN (" . implode(', ', $params) . ")";
        return $this;
    }

    public function orWhere($field, $operator = null, $value = null) {
        if(is_array($field)) {
            foreach($field as $key => $val) {
                $this->paramCount++;
                $param = ":orwhere{$this->paramCount}";
                $this->orWhere[] = "{$key} = {$param}";
                $this->params[$param] = $val;
            }
            return $this;
        }

        if($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->paramCount++;
        $param = ":orwhere{$this->paramCount}";
        $this->orWhere[] = "{$field} {$operator} {$param}";
        $this->params[$param] = $value;

        return $this;
    }

    public function orderBy($column, $direction = 'ASC') {
        $this->orderBy[] = "{$column} " . strtoupper($direction);
        return $this;
    }

    public function groupBy($columns) {
        if(is_array($columns)) {
            foreach($columns as $column) {
                $this->groupBy[] = $column;
            }
        } else {
            $this->groupBy[] = $columns;
        }
        return $this;
    }

    public function get() {
        $query = "SELECT {$this->select} FROM {$this->table}";
        
        if(!empty($this->joins)) {
            $query .= " " . implode(' ', $this->joins);
        }
        
        $whereClauses = [];
        if(!empty($this->where)) {
            $whereClauses[] = "(" . implode(' AND ', $this->where) . ")";
        }
        if(!empty($this->orWhere)) {
            $whereClauses[] = "(" . implode(' OR ', $this->orWhere) . ")";
        }
        
        if(!empty($whereClauses)) {
            $query .= " WHERE " . implode(' AND ', $whereClauses);
        }

        if(!empty($this->groupBy)) {
            $query .= " GROUP BY " . implode(', ', $this->groupBy);
        }

        if(!empty($this->orderBy)) {
            $query .= " ORDER BY " . implode(', ', $this->orderBy);
        }

        $stmt = $this->db->query($query);
        
        foreach($this->params as $param => $value) {
            $stmt->bind($param, $value);
        }

        return $stmt->resultSet();
    }

    public function first() {
        $query = "SELECT {$this->select} FROM {$this->table}";
        
        if(!empty($this->joins)) {
            $query .= " " . implode(' ', $this->joins);
        }
        
        $whereClauses = [];
        if(!empty($this->where)) {
            $whereClauses[] = "(" . implode(' AND ', $this->where) . ")";
        }
        if(!empty($this->orWhere)) {
            $whereClauses[] = "(" . implode(' OR ', $this->orWhere) . ")";
        }
        
        if(!empty($whereClauses)) {
            $query .= " WHERE " . implode(' AND ', $whereClauses);
        }

        $stmt = $this->db->query($query);
        
        foreach($this->params as $param => $value) {
            $stmt->bind($param, $value);
        }

        return $stmt->single();
    }

    public function row() {
        return $this->get()->row();
    }

    public function rowObject() {
        $query = "SELECT {$this->select} FROM {$this->table}";
        
        if(!empty($this->joins)) {
            $query .= " " . implode(' ', $this->joins);
        }
        
        $whereClauses = [];
        if(!empty($this->where)) {
            $whereClauses[] = "(" . implode(' AND ', $this->where) . ")";
        }
        if(!empty($this->orWhere)) {
            $whereClauses[] = "(" . implode(' OR ', $this->orWhere) . ")";
        }
        
        if(!empty($whereClauses)) {
            $query .= " WHERE " . implode(' AND ', $whereClauses);
        }

        $stmt = $this->db->query($query);
        
        foreach($this->params as $param => $value) {
            $stmt->bind($param, $value);
        }

        return $stmt->single(PDO::FETCH_OBJ);
    }
    
    public function resultObject() {
        $query = "SELECT {$this->select} FROM {$this->table}";
        
        if(!empty($this->joins)) {
            $query .= " " . implode(' ', $this->joins);
        }
        
        $whereClauses = [];
        if(!empty($this->where)) {
            $whereClauses[] = "(" . implode(' AND ', $this->where) . ")";
        }
        if(!empty($this->orWhere)) {
            $whereClauses[] = "(" . implode(' OR ', $this->orWhere) . ")";
        }
        
        if(!empty($whereClauses)) {
            $query .= " WHERE " . implode(' AND ', $whereClauses);
        }
    
        if(!empty($this->groupBy)) {
            $query .= " GROUP BY " . implode(', ', $this->groupBy);
        }
    
        if(!empty($this->orderBy)) {
            $query .= " ORDER BY " . implode(', ', $this->orderBy);
        }
    
        $stmt = $this->db->query($query);
        
        foreach($this->params as $param => $value) {
            $stmt->bind($param, $value);
        }
    
        return $stmt->resultSet(PDO::FETCH_OBJ);
    }

    public function insert_id() {
        return $this->db->lastInsertId();
    }

    public function insert($data) {
        // if single
        if(!isset($data[0])) {
            $columns = implode(', ', array_keys($data));
            $values = ':' . implode(', :', array_keys($data));
            
            $query = "INSERT INTO {$this->table} ({$columns}) VALUES ({$values})";
            
            $stmt = $this->db->query($query);
            
            foreach($data as $key => $value) {
                $stmt->bind(":{$key}", $value);
            }
            
            $stmt->execute();
            return $this;
        }
        
        // if multi
        $columns = implode(', ', array_keys($data[0]));
        $valuesList = [];
        $params = [];
        
        foreach($data as $i => $row) {
            $rowParams = [];
            foreach($row as $key => $value) {
                $param = ":{$key}{$i}";
                $rowParams[] = $param;
                $params[$param] = $value;
            }
            $valuesList[] = '(' . implode(', ', $rowParams) . ')';
        }
        
        $query = "INSERT INTO {$this->table} ({$columns}) VALUES " . implode(', ', $valuesList);
        
        $stmt = $this->db->query($query);
        
        foreach($params as $param => $value) {
            $stmt->bind($param, $value);
        }
        
        $stmt->execute();
        return $this;
    }

    public function update($data) {
        $sets = [];
        foreach($data as $key => $value) {
            $this->paramCount++;
            $param = ":set{$this->paramCount}";
            $sets[] = "{$key} = {$param}";
            $this->params[$param] = $value;
        }

        $query = "UPDATE {$this->table} SET " . implode(', ', $sets);
        
        if(!empty($this->where)) {
            $query .= " WHERE " . implode(' AND ', $this->where);
        }

        $stmt = $this->db->query($query);
        
        foreach($this->params as $param => $value) {
            $stmt->bind($param, $value);
        }

        return $stmt->execute();
    }

    public function delete() {
        $query = "DELETE FROM {$this->table}";
        
        if(!empty($this->where)) {
            $query .= " WHERE " . implode(' AND ', $this->where);
        }

        $stmt = $this->db->query($query);
        
        foreach($this->params as $param => $value) {
            $stmt->bind($param, $value);
        }

        return $stmt->execute();
    }
} 