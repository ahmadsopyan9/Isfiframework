<?php defined('_ROOT_') OR exit('No direct script access allowed');

class FormValidation {
    private $errors = [];

    // Validate required fields
    public function validateRequired($field, $value, $message = "This field is required.") {
        if (empty(trim($value))) {
            $this->addError($field, $message);
        }
    }

    // Validate email format
    public function validateEmail($field, $value, $message = "Invalid email format.") {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->addError($field, $message);
        }
    }

    // Validate minimum length
    public function validateMinLength($field, $value, $minLength, $message = null) {
        if (strlen($value) < $minLength) {
            $message = $message ?? "This field must be at least $minLength characters long.";
            $this->addError($field, $message);
        }
    }

    // Validate maximum length
    public function validateMaxLength($field, $value, $maxLength, $message = null) {
        if (strlen($value) > $maxLength) {
            $message = $message ?? "This field must not exceed $maxLength characters.";
            $this->addError($field, $message);
        }
    }

    // Validate matching fields (e.g., password confirmation)
    public function validateMatch($field, $value1, $value2, $message = "The fields do not match.") {
        if ($value1 !== $value2) {
            $this->addError($field, $message);
        }
    }

    // Add an error message for a specific field
    private function addError($field, $message) {
        $this->errors[$field][] = $message;
    }

    // Check if there are any validation errors
    public function hasErrors() {
        return !empty($this->errors);
    }

    // Get all validation errors
    public function getErrors() {
        return $this->errors;
    }

    // Get errors for a specific field
    public function getErrorsForField($field) {
        return $this->errors[$field] ?? [];
    }

    // Generate CSRF token
    public function generateCsrfToken() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }

        return $_SESSION['csrf_token'];
    }

    // Regenerate CSRF token
    public function regenerateCsrfToken() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!empty($_SESSION['csrf_token'])) {
            unset($_SESSION['csrf_token']);
        }

        return $this->generateCsrfToken();
    }

    // Validate CSRF token
    public function validateCsrfToken($token) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['csrf_token']) || $token !== $_SESSION['csrf_token']) {
            $this->addError('csrf', 'Invalid CSRF token.');
            return false;
        }

        unset($_SESSION['csrf_token']);
        return true;
    }
}

// Example Usage:
// $validator = new FormValidation();
// $csrfToken = $validator->generateCsrfToken();
// echo '<input type="hidden" name="csrf_token" value="' . $csrfToken . '">';
// 
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $validator->validateCsrfToken($_POST['csrf_token']);
//     if ($validator->hasErrors()) {
//         print_r($validator->getErrors());
//     } else {
//         echo "CSRF validation passed.";
//     }
// }