<?php defined('_ROOT_') OR exit('No direct script access allowed');

class SessionManager {
    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    // Set a session variable
    public function set($key, $value) {
        $this->regenerate();
        $_SESSION[$key] = $value;
    }

    // Get a session variable
    public function get($key) {
        return $_SESSION[$key] ?? null;
    }

    // Check if a session variable exists
    public function exists($key) {
        return isset($_SESSION[$key]);
    }

    // Remove a session variable
    public function remove($key) {
        if ($this->exists($key)) {
            unset($_SESSION[$key]);
        }
    }

    // Destroy the entire session
    public function destroy() {
        session_unset();
        session_destroy();
    }

    // Regenerate session ID for security
    public function regenerate() {
        session_regenerate_id(true);
    }

    // Set a flash message (one-time message)
    public function setFlash($key, $message) {
        $this->set($key, $message);
    }

    // Get and clear a flash message
    public function getFlash($key) {
        $message = $this->get($key);
        $this->remove($key);
        return $message;
    }
}

// Example Usage:
// $session = new SessionManager();
// $session->set('user_id', 123);
// echo $session->get('user_id');
// $session->remove('user_id');
// $session->setFlash('success', 'You have logged in successfully.');
// echo $session->getFlash('success');