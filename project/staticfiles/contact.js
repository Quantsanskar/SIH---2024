document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function () {
        document.getElementById('lazyLoadingContainer').style.display = 'none';
        document.getElementById('container').style.display = 'flex';
    }, 3000); // Simulating a 3-second load time
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Message sent successfully!');
                form.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                inputs.forEach(input => {
                    input.parentNode.classList.remove('focused');
                });
            }, 2000);
        }
    });
});