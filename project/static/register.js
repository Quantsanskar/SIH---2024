
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const errorElement = document.getElementById('error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            return;
        }

        try {
            // Check if email is already registered
            // const checkEmailResponse = await fetch('http://127.0.0.1:8000/api/check-email/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email: data.email }),
            // });
            
            // const checkEmailResult = await checkEmailResponse.json();
            
            // if (checkEmailResult.exists) {
            //     errorElement.textContent = 'Email is already registered';
            //     return;
            // }

            // If email is not registered, proceed with registration
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            errorElement.textContent = 'Registration failed. Please try again.';
        }
    });

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