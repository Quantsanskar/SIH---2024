document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loadingContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginContainer = document.getElementById('loginContainer');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Simulate loading
    const app = document.getElementById('loginContainer');
    app.style.display = 'none';
    
    loadingContainer.className = 'loadingContainer';
    loadingSpinner.className = 'loadingSpinner';
    loadingContainer.appendChild(loadingSpinner);
    document.body.appendChild(loadingContainer);

    setTimeout(() => {
        loadingContainer.remove();
        app.style.display = 'block';
    }, 2000);
});