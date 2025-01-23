<?php defined('APP_FRAMEWORK') OR exit('No direct script access allowed');

// App Configuration
define('APP_MODE', "development");  // development or production
define('ERROR_LOG', true);
define('DEFAULT_CONTROLLER', 'Home');
define('DEFAULT_METHOD', 'index');


// Directory Configuration
define('_ROOT_', __DIR__);
define('APP_PATH', _ROOT_ . '/apps/');
define('CONTROLLER_PATH', APP_PATH . 'controllers/');
define('MODEL_PATH', APP_PATH . 'models/');
define('VIEW_PATH', 'resources/');
define('HELPER_PATH', APP_PATH . 'helpers/'); 


// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'company_profile');


// Base URL Configuration - Auto detect base URL
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'];
$baseFolder = dirname($_SERVER['SCRIPT_NAME']);
$baseFolder = $baseFolder === '\\' || $baseFolder === '/' ? '' : $baseFolder;
define('BASE_URL', $protocol . $host . $baseFolder);



