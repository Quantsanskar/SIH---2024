document.addEventListener('DOMContentLoaded', () => {
    setTimeout(function () {
        document.getElementById('lazyLoadingContainer').style.display = 'none';
        document.getElementById('maincontent').style.display = 'flex';
    }, 3000); // Simulating a 3-second load time

    const loginBtn = document.querySelector('.login-btn');
    const modal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    const signupLink = document.getElementById('signup-link');
    const reportForm = document.getElementById('report-form');
    const fileUpload = document.getElementById('file-upload');

    loginBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement login functionality here
        console.log('Login submitted');
        modal.style.display = 'none';
    });

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Implement signup functionality or navigation here
        console.log('Navigate to signup page');
    });

    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement report submission and analysis here
        console.log('Report submitted for analysis');
        alert('Your report has been submitted for analysis. Results will be available soon.');
    });

    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Implement file upload logic here
            console.log(`File selected: ${file.name}`);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active navigation item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // File upload preview
    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'file-preview';
                preview.innerHTML = `
                    <p>Selected file: ${file.name}</p>
                    <button class="remove-file">Remove</button>
                `;
                fileUpload.parentNode.appendChild(preview);

                document.querySelector('.remove-file').addEventListener('click', () => {
                    fileUpload.value = '';
                    preview.remove();
                });
            }
            reader.readAsDataURL(file);
        }
    });
});