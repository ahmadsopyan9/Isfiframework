<?php defined('APP_FRAMEWORK') OR exit('No direct script access allowed');
 
require_once 'app_config.php';

if(APP_MODE == "development"){
    error_reporting(E_ALL); 
    ini_set('display_errors', 1); 
}


spl_autoload_register(function($className) {
    $paths = [
        'apps/controllers/',
        'apps/models/',
        'apps/libraries/',
        'sysapp/core/',
    ];

    foreach($paths as $path) {
        $file = $path . $className . '.php';
        if(file_exists($file)) {
            require_once $file;
            return;
        }
    }
}); 

foreach (glob('apps/helpers/*.php') as $helperFile) {
    require_once $helperFile;
}

if(file_exists(__DIR__."/vendor/autoload.php")){
    require_once(__DIR__."/vendor/autoload.php");
}