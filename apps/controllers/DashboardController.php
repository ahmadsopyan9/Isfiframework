<?php defined('_ROOT_') OR exit('No direct script access allowed');

class DashboardController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        if(!isLogin())
        {
            redirect("auth");
        }

        if(!isAuthor())
        {
            redirect(isPageFor());
        }

        $this->loadModel("User");
    }

    public function index()
    {
        $data['title'] = 'Author Dashboard';
        $this->view->render('dashboard/index', $data);
    }
}   