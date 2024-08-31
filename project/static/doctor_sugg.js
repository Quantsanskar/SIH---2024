import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyDnzM3GQINumQkNK1q2Azv3LAVo-YWX76w"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const problemInput = document.getElementById('problem');
const locationInput = document.getElementById('location');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results');
const loadingIndicator = document.getElementById('loading');

searchBtn.addEventListener('click', searchSpecialists);

async function searchSpecialists() {
    const problem = problemInput.value.trim();
    const location = locationInput.value.trim();

    if (!problem || !location) {
        alert('Please enter both a medical problem and a location.');
        return;
    }

    showLoading();

    const prompt = `I am having ${problem}. Suggest me doctors near ${location}. If contact details are avialable then also display that(optional).`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        displayResults(text);
    } catch (error) {
        console.error('Error:', error);
        displayResults('An error occurred while searching for specialists. Please try again later.');
    } finally {
        hideLoading();
    }
}

function displayResults(content) {
    resultsContainer.textContent = content;
}

function showLoading() {
    loadingIndicator.style.display = 'block';
    resultsContainer.textContent = '';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}