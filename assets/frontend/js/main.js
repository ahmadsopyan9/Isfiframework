document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi aplikasi
    console.log('Aplikasi berhasil dimuat');
    
    // Fungsi untuk AJAX request
    function ajaxRequest(url, method = 'GET', data = null) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
        }).then(response => response.json());
    }
    
    // Event listeners dan fungsi lainnya bisa ditambahkan di sini
}); 