<?php

if (!function_exists('redirect')) {
    function redirect($path="") {
        header('Location: ' . BASE_URL . '/' . $path);
        exit;
    }
}

if (!function_exists('asset')) {
    function asset($path) {
        return BASE_URL . '/assets/' . $path;
    }
}

if (!function_exists('base_url')) {
    function base_url($path = '') {
        return BASE_URL . '/' . $path;
    }
}

if (!function_exists('session')) {
    function session($key, $value = null) {
        if ($value === null) {
            return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
        }
        $_SESSION[$key] = $value;
    }
}

if (!function_exists('flash')) {
    function flash($message, $type = 'info') {
        $_SESSION['flash'] = [
            'message' => $message,
            'type' => $type
        ];
    }
} 

// for handle on frontend
if (!function_exists('flasher')) {
    function flasher() {
        if(!empty($_SESSION['flash'])){
            $sesionFlash = $_SESSION['flash'];
            unset($_SESSION["flash"]);
            echo '<script>const __alert = '.json_encode($sesionFlash).';</script>';
        }
    }
} 


if (!function_exists('direct_msg')) {
    function direct_msg($message, $type = 'info', $path='') {
        flash($message, $type);

        $page = getUrl();
        if($type == 'error' || $type == 'failed'){
            $type = 'error';
        }

        if(!empty($path) && $path != ''){
            $page = base_url($path);
        }
        exit(header('Location: '.$page));
    }
} 


if (!function_exists('crsf_token')) {
    function crsf_token($type="default")
    {
        $isfi =& _instance();
        $csrfToken = $isfi->FormValidation->generateCsrfToken();

        if($type == "default"){
            return $csrfToken;
        }
        echo '<input type="hidden" name="csrf_token" value="' . $csrfToken . '">';
    }
}


if(!function_exists("generateNumber"))
{
    function generateNumber($length=5)
    {
      $a = mt_rand(10000000,9999999999).rand().rand();
      $res = substr($a, 0,$length);
      return $res;
    }
}


if(!function_exists("_uuid"))
{
    function _uuid()
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}


if(!function_exists("getUrl"))
{
    function getUrl() {
        $currentURL = (@$_SERVER["HTTPS"] == "on") ? "https://" : "http://";
        $currentURL .= $_SERVER["SERVER_NAME"];
        if($_SERVER["SERVER_PORT"] != "80" && $_SERVER["SERVER_PORT"] != "443"){
            $currentURL .= ":".$_SERVER["SERVER_PORT"];
        } 
        $currentURL .= $_SERVER["REQUEST_URI"];
        return $currentURL;
    }
}


if(!function_exists("shuffle_assoc"))
{
    function shuffle_assoc($list) { 
        if (!is_array($list)) return $list; 

        $keys = array_keys($list); 
        shuffle($keys); 
        $random = array(); 
        foreach ($keys as $key) { 
            $random[] = $list[$key]; 
        }
        return $random; 
    } 
}


if(!function_exists("encode"))
{
    function encode($value) {
        if (!$value) {
            return false;
        }

        $key = sha1('E_x99288ksl#cryp!8');
        $strLen = strlen($value);
        $keyLen = strlen($key);
        $j = 0;
        $crypttext = '';

        for ($i = 0; $i < $strLen; $i++) {
            $ordStr = ord(substr($value, $i, 1));
            if ($j == $keyLen) {
                $j = 0;
            }
            $ordKey = ord(substr($key, $j, 1));
            $j++;
            $crypttext .= strrev(base_convert(dechex($ordStr + $ordKey), 16, 36));
        }

        return $crypttext;
    }
}


if(!function_exists("decode"))
{
    function decode($value) {
        if (!$value) {
            return false;
        }

        $key = sha1('E_x99288ksl#cryp!8');
        $strLen = strlen($value);
        $keyLen = strlen($key);
        $j = 0;
        $decrypttext = '';

        for ($i = 0; $i < $strLen; $i += 2) {
            $ordStr = hexdec(base_convert(strrev(substr($value, $i, 2)), 36, 16));
            if ($j == $keyLen) {
                $j = 0;
            }
            $ordKey = ord(substr($key, $j, 1));
            $j++;
            $decrypttext .= chr($ordStr - $ordKey);
        }

        return $decrypttext;
    }
}

if(!function_exists("objectToArray"))
{
    function objectToArray($object) {
        return json_decode(json_encode($object), true);
    }
}

if(!function_exists("predump"))
{
    function predump($object)
    {
        if(is_array($object) || is_object($object)) {
            header('Content-Type: application/json');
            echo json_encode($object);
        } else {
            echo '<pre>';
            var_dump($object);
            echo '</pre>';
        }
        exit();
    }
}

if(!function_exists("configMailReady"))
{
    function configMailReady()
    {
        if(!empty(EMAIL_HOST) && !empty(EMAIL_USER) && !empty(EMAIL_PASS)) return true;
        return false;
    }
}

if(!function_exists("sendTestEmail"))
{
    function sendTestEmail($to) {
        if(empty($to) || !configMailReady()) return false;
        
        $data = [
            "COMPANY_LOGO" => logo(),
            "CONTENT" => "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum eius vel, facere iste, harum voluptatem! Atque nisi veritatis, quibusdam aut cum ex vel tempora sunt doloremque placeat",
            "COMPANY_NAME" => companyName(),
            "COMPANY_ADDRESS" => companyAddress()
        ];
        return sendEmailWithTemplate($to, "Test Email", VIEW_PATH."email/test.html", $data);
    }
}

if(!function_exists("sendEmail"))
{
    function sendEmail($to, $subject, $message) {
        if(empty($to) || empty($subject) || empty($message) || !configMailReady()) return false;
        $email = new Email();
        $email->setFrom(EMAIL_USER)
              ->to($to)
              ->subject($subject)
              ->message($message)
              ->send();
    }
}

if(!function_exists("sendEmailWithTemplate"))
{
    function sendEmailWithTemplate($to, $subject, $template, $data) {
        if(empty($to) || empty($subject) || empty($template) || !configMailReady()) return false;
        $email = new Email();
        $email->setFrom(EMAIL_USER)
              ->to($to)
              ->subject($subject)
              ->template($template, $data)
              ->send();
    }
}

