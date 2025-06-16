<?php defined('APP_FRAMEWORK') OR exit('No direct script access allowed');
 
require_once 'app_config.php';

if(APP_MODE == "development"){
    error_reporting(E_ALL); 
    ini_set('display_errors', 1); 
}

spl_autoload_register(function($className) {
    $paths = [
        APP_PATH . 'controllers/',
        APP_PATH . 'models/',
        APP_PATH . 'libraries/',
        _ROOT_ . '/sysapp/core/',
    ];

    foreach($paths as $path) {
        $file = $path . $className . '.php';
        if(file_exists($file)) {
            include_once $file;
            return;
        }
    }
}); 

foreach (glob(HELPER_PATH . '*.php') as $helperFile) {
    if (is_file($helperFile)) {
        require_once realpath($helperFile);
        debug_backtrace();
    }
}

if(file_exists(__DIR__."/vendor/autoload.php")){
    require_once(__DIR__."/vendor/autoload.php");
}

