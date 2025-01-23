<?php defined('_ROOT_') OR exit('No direct script access allowed');

class View {
    public function render($view, $data = []) {

        extract($data);
        
        // Path file 
        $viewFile = VIEW_PATH . $view . '.php';
        
        if(file_exists($viewFile)) {
            require_once $viewFile;
        } else {
            throw new Exception("View file {$view} tidak ditemukan");
        }
    }

    public function getAsset($path) {
        return BASE_URL . '/assets/' . $path;
    }
} 