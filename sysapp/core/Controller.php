<?php defined('_ROOT_') OR exit('No direct script access allowed');

#[AllowDynamicProperties]  // for php v8,  comment this line if your php v7
class Controller {

    private static $instance;
    protected $view;
    protected $model;
    protected $request;
    protected $response;

    public function __construct() {
        self::$instance =& $this;
        $this->view = new View();
        $this->request = new Request();
        $this->response = new Response();
        $this->Logs = new Logs();
    }

    public function loadModel($modelName) {
        $modelFile = MODEL_PATH . $modelName . 'Model.php';
        if(file_exists($modelFile)) {
            require_once $modelFile;
            $modelClass = $modelName . 'Model';
            $this->{$modelClass} = new $modelClass();
            return $this;
        }
        return null;
    }

    public function loadHelper($helperName) {
        $helperFile = HELPER_PATH . $helperName . 'Helper.php';
        if(file_exists($helperFile)) {
            require_once $helperFile;
        }
    }

    public function setView($view, $data=[])
    {
        return $this->view->render($view, $data);
    }


    public static function &get_instance()
    {
        return self::$instance;
    }
} 