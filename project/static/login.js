document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loadingContainer');
    const loginContainer = document.getElementById('loginContainer');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Simulate loading
    setTimeout(() => {
        loadingContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
    }, 1000);

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '/dashboard';
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Fetch all user data
            const response = await axios.get('http://127.0.0.1:8000/api/users');
            const users = response.data;

            // Check if entered credentials match any user
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Successful login
                localStorage.setItem('token', 'dummy_token'); // Replace with actual token if available
                localStorage.setItem('username', user.email);
                window.location.href = '/';
            } else {
                // Login failed
                errorMessage.textContent = 'Invalid email or password. Please try again.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
            errorMessage.style.display = 'block';
        }
    });
});