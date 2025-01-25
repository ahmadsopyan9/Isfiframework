<?php defined('_ROOT_') OR exit('No direct script access allowed');

class ApiController extends Controller {

    public function __construct() {
        parent::__construct();

    }

    public function index() {
        
    }

    public function ref_token()
    {
        if($this->request->isMethod("post"))
        {
            unset($_SESSION['app_token']);
            $ss = $this->session->regenerateCsrfToken();
            return $this->response->json([
                "success" => true,
                "data" => $ss,
                "message" => "success"
            ])->send();
        }
    }

}