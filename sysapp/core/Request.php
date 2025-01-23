<?php defined('_ROOT_') OR exit('No direct script access allowed');

class Request {
    private $params;
    private $query;
    private $body;
    private $files;
    private $method;
    private $uri;

    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->uri = $_SERVER['REQUEST_URI'];
        $this->params = [];
        $this->query = $_GET;
        $this->body = $this->parseInput();
        $this->files = $_FILES;
    }

    private function parseInput() {
        $data = [];

        if ($this->method === 'POST') {
            $data = $_POST;
            $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
            
            if (strpos($contentType, 'application/json') !== false) {
                $json = file_get_contents('php://input');
                $jsonData = json_decode($json, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data = $jsonData;
                }
            }
        }

        return $data;
    }

    public function getMethod() {
        return $this->method;
    }

    public function isMethod($method) {
        return strtoupper($this->method) === strtoupper($method);
    }

    public function getUri() {
        return $this->uri;
    }

    public function setParams($params) {
        $this->params = $params;
    }

    public function getParam($key, $default = null) {
        return isset($this->params[$key]) ? $this->params[$key] : $default;
    }

    public function getQuery($key = null, $default = null) {
        if ($key === null) {
            return $this->query;
        }
        return isset($this->query[$key]) ? $this->query[$key] : $default;
    }

    public function getBody($key = null, $default = null) {
        if ($key === null) {
            return $this->body;
        }
        return isset($this->body[$key]) ? $this->body[$key] : $default;
    }

    public function getFile($key) {
        return isset($this->files[$key]) ? $this->files[$key] : null;
    }

    public function hasFile($key) {
        return isset($this->files[$key]) && $this->files[$key]['error'] !== UPLOAD_ERR_NO_FILE;
    }

    public function isAjax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }

    public function getHeader($key) {
        $headerKey = 'HTTP_' . strtoupper(str_replace('-', '_', $key));
        return isset($_SERVER[$headerKey]) ? $_SERVER[$headerKey] : null;
    }

    public function getIp() {
        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        }
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        return $_SERVER['REMOTE_ADDR'];
    }
} 