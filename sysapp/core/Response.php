<?php defined('_ROOT_') OR exit('No direct script access allowed');

class Response {
    private $headers = [];
    private $statusCode = 200;
    private $content;

    public function setStatusCode($code) {
        $this->statusCode = $code;
        return $this;
    }

    public function setHeader($key, $value) {
        $this->headers[$key] = $value;
        return $this;
    }

    public function json($data) {
        $this->setHeader('Content-Type', 'application/json');
        $this->content = json_encode($data);
        return $this;
    }

    public function redirect($url, $statusCode = 302) {
        $this->setStatusCode($statusCode);
        $this->setHeader('Location', $url);
        return $this;
    }

    public function setContent($content) {
        $this->content = $content;
        return $this;
    }

    public function send() {
        // Set status code
        http_response_code($this->statusCode);

        // Set headers
        foreach ($this->headers as $key => $value) {
            header("$key: $value");
        }

        // Output content
        echo $this->content;
        exit;
    }

    public function download($filePath, $filename = null) {
        if (!file_exists($filePath)) {
            throw new Exception('File tidak ditemukan');
        }

        $filename = $filename ?: basename($filePath);

        $this->setHeader('Content-Type', 'application/octet-stream')
             ->setHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
             ->setHeader('Content-Length', filesize($filePath));

        readfile($filePath);
        exit;
    }

    public function notFound($message = 'Halaman tidak ditemukan') {
        $this->setStatusCode(404)
             ->setContent($message)
             ->send();
    }

    public function forbidden($message = 'Akses ditolak') {
        $this->setStatusCode(403)
             ->setContent($message)
             ->send();
    }

    public function unauthorized($message = 'Tidak diizinkan') {
        $this->setStatusCode(401)
             ->setContent($message)
             ->send();
    }

    public function badRequest($message = 'Permintaan tidak valid') {
        $this->setStatusCode(400)
             ->setContent($message)
             ->send();
    }

    public function serverError($message = 'Terjadi kesalahan pada server') {
        $this->setStatusCode(500)
             ->setContent($message)
             ->send();
    }
} 