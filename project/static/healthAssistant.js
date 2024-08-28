import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyDnzM3GQINumQkNK1q2Azv3LAVo-YWX76w"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const questions = [
    {name: 'name', id: 'name', text: 'What is your name?', type: 'text' },
    {name: 'age',  id: 'age', text: 'What is your age?', type: 'number' },
    {name: 'gender', id: 'gender', text: 'What is your gender?', type: 'select', options: ['Male', 'Female', 'Other'] },
    {name: 'height', id: 'height', text: 'What is your height (in cm)?', type: 'number' },
    {name: 'weight', id: 'weight', text: 'What is your weight (in kg)?', type: 'number' },
    {name: 'occupation', id: 'occupation', text: 'What is your occupation?', type: 'text' },
    {name: 'exercise', id: 'exercise', text: 'How often do you exercise?', type: 'select', options: ['Never', 'Occasionally', 'Regularly', 'Daily'] },
    {name: 'diet', id: 'diet', text: 'How would you describe your current diet?', type: 'select', options: ['Balanced', 'High in processed foods', 'Vegetarian', 'Vegan', 'Other'] },
    {name: 'medication', id: 'medicalConditions', text: 'Do you have any existing medical conditions?', type: 'text' },
    {name: 'stress', id: 'stress', text: 'How would you rate your stress level?', type: 'select', options: ['Low', 'Moderate', 'High', 'Very High'] }
];

let currentQuestionIndex = 0;
const answers = {};

function displayQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const currentQuestion = questions[currentQuestionIndex];

    let questionHTML = `<h3 class="fade-in">${currentQuestion.text}</h3>`;

    if (currentQuestion.type === 'select') {
        questionHTML += `<select id="${currentQuestion.id}" class="fade-in">`;
        currentQuestion.options.forEach(option => {
            questionHTML += `<option value="${option}">${option}</option>`;
        });
        questionHTML += '</select>';
    } else {
        questionHTML += `<input type="${currentQuestion.type}" id="${currentQuestion.id}" class="fade-in">`;
    }

    questionHTML += '<button onclick="nextQuestion()" class="fade-in">Next</button>';

    questionContainer.innerHTML = questionHTML;
}

function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = document.getElementById(currentQuestion.id).value;

    if (answer.trim() === '') {
        alert('Please answer the question before proceeding.');
        return;
    }

    answers[currentQuestion.id] = answer;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showSubmitButton();
    }
}

function showSubmitButton() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'block';
    document.getElementById('submitBtn').addEventListener('click', generateRecommendations);
}

async function generateRecommendations() {
    const recommendationContainer = document.getElementById('recommendationContainer');
    recommendationContainer.style.display = 'block';

    const prompt = `Based on the following health information, provide personalized recommendations for a diet plan, meal recipes, health precautions, and safety guidelines. Include specific advice from WHO guidelines where applicable. Here's the patient information:

    Name: ${answers.name}
    Age: ${answers.age}
    Gender: ${answers.gender}
    Height: ${answers.height} cm
    Weight: ${answers.weight} kg
    Occupation: ${answers.occupation}
    Exercise Frequency: ${answers.exercise}
    Current Diet: ${answers.diet}
    Medical Conditions: ${answers.medicalConditions}
    Stress Level: ${answers.stress}

    Please provide detailed recommendations in the following format:
    1. Diet Plan:
    2. Meal Recipes in details like how to prepare it from scratch:
    3. Health Precautions:
    4. Safety Guidelines:
    And specially provide the current diease pattern accoding to who data from which maximum patient are suffering and
    always generate an unique and engazing article to educate the user about the same
    Also suggest home remedy or general household methods to cure the current medical condition of the user 
    And provide the meal recipies and diet plan in details and try to suggest the easily aavailable meal spcially in India
     `;

    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    // Save the responses to the Django backend
    try {
        const response = await fetch('/health_assis/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Include CSRF token for Django
            },
            body: JSON.stringify(answers)
        });

        const result = await response.json();
        if (result.status === 'success') {
            console.log('Data saved successfully');
        } else {
            console.error('Error saving data:', result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('submitBtn').style.display = 'none';
}

function typeText(element, text) {
    let index = 0;
    element.innerHTML = '';
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 20);
        } else {
            element.classList.add('fade-in');
        }
    }
    type();
}


// Start the questionnaire
displayQuestion();

// Make nextQuestion available globally
window.nextQuestion = nextQuestion;