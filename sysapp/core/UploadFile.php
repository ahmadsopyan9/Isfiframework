<?php defined('_ROOT_') OR exit('No direct script access allowed');

class UploadFile {
    private $allowedExtensions = [];
    private $maxFileSize;
    private $uploadDir;
    private $errors = [];

    public function __construct($allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'], $maxFileSize = 2 * 1024 * 1024, $uploadDir = "uploads/") {
        $this->allowedExtensions = $allowedExtensions;
        $this->maxFileSize = $maxFileSize;
        $this->uploadDir = rtrim($uploadDir, '/') . '/';

        if (!is_dir($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }

    public function upload($file) {
        if (!isset($file['name']) || !isset($file['tmp_name'])) {
            $this->addError("Invalid file upload.");
            return false;
        }

        $filename = basename($file['name']);
        $tmpName = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];
        $fileExt = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        // Check for upload errors
        if ($fileError !== UPLOAD_ERR_OK) {
            $this->addError("Error during file upload: Code $fileError.");
            return false;
        }

        // Validate file size
        if ($fileSize > $this->maxFileSize) {
            $this->addError("File size exceeds the maximum limit of " . ($this->maxFileSize / 1024 / 1024) . " MB.");
            return false;
        }

        // Validate file extension
        if (!in_array($fileExt, $this->allowedExtensions)) {
            $this->addError("File extension '$fileExt' is not allowed.");
            return false;
        }

        // Generate secure unique filename
        $newFilename = uniqid("file_", true) . '.' . $fileExt;
        $destination = $this->uploadDir . $newFilename;

        // Move file to the upload directory
        if (!move_uploaded_file($tmpName, $destination)) {
            $this->addError("Failed to move uploaded file.");
            return false;
        }

        return $newFilename;
    }

    private function addError($message) {
        $this->errors[] = $message;
    }

    public function getErrors() {
        return $this->errors;
    }

    public function hasErrors() {
        return !empty($this->errors);
    }
}

// Example Usage:
// $uploader = new UploadFile(['jpg', 'png'], 2 * 1024 * 1024, 'uploads/');
// if ($_FILES['file']) {
//     $result = $uploader->upload($_FILES['file']);
//     if ($result) {
//         echo "File uploaded successfully: $result";
//     } else {
//         print_r($uploader->getErrors());
//     }
// }
