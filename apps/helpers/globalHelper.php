<?php defined('_ROOT_') OR exit('No direct script access allowed');

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

if(!function_exists("arrayToObject"))
{
    function arrayToObject($array) {
        if (!is_array($array)) {
            return $array;
        }

        $object = new stdClass();

        foreach ($array as $key => $value) {
            // Pastikan key adalah string agar bisa dijadikan property
            if (is_numeric($key)) {
                $key = "key_$key";
            }

            $object->$key = is_array($value) ? arrayToObject($value) : $value;
        }

        return $object;
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

if(!function_exists("underscore"))
{
    function underscore($txt)
    {
        $str = preg_replace('/[^A-Za-z0-9\-]/', '_', strtolower($txt));
        $result = preg_replace('/-+/', '_', $str);
        return $result;
    }
}

if(!function_exists("rpc"))
{
    function rpc($data, $d, $c)
    {
        if(!empty($data) && !empty($d) && !empty($c))
        {
            return str_replace($d, $c, _trim($data));
        }
        return $data;
    }
}

if(!function_exists("fixEncoding"))
{
    function fixEncoding($text) {
        return mb_convert_encoding($text, 'UTF-8', 'ISO-8859-1');
    }
}

if(!function_exists("isUnicode"))
{
    function isUnicode($str)
    {
        return preg_match('/\\\\u([0-9a-fA-F]{4})/', $str);
    }
}

if(!function_exists("contains_unicode_escape"))
{
    function contains_unicode_escape($str) {
        return preg_match('/\\\\u([0-9a-fA-F]{4})/', $str);
    }
}

if(!function_exists("decode_unicode_escapes"))
{
    function decode_unicode_escapes($str) {
        return preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/', function ($match) {
            return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
        }, $str);
    }
}

if(!function_exists("seofy"))
{
    function seofy($sString = '', $strip = '')
    {
        if (is_null($sString)) $sString = '';
        $sString = (string)$sString;

        if (contains_unicode_escape($sString)) {
            $sString = decode_unicode_escapes($sString);
        }

        $jsonDecoded = json_decode('"' . $sString . '"', true);
        if ($jsonDecoded !== null && is_string($jsonDecoded)) {
            $sString = $jsonDecoded;
        }

        if (!mb_detect_encoding($sString, 'UTF-8', true)) {
            $sString = mb_convert_encoding($sString, 'UTF-8');
        }

        if ($strip == '') {
            $sString = preg_replace('/[^\pL\d_]+/u', '-', $sString);
            $sString = trim($sString, '-');
        } else {
            $sString = preg_replace('/[^\pL\d_]+/u', '_', $sString);
            $sString = trim($sString, '_');
        }

        $sString = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $sString);

        $sString = strtolower($sString);
        $sString = preg_replace('/[^-a-z0-9_]+/', '', $sString);

        return $sString;
    }
}

// cleanText
if(!function_exists("cleanText"))
{
    function cleanText($text = '',$spc=' ')
    {
        $text = strip_tags($text);
        $text = preg_replace('/[^\\pL\d_]+/u', (!empty($spc) ? $spc : " "), $text);
        $text = trim($text, "-");
        $text = str_replace("_", " ", $text);
        $text = iconv('utf-8', "us-ascii//TRANSLIT", $text);
        $text = strtolower($text);
        $text = preg_replace('/[^-a-z0-9_]+/', (!empty($spc) ? $spc : " "), $text);
        return $text;
    }//end
}

// slug to text
if(!function_exists("slugToClean"))
{
    function slugToClean($text = '',$spc=' ')
    {
        return ucwords(cleanText($text, $spc));
    }
}

if(!function_exists("uwords"))
{
    function uwords($str=""){
        return slugToClean(ucwords(strtolower($str)), " ");
    }
}

if(!function_exists("autolink"))
{
    function autolink($text) {
        return preg_replace_callback(
            '/(https?:\/\/[^\s)]+)/i',
            function ($matches) {
                $url = $matches[1];
                return "<a href=\"$url\" target=\"_blank\" rel=\"noopener noreferrer\">$url</a>";
            },
            $text
        );
    }
}
