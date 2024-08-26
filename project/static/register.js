
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const errorElement = document.getElementById('error');

    

    // Simulating loading spinner
    const app = document.getElementById('app');
    app.style.display = 'none';
    
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loadingContainer';
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loadingSpinner';
    loadingContainer.appendChild(loadingSpinner);
    document.body.appendChild(loadingContainer);

    setTimeout(() => {
        loadingContainer.remove();
        app.style.display = 'block';
    }, 2000);
});