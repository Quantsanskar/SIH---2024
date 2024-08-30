document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const errorElement = document.getElementById('error');

    

    // Simulating loading spinner
    const app = document.getElementById('app');

    // Hide the app initially
    app.style.display = 'none';

    // Create and show the loading spinner
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loadingContainer';
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loadingSpinner';
    loadingContainer.appendChild(loadingSpinner);
    document.body.appendChild(loadingContainer);

    // Remove the loading spinner and show the app after 2 seconds
    setTimeout(() => {
        loadingContainer.remove();
        app.style.display = 'block';
    }, 1500);
});
