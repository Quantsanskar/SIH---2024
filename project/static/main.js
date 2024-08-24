document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('lazyLoadingContainer').style.display = 'none';
        document.getElementById('mainContent').style.display = 'flex';
    }, 3000); // Simulating a 3-second load time
});

function handleLogin() {
    window.location.href = 'login';
}

function handleRegister() {
    window.location.href = 'register';
}