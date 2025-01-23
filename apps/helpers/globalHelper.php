<?php

if (!function_exists('redirect')) {
    function redirect($url) {
        header('Location: ' . BASE_URL . '/' . $url);
        exit;
    }
}

if (!function_exists('asset')) {
    function asset($path) {
        return BASE_URL . '/assets/' . $path;
    }
}

if (!function_exists('base_url')) {
    function base_url($path = '') {
        return BASE_URL . '/' . $path;
    }
}

if (!function_exists('session')) {
    function session($key, $value = null) {
        if ($value === null) {
            return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
        }
        $_SESSION[$key] = $value;
    }
}

if (!function_exists('flash')) {
    function flash($message, $type = 'info') {
        $_SESSION['flash'] = [
            'message' => $message,
            'type' => $type
        ];
    }
} 


if(!function_exists("generateNumber"))
{
    function generateNumber($length=5)
    {
      $a = mt_rand(10000000,9999999999).rand().rand();
      $res = substr($a, 0,$length);
      return $res;
    }
}


if(!function_exists("predump"))
{
    function predump($object)
    {
        if(is_array($object) || is_object($object)) {
            header('Content-Type: application/json');
            echo json_encode($object);
        } else {
            echo '<pre>';
            var_dump($object);
            echo '</pre>';
        }
        exit();
    }
}