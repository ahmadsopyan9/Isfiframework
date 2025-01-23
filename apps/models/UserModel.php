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
            ->get();
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
} 