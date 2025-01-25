<?php defined('_ROOT_') OR exit('No direct script access allowed');

class AuthController extends Controller {

    public function __construct() {
        parent::__construct();
        $this->loadModel("User");
    }


    public function index()
    {
        if(isLogin())
        {
            redirect(isPageFor());
        }
        return $this->login();
    }


    public function login()
    {
        if(isLogin())
        {
            redirect(isPageFor());
        }

        if($this->request->isMethod("post"))
        {
            $post = $this->request->getBody();
            return $this->doLogin($post);
        }

        $data['title'] = 'Login Or Register';
        $this->view->render('frontend/auth', $data);
    }


    public function register()
    {
        if(isLogin())
        {
            redirect(isPageFor());
        }
        
        if($this->request->isMethod("post"))
        {
            $post = $this->request->getBody();
            return $this->doRegister($post);
        }

        $data['title'] = 'Register';
        $data['active_form'] = "register";
        $this->view->render('frontend/auth', $data);
    }


    public function forgot_password()
    {
        if($this->request->isMethod("post"))
        {
            $post = $this->request->getBody();
            return $this->doForgotPassword($post);
        }

        $data['title'] = 'Forgot Password';
        $data['active_form'] = "forgot_password";
        $this->view->render('frontend/auth', $data);
    }

    public function reset_password($reset_token="")
    {
        if(empty($reset_token)){
            return $this->view->render('frontend/404');
        }

        $user = $this->UserModel->getUserByResetToken($reset_token);
        if(empty($user)){
            direct_msg("Token tidak valid", "error", "auth/reset-password/".$reset_token);
        }

        if($this->request->isMethod("post"))
        {
            $post = $this->request->getBody();
            $post["id"] = $user->id;
            $post["reset_token"] = $reset_token;
            return $this->doResetPassword($post);
        }

        $data['title'] = 'Reset Password';
        $data['active_form'] = "reset_password";
        $this->view->render('frontend/reset_password', $data);
    }

    public function activation_account($activation_token)
    {
        if(empty($activation_token)){
            return $this->view->render('frontend/404');
        }

        $user = $this->UserModel->getUserByActivationToken($activation_token);
        if(empty($user)){
            direct_msg("Token tidak valid", "error", "auth/login");
        }

        $this->UserModel->updateUser(["id" => $user->id], ["is_active" => 1, "activation_token" => null]);    
        direct_msg("Akun anda berhasil diaktivasi, silahkan login", "success", "auth/login");
    }


    /*
      Start Action................
    */ 

    protected function doLogin($post)
    {
        $validation = $this->FormValidation->validateCsrfToken($post["csrf_token"]);
        
        if(!$validation)
        {
            direct_msg("Login Gagal, Request tidak valid!", "error", "auth");
        }

        $email = strtolower($post["email"]);
        $password = $post["password"];
        $user = $this->UserModel->getUserByEmail($email);

        if(empty($user)){
            direct_msg("Akun dengan email $email tidak ditemukan", "error", "auth");
        }

        if(password_verify($password, $user->password)){
            if($user->is_active)
            {
                unset($user->password);
                $this->session->set("app_session_log", objectToArray($user));
                redirect(isPageFor());
            }

            direct_msg("Akun belum aktif", "info", "auth");
        }
        direct_msg("Email atau kata sandi salah!", "warning", "auth");
    }


    protected function doRegister($post)
    {
        $validation = $this->FormValidation->validateCsrfToken($post["csrf_token"]);
        
        if(!$validation)
        {
            direct_msg("Pendaftaran akun gagal, Request tidak valid!", "error", "auth");
        }

        $email = strtolower($post["email"]);
        $name = ucwords($post["name"]);
        $password = $post["password"];
        $confirm_password = $post["confirm_password"];

        if($password != $confirm_password){
            direct_msg("Konfirmasi kata sandi tidak sama!", "info", "auth/register");
        }

        // check password length
        if(strlen($password) < 6){
            direct_msg("Kata sandi minimal 6 karakter!", "info", "auth/register");
        }

        // check user email
        $already = $this->UserModel->getUserByEmail($email);
        if($already){
            direct_msg("Alamat email ini sudah terdaftar!", "warning", "auth/register");
        }

        $data = [
            "name" => $name,
            "email" => $email,
            "password" => password_hash($password, PASSWORD_DEFAULT),
            "role" => "user"
        ];
        // insert new user
        $userid = $this->UserModel->insertUser($data);
        if($userid){
            $token = bin2hex(random_bytes(16));
            $this->UserModel->updateUser(["id" => $userid], ["activation_token" => $token]);

            $templateMail = VIEW_PATH . "email/activation_account.html";
            sendEmailWithTemplate($email, "Activation Account", $templateMail, [
                "COMPANY_LOGO" => logo(),
                "COMPANY_NAME" => companyName(),
                "COMPANY_ADDRESS" => companyAddress(),
                "NAME" => $name,
                "VERIFICATION_LINK" => BASE_URL . "auth/activation-account/$token"
            ]);
            direct_msg("Pendaftaran berhasil, silahkan cek email anda untuk aktivasi akun", "success", "auth/login");
        }
         direct_msg("Pendaftaran gagal, silahkan ulangi lagi!", "error", "auth/register");
    }


    protected function doForgotPassword($post)
    {
        $validation = $this->FormValidation->validateCsrfToken($post["csrf_token"]);
        
        if(!$validation)
        {
            direct_msg("Request tidak valid!", "error", "auth/forgot-password");
        }

        $email = strtolower($post["email"]);
        $user = $this->UserModel->getUserByEmail($email);

        if(empty($user)){
            direct_msg("Akun dengan email $email tidak ditemukan", "error", "auth/forgot-password");
        }

        if(!$user->is_active)
        {
            direct_msg("Akun belum aktif", "info", "auth/forgot-password");
        }

        $reset_token = bin2hex(random_bytes(16));
        $this->UserModel->updateUser(["id" => $user->id], ["reset_token" => $reset_token]);

        $templateMail = VIEW_PATH . "email/reset_password.html";
        sendEmailWithTemplate($email, "Reset Password", $templateMail, [
            "COMPANY_LOGO" => logo(),
            "COMPANY_NAME" => companyName(),
            "COMPANY_ADDRESS" => companyAddress(),
            "NAME" => $user->name,
            "RESET_LINK" => BASE_URL . "auth/reset-password/" . $reset_token
        ]);
        direct_msg("Silahkan cek email anda untuk reset password", "success", "auth/login");
    }


    protected function doResetPassword($post)
    {
        $validation = $this->FormValidation->validateCsrfToken($post["csrf_token"]);
        
        if(!$validation)
        {
            direct_msg("Request tidak valid!", "error", "auth/reset-password/".$post["reset_token"]);
        }

        $password = $post["password"];
        $confirm_password = $post["confirm_password"];

        if($password != $confirm_password){
            direct_msg("Konfirmasi kata sandi tidak sama!", "info", "auth/reset-password/".$post["reset_token"]);
        }

        // check password length
        if(strlen($password) < 6){
            direct_msg("Kata sandi minimal 6 karakter!", "info", "auth/reset-password/".$post["reset_token"]);
        }

        // update
        $password = password_hash($password, PASSWORD_DEFAULT);
        $success = $this->UserModel->updateUser(["id" => $post["id"]], [
            "password" => $password,
            "reset_token" => null
        ]);

        if($success){
            direct_msg("Kata sandi berhasil diperbarui, silahkan login kembali", "success", "auth/login");
        }

        direct_msg("Kata sandi gagal diperbarui, silahkan ulangi lagi", "error", "auth/reset-password/".$post["reset_token"]);
    }

    /*
      End Action................
    */ 


    public function logout()
    {
        $this->session->destroy();
        redirect("auth/login");
    }

}