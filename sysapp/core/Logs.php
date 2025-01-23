<?php defined('_ROOT_') OR exit('No direct script access allowed');

class Logs {
    private $logPath;
    private static $instance = null;
    private $logFile;
    private $dateFormat = 'Y-m-d H:i:s';

    public function __construct() {
        $this->logPath = 'storages/logs/';
        $this->setLogFile();
        $this->createLogDirectory();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function setLogFile() {
        $this->logFile = $this->logPath . date('Y-m-d') . '.log';
    }

    private function createLogDirectory() {
        if (!file_exists($this->logPath)) {
            mkdir($this->logPath, 0777, true);
        }
    }

    public function writeError($type, $message, $context = []) {
        $this->log('INFO', $message, $context);
    }

    public function info($message, $context = []) {
        $this->log('INFO', $message, $context);
    }

    public function error($message, $context = []) {
        $this->log('ERROR', $message, $context);
    }

    public function warning($message, $context = []) {
        $this->log('WARNING', $message, $context);
    }

    public function debug($message, $context = []) {
        $this->log('DEBUG', $message, $context);
    }

    private function log($level, $message, $context = []) {
        $date = date($this->dateFormat);
        $contextStr = !empty($context) ? json_encode($context) : '';
        
        $logMessage = sprintf(
            "[%s] %s: %s %s\n",
            $date,
            $level,
            $message,
            $contextStr
        );

        file_put_contents($this->logFile, $logMessage, FILE_APPEND);
    }

    public function clear($days = 30) {
        $files = glob($this->logPath . '*.log');
        $now = time();

        foreach ($files as $file) {
            if (is_file($file)) {
                if ($now - filemtime($file) >= 60 * 60 * 24 * $days) {
                    unlink($file);
                }
            }
        }
    }

    public function getLogContent($date = null) {
        if ($date === null) {
            $logFile = $this->logFile;
        } else {
            $logFile = $this->logPath . $date . '.log';
        }

        if (file_exists($logFile)) {
            return file_get_contents($logFile);
        }

        return null;
    }
} 