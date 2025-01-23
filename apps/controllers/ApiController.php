<?php defined('_ROOT_') OR exit('No direct script access allowed');

class ApiController extends Controller {

    public function __construct() {
        parent::__construct();

    }

    public function index() {
        $this->response->json([
            "success" => true,
            "data" => 1,
            "message" => "OKE"
        ])->send();
    }

    public function test_get_data() {
        $this->response->json([
            "success" => true,
            "data" => ["name" => "Testing", "email" => "testing@gmail.com"],
            "message" => "OKE"
        ])->send();
    }

}