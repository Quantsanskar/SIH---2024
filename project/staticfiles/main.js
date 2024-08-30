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


// Include the tagline animation code here
const taglines = [
    "Your friendly healthcare companion",
    "Empowering your health journey",
    "Connecting you to better health",
    "Innovative care at your fingertips",
    "Your wellness, our priority"
];

let currentTaglineIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 100;
const pauseBetweenTaglines = 1000;

function typeTagline() {
    const taglineElement = document.querySelector('.tagline-text');
    const currentTagline = taglines[currentTaglineIndex];

    if (isDeleting) {
        taglineElement.textContent = currentTagline.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        taglineElement.textContent = currentTagline.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    if (!isDeleting && currentCharIndex === currentTagline.length) {
        isDeleting = true;
        setTimeout(typeTagline, pauseBetweenTaglines);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
        setTimeout(typeTagline, typingSpeed);
    } else {
        setTimeout(typeTagline, isDeleting ? deletingSpeed : typingSpeed);
    }
}

setTimeout(typeTagline, typingSpeed);