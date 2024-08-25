document.addEventListener('DOMContentLoaded', function() {
    const diseaseButtons = document.querySelectorAll('.disease-btn');
    const chatbotSection = document.getElementById('chatbot');
    const doctorListSection = document.getElementById('doctor-list');
    const appointmentSection = document.getElementById('appointment');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const appointmentForm = document.getElementById('appointment-form');
    const fileUploadForm = document.getElementById('file-upload-form');
    const feedbackForm = document.getElementById('feedback-form');

    // Disease selection
    diseaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const disease = this.dataset.disease;
            if (disease === 'other') {
                showDoctorList();
            } else {
                showChatbot();
            }
        });
    });

    // Chatbot functionality
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            // Simulate chatbot response (replace with actual backend call)
            setTimeout(() => {
                addMessage('bot', 'Thank you for your message. Here are some recommendations...');
            }, 1000);
            userInput.value = '';
        }
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Doctor list functionality
    function showDoctorList() {
        chatbotSection.classList.add('hidden');
        doctorListSection.classList.remove('hidden');
        appointmentSection.classList.remove('hidden');

        // Simulate fetching doctor list (replace with actual backend call)
        const doctors = [
            { id: 1, name: 'Dr. John Doe', specialty: 'General Practitioner' },
            { id: 2, name: 'Dr. Jane Smith', specialty: 'Cardiologist' },
            { id: 3, name: 'Dr. Mike Johnson', specialty: 'Pediatrician' }
        ];

        const doctorContainer = document.getElementById('doctor-container');
        doctorContainer.innerHTML = '';
        doctors.forEach(doctor => {
            const doctorElement = document.createElement('div');
            doctorElement.innerHTML = `<h3>${doctor.name}</h3><p>${doctor.specialty}</p>`;
            doctorContainer.appendChild(doctorElement);
        });

        // Populate appointment form
        const doctorSelect = document.getElementById('doctor');
        doctorSelect.innerHTML = '';
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    }

    function showChatbot() {
        chatbotSection.classList.remove('hidden');
        doctorListSection.classList.add('hidden');
        appointmentSection.classList.add('hidden');
    }

    // Appointment booking
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        alert(`Appointment booked with Doctor ID ${doctor} on ${date} at ${time}`);
    });

    // File upload
    fileUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('file-input');
        const files = fileInput.files;
        if (files.length > 0) {
            const uploadStatus = document.getElementById('upload-status');
            uploadStatus.textContent = `${files.length} file(s) uploaded successfully.`;
        }
    });

    // Feedback submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
        alert(`Thank you for your feedback! Rating: ${rating}, Comment: ${comment}`);
    });
});