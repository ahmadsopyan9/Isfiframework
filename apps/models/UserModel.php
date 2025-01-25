<?php
defined('_ROOT_') OR exit('No direct script access allowed');

class UserModel extends Model {

    protected $table = 'users';

    public function __construct() {
        parent::__construct();
    }

    public function getActiveUsers() {
        return $this->builder
            ->table($this->table)
            ->select("*")
            ->orderBy('name', 'ASC')
            ->resultObject();
    }

    public function getUserByEmail($email) {
        return $this->builder
            ->table($this->table)
            ->select("*")
            ->where('email', $email)
            ->rowObject();
    }

    public function insertUser($data)
    {
        $result = $this->builder->table('users')->insert($data);
        return $result->insert_id();
    }

    public function updateUser(array $where, array $data)
    {
        $success = $this->builder->table('users')->where($where)->update($data);
        return $success;
    }

    public function getUserWithPosts($userId) {
        return $this->builder
            ->table($this->table)
            ->select([
                'users.id',
                'users.name',
                'posts.title',
                'posts.content'
            ])
            ->join('posts', 'users.id', '=', 'posts.user_id')
            ->where('users.id', $userId)
            ->get();
    }

    public function getUserByResetToken($reset_token) {
        return $this->builder
            ->table($this->table)
            ->select("*")
            ->where('reset_token', $reset_token)
            ->rowObject();
    }

    public function getUserByActivationToken($activation_token) {
        return $this->builder
            ->table($this->table)
            ->select("*")
            ->where('activation_token', $activation_token)
            ->rowObject();
    }
} 