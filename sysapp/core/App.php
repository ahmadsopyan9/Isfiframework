<?php defined('_ROOT_') OR exit('No direct script access allowed');

class App {
    private static $instance;
    private $controller;
    private $method;
    private $params = [];
    private $routes = [];
    private $defaultController = 'WelcomeController';
    private $defaultMethod = 'index';

    public function __construct() {
        $this->initRoutes();

        $url = $this->parseURL();
        $this->controller = $this->buildControllerName($this->defaultController);
        $this->method = $this->buildMethodName($this->defaultMethod);

        $path = implode('/', $url);

        foreach ($this->routes as $routePattern => $route) {
            $regex = '#^' . str_replace([':any', ':num'], ['[^/]+', '[0-9]+'], $routePattern) . '$#';
            if (preg_match($regex, $path, $matches)) {
                if (!is_string($route) && is_callable($route)) {
                    array_shift($matches);
                    $route = call_user_func_array($route, $matches);
                }

                $this->controller = $this->buildControllerName($route['controller']);
                $this->method = $this->buildMethodName($route['method']);
                $this->params = array_slice($matches, 1);
                return;
            }
        }

        // Default route or controller/method from URL
        if (!empty($url[0])) {
            $potentialController = $this->buildControllerName($url[0]);
            if (file_exists(CONTROLLER_PATH . $potentialController . '.php')) {
                $this->controller = $potentialController;
                array_shift($url);
            }
        }

        if (!empty($url[0])) {
            $potentialMethod = $this->buildMethodName($url[0]);
            if (method_exists($this->controller, $potentialMethod)) {
                $this->method = $potentialMethod;
                array_shift($url);
            }
        }

        $this->params = $url ? array_values($url) : [];
    }

    public static function &get_instance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    protected function buildControllerName($str) {
        return (strpos($str, "Controller") !== false) ? $str : ucfirst($str) . 'Controller';
    }

    protected function buildMethodName($str) {
        $str = preg_replace('/[^A-Za-z0-9\-]/', '_', strtolower($str));
        return preg_replace('/-+/', '_', $str);
    }

    private function initRoutes() {
        require(APP_PATH . "Router.php");

        if (!empty($route["default"])) {
            $segments = explode('/', $route["default"]);
            $controller = ucfirst($segments[0] ?? 'Welcome');
            $method = $segments[1] ?? 'index';

            $this->defaultController = $this->buildControllerName($controller);
            $this->defaultMethod = $this->buildMethodName($method);

            $this->routes['default'] = [
                'controller' => $controller,
                'method' => $method
            ];
        } else {
            // fallback default
            $this->routes['default'] = [
                'controller' => 'Welcome',
                'method' => 'index'
            ];
        }

        // Load mpre route 
        if (!empty($route)) {
            foreach ($route as $k => $v) {
                if ($k !== 'default') {
                    $this->addRoute($k, $v);
                }
            }
        }
    }

    private function addRoute($from, $to) {
        $segments = explode('/', $to);
        $controller = ucfirst($segments[0]);
        $method = $segments[1] ?? "index";
        $params = array_slice($segments, 2);

        $this->routes[$from] = [
            'controller' => $controller,
            'method' => $method,
            'params' => $params
        ];
    }

    public function run() {
        try {
            if (!class_exists($this->controller)) {
                throw new Exception("Controller '{$this->controller}' not found.");
            }

            $controllerObject = new $this->controller;
            if (!method_exists($controllerObject, $this->method)) {
                throw new Exception("Method '{$this->method}' not found in controller '{$this->controller}'.");
            }

            $method = new ReflectionMethod($controllerObject, $this->method);
            echo $method->invokeArgs($controllerObject, $this->params);
        } catch (Throwable $e) {
            $v = Controller::get_instance()->view ?? new View();
            $Logs = new Logs();

            if (ERROR_LOG) {
                $Logs->writeError(strtolower(get_class($e)), $e->getMessage(), [
                    "File" => $e->getFile(),
                    "Line" => $e->getLine()
                ]);
            }

            $errMsg = $e->getMessage() . "<br>" .
                      "File => " . $e->getFile() . "<br>" .
                      "Line => " . $e->getLine() . "<br><hr>" .
                      "App Mode => " . ucwords(APP_MODE);
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

function &app_instance() {
    return App::get_instance();
}
