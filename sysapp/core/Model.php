<?php defined('_ROOT_') OR exit('No direct script access allowed');

class Model {
    protected $table;
    protected $builder;

    public function __construct() {
        $this->builder = new DbBuilder();
    }

    public function all() {
        return $this->builder->table($this->table)->get();
    }

    public function find($id) {
        return $this->builder->table($this->table)->where('id', $id)->first();
    }

    public function create(array $data) {
        return $this->builder->table($this->table)->insert($data);
    }

    public function update($id, array $data) {
        return $this->builder->table($this->table)->where('id', $id)->update($data);
    }

    public function delete($id) {
        return $this->builder->table($this->table)->where('id', $id)->delete();
    }

    public function __get($key)
    {
        return get_instance()->$key;
    }
} 