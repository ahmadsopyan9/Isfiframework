<?php 
defined('_ROOT_') OR exit('No direct script access allowed');


// Route
$route['default'] = 'home';
$route['blog/(:any)'] = 'blog/detail/$1';
