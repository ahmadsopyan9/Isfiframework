<?php defined('_ROOT_') OR exit('No direct script access allowed');

class HomeController extends Controller {
    private $data = [];

    public function __construct() {
        parent::__construct();
        $this->loadModel("User");
    }

    public function index() {
        $data = [
            'title' => 'Home',
            'content' => 'This is the homepage content'
        ];
        
        $this->view->render('frontend/index', $data);
    }


    public function about() {
        $data = [
            'title' => 'About Us',
            'content' => 'This is the aboutpage content'
        ];
        
        $this->view->render('frontend/about', $data);
    }


    public function contact() {
        $data = [
            'title' => 'Contact Us',
            'content' => 'This is the contactpage content'
        ];
        
        $this->view->render('frontend/contact', $data);
    }

} 