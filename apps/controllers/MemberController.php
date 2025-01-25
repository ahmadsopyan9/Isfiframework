<?php defined('_ROOT_') OR exit('No direct script access allowed');

class MemberController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        if(!isLogin())
        {
            redirect("auth");
        }

        if(!isUser())
        {
            redirect(isPageFor());
        }

        $this->loadModel("User");
    }

    public function index()
    {
        $data['title'] = 'Member Dashboard';
        $this->view->render('member/index', $data);
    }
}