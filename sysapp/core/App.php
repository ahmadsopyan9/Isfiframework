<?php defined('_ROOT_') OR exit('No direct script access allowed');

class App {
    private $controller = DEFAULT_CONTROLLER;
    private $method = DEFAULT_METHOD;
    private $params = [];
    private $routes = [];

    public function __construct() {
        // Init routes
        $this->initRoutes();

        $url = $this->parseURL();

        $this->controller = $this->builControllerName($this->controller); 

        // Check custom routes 
        $path = implode('/', $url);
        
        foreach ($this->routes as $routePattern => $route) {

            $key = str_replace(array(':any', ':num'), array('[^/]+', '[0-9]+'), $routePattern);

            // Does the RegEx match?
            if (preg_match('#^'.$key.'$#', $path, $matches))
            {
                if ( ! is_string($route) && is_callable($route))
                {
                    array_shift($matches);
                    $route = call_user_func_array($route, $matches);
                }

                if(is_array($route["params"])){
                    foreach($route["params"] as $pk => $p)
                    {
                        if (strpos($p, '$') !== FALSE && strpos($key, '(') !== FALSE)
                        {
                            $params = preg_replace('#^'.$key.'$#', $p, $path);
                            $route["params"][$pk] = $params;
                        }
                    }
                }

                $this->controller = $this->builControllerName($route['controller']);
                $this->method = $this->builMethodName($route['method']);

                $ctr = $this->builControllerName($route["controller"]);
                if (!empty($route["params"][0])) {
                    $mtd = $this->builMethodName($route["params"][0]);
                    if(method_exists($ctr, $mtd))
                    { 
                        $this->method = $mtd;
                        unset($route["params"]);
                        $matches = [];
                    }
                }
                
                if(!empty($matches)) unset($matches[0]);
                $this->params = $matches;
                return;
            }
        }

        // Set Controller (Default Route Handling)
        if (isset($url[0])) {
            $controllerFile = CONTROLLER_PATH . ucfirst($url[0]) . 'Controller.php';
            if (file_exists($controllerFile)) {
                $this->controller = $this->builControllerName($url[0]);
                unset($url[0]);
            }
        } else {
            $route = $this->routes['default'];
            $this->controller = $this->builControllerName($route['controller']);
            $this->method = $this->builMethodName($route['method']);
        }

        if(isset($url[0])){
            $mtd = $this->builMethodName($url[0]);
            if (method_exists($this->controller, $mtd)) {
                $this->method = $this->builMethodName($mtd);
            }
        }

        // Set Method
        if (isset($url[1])) {
            $mtd = $this->builMethodName($url[1]);
            if (method_exists($this->controller, $mtd)) {
                $this->method = $this->builMethodName($mtd);
                unset($url[1]);
            }
        }

        // Set Parameters
        $this->params = $url ? array_values($url) : [];
    }

    protected function builControllerName($str)
    {
        $controller = strpos($str, "Controller") ? $str : ucfirst($str) . 'Controller'; 
        return $controller;
    }


    protected function builMethodName($str)
    {
        $str = preg_replace('/[^A-Za-z0-9\-]/', '_', strtolower($str));
        $str = preg_replace('/-+/', '_', $str);
        return $str;
    }

    private function initRoutes() {
        require_once(APP_PATH . "Router.php");

        //Default route
        $this->routes['default'] = [
            'controller' => ucfirst(DEFAULT_CONTROLLER) . 'Controller',
            'method' => DEFAULT_METHOD
        ];
        
        if(!empty($route))
        {
            foreach($route as $k => $v){
                $this->addRoute($k, $v);
            }
        }
    }

    private function addRoute($from, $to) {
        $segments = explode('/', $to);
        $controller = ucfirst($segments[0]);
        $method = $segments[1] ?? DEFAULT_METHOD;

        $params = [];
        if (count($segments) > 2) {
            $params = array_slice($segments, 2);
        }

        $this->routes[$from] = [
            'controller' => $controller,
            'method' => $method,
            'params' => $params
        ];
    }

    public function run() {
        // Instantiate Controller
        $this->controller = strpos($this->controller, "Controller") ? $this->controller : ucfirst($this->controller) . 'Controller'; 

        try {
            $this->controller = new $this->controller;
            $method = new ReflectionMethod($this->controller, $this->method);
            echo $method->invokeArgs($this->controller, $this->params);
        } 
        catch (Throwable $e) {
            $type = strtolower(get_class($e));
            $v = new View();
            $Logs = new Logs();
            
            if(ERROR_LOG){
                $Logs->writeError($type, $e->getMessage(), [
                    "File" => $e->getFile(),
                    "Line" => $e->getLine()
                ]);
            }

            $errMsg = $e->getMessage()."<br>".
                    "File => ".$e->getFile()."<br>".
                    "Line => ". $e->getLine()."<br><hr>".
                    "App Mode => ".ucwords(APP_MODE);
            return $v->render("error", ["title" => "🗣 System Error", "content" => $errMsg]);
        }
    }

    private function parseURL() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            return explode('/', $url);
        }
        return [];
    }
}
