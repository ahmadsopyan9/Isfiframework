<?php defined('_ROOT_') OR exit('No direct script access allowed');

class View {

    public function render($view, $data = []) {
        $viewFile = VIEW_PATH . $view . '.php';

        if (!file_exists($viewFile)) {
            throw new Exception("View file '{$safeView}' tidak ditemukan.");
        }

        if (is_object($data)) {
            $data = get_object_vars($data);
        }

        if (is_array($data)) {
            extract($data);
        }

        ob_start();
        require $viewFile;
        ob_end_flush();
    }

    public function renderLayout($view, $data = []) {

        if (is_object($data)) {
            $data = get_object_vars($data);
        }

        if (is_array($data)) {
            extract($data);
        }
        
        // Path file 
        $viewFile = VIEW_PATH . $view . '.php';
        
        if(file_exists($viewFile)) {
            ob_start();
            require VIEW_PATH . "layouts/header.php";
            require VIEW_PATH . "layouts/navbar.php";
            require $viewFile;
            require VIEW_PATH . "layouts/footer.php";
            ob_end_flush();
        } else {
            throw new Exception("View file {$view} tidak ditemukan");
        }
    }

    public function getAsset($path) {
        return BASE_URL . '/assets/' . $path;
    }
} 