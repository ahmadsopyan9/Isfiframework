<?php defined('_ROOT_') OR exit('No direct script access allowed');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Email {
    private $to = [];
    private $cc = [];
    private $bcc = [];
    private $from = EMAIL_USER;
    private $fromName = '';
    private $subject = '';
    private $message = '';
    private $attachments = [];
    private $templateVars = [];
    private $mailer;
    
    public function __construct() {
        $this->mailer = new PHPMailer(true);
        
        // Setup SMTP
        $this->mailer->isSMTP();
        $this->mailer->Host = EMAIL_HOST;
        $this->mailer->From = EMAIL_FROM;
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = EMAIL_USER;
        $this->mailer->Password = EMAIL_PASS;
        $this->mailer->SMTPSecure = "ssl";
        $this->mailer->Port = EMAIL_PORT;
        $this->mailer->isHTML(true);
        $this->mailer->CharSet = 'UTF-8';
    }
    
    public function setFrom($email, $name = '') {
        $this->from = $email;
        $this->fromName = $name;
        $this->mailer->setFrom($email, $name);
        return $this;
    }
    
    public function to($email, $name = '') {
        if(is_array($email)) {
            foreach($email as $key => $value) {
                if(is_numeric($key)) {
                    $this->mailer->addAddress($value);
                } else {
                    $this->mailer->addAddress($value, $key);
                }
            }
        } else {
            $this->mailer->addAddress($email, $name);
        }
        return $this;
    }
    
    public function cc($email, $name = '') {
        if(is_array($email)) {
            foreach($email as $mail) {
                $this->mailer->addCC($mail);
            }
        } else {
            $this->mailer->addCC($email, $name);
        }
        return $this;
    }
    
    public function bcc($email, $name = '') {
        if(is_array($email)) {
            foreach($email as $mail) {
                $this->mailer->addBCC($mail);
            }
        } else {
            $this->mailer->addBCC($email, $name);
        }
        return $this;
    }
    
    public function subject($subject) {
        $this->subject = $subject;
        $this->mailer->Subject = $subject;
        return $this;
    }
    
    public function message($message) {
        $this->message = $message;
        $this->mailer->Body = $message;
        return $this;
    }
    
    public function template($template, $data = []) {
        $this->templateVars = $data;
        
        if(file_exists($template)) {
            $this->message = file_get_contents($template);
            $this->mailer->Body = $this->parseTemplate();
        } else {
            throw new Exception('Template file not found: ' . $template);
        }
        
        return $this;
    }
    
    public function attach($file, $filename = '') {
        if(file_exists($file)) {
            $this->mailer->addAttachment($file, $filename ?: basename($file));
        }
        return $this;
    }
    
    private function parseTemplate() {
        $message = $this->message;
        foreach($this->templateVars as $key => $value) {
            $message = str_replace('{{' . $key . '}}', $value, $message);
        }
        return $message;
    }
    
    public function send() {
        try {
            return $this->mailer->send();
        } catch (Exception $e) {
            throw new Exception('Email could not be sent. Mailer Error: ' . $this->mailer->ErrorInfo);
        }
    }
}

/*
|--------------------------------------------------------------------------
| Email Class Usage Examples (SMTP)
|--------------------------------------------------------------------------
|
| Configuration in app_config.php:
| -----------------------------
| define('EMAIL_HOST', 'smtp.gmail.com');
| define('EMAIL_PORT', 587);
| define('EMAIL_USER', 'your@gmail.com');
| define('EMAIL_PASS', 'your-app-password');
|
| Basic Usage remains the same:
| --------------------------
| $email = new Email();
| $email->setFrom('sender@example.com', 'Sender Name')
|       ->to('recipient@example.com')
|       ->subject('Test Email')
|       ->message('<h1>Hello World!</h1>')
|       ->send();
|
*/ 