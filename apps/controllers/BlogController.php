<?php defined('_ROOT_') OR exit('No direct script access allowed');

class BlogController extends Controller {
    public function __construct() {
        parent::__construct();

    }

    public function index() {
        $data =  [
            'title' => 'Blog',
            'content' => 'This is the blogpage content'
        ];
        
        $this->view->render('frontend/blog', $data);
    }


    public function category($slug="") {
        if(empty($slug)){
            return $this->setView("404");
        }

        $data =  [
            'title' => 'Blog Category - '.$slug,
            'content' => 'This is the blog category page content'
        ];
        
        $this->view->render('frontend/blog_category', $data);
    }


    public function detail($slug="") {

        if(empty($slug)){
            return $this->setView("404");
        }

        $data =  [
            'title' => 'Blog Detail '.$slug,
            'content' => 'This is the blogpage content'
        ];
        
        $this->view->render('frontend/blog_detail', $data);
    }


}