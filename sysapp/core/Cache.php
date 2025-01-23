<?php defined('_ROOT_') OR exit('No direct script access allowed');

class Cache {
    private $cachePath;
    private static $instance = null;
    private $defaultTTL = 3600; // 1 hours of seconds

    private function __construct() {
        $this->cachePath = 'storages/cache/';
        $this->createCacheDirectory();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function createCacheDirectory() {
        if (!file_exists($this->cachePath)) {
            mkdir($this->cachePath, 0777, true);
        }
    }

    private function getCacheFile($key) {
        return $this->cachePath . md5($key) . '.cache';
    }

    public function set($key, $value, $ttl = null) {
        $ttl = $ttl ?: $this->defaultTTL;
        
        $data = [
            'expires_at' => time() + $ttl,
            'value' => $value
        ];

        $cacheFile = $this->getCacheFile($key);
        return file_put_contents($cacheFile, serialize($data)) !== false;
    }

    public function get($key, $default = null) {
        $cacheFile = $this->getCacheFile($key);

        if (!file_exists($cacheFile)) {
            return $default;
        }

        $data = unserialize(file_get_contents($cacheFile));

        if ($data['expires_at'] < time()) {
            $this->delete($key);
            return $default;
        }

        return $data['value'];
    }

    public function delete($key) {
        $cacheFile = $this->getCacheFile($key);
        if (file_exists($cacheFile)) {
            return unlink($cacheFile);
        }
        return false;
    }

    public function clear() {
        $files = glob($this->cachePath . '*.cache');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
        return true;
    }

    public function remember($key, $callback, $ttl = null) {
        $value = $this->get($key);

        if ($value !== null) {
            return $value;
        }

        $value = $callback();
        $this->set($key, $value, $ttl);

        return $value;
    }

    public function has($key) {
        return $this->get($key) !== null;
    }

    public function increment($key, $value = 1) {
        $current = $this->get($key, 0);
        if (is_numeric($current)) {
            $new = $current + $value;
            $this->set($key, $new);
            return $new;
        }
        return false;
    }

    public function decrement($key, $value = 1) {
        return $this->increment($key, -$value);
    }

    public function setDefaultTTL($ttl) {
        $this->defaultTTL = $ttl;
    }

    public function getDefaultTTL() {
        return $this->defaultTTL;
    }
} 