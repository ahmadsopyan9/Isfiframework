<?php defined('_ROOT_') OR exit('No direct script access allowed');

class AdminController extends Controller {

    public function __construct() {
        parent::__construct();

        if(!isLogin())
        {
            redirect("auth");
        }

        if(!isAdmin())
        {
            redirect(isPageFor());
        }

        $this->loadModel("User");
    }

    public function index()
    {
        $data['title'] = 'Admin Dashboard';
        $this->view->render('admin/index', $data);
    }



}