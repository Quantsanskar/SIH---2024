import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyDnzM3GQINumQkNK1q2Azv3LAVo-YWX76w";
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
        alert('Please enter both a medical problem/specialist and a location.');
        return;
    }

    showLoading();

    const prompt = `Find and list medical specialists or hospitals for ${problem} near ${location}. Provide a list of as much options possible with name, specialty, address, and contact information if available. Format the response as JSON without any markdown formatting.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean the response and attempt to parse it as JSON
        let specialists;
        try {
            const cleanedText = cleanJsonResponse(text);
            specialists = JSON.parse(cleanedText);
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            specialists = [{ name: 'Error', details: 'Failed to retrieve specialist information. Please try again.' }];
        }

        displayResults(specialists);
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
    } finally {
        hideLoading();
    }
}

function cleanJsonResponse(text) {
    // Remove any markdown code block indicators and trim whitespace
    return text.replace(/```json/gi, '').replace(/```/g, '').trim();
}

function displayResults(specialists) {
    resultsContainer.innerHTML = '';

    if (!Array.isArray(specialists)) {
        specialists = [specialists]; // Convert to array if it's a single object
    }

    specialists.forEach(specialist => {
        const card = document.createElement('div');
        card.className = 'specialist-card';

        const name = document.createElement('div');
        name.className = 'specialist-name';
        name.textContent = specialist.name || 'Name not available';

        const details = document.createElement('div');
        details.className = 'specialist-details';
        details.innerHTML = formatSpecialistDetails(specialist);

        card.appendChild(name);
        card.appendChild(details);
        resultsContainer.appendChild(card);
    });
}

function formatSpecialistDetails(specialist) {
    let detailsHtml = '';
    if (specialist.specialty) detailsHtml += `<p><strong>Specialty:</strong> ${specialist.specialty}</p>`;
    if (specialist.address) detailsHtml += `<p><strong>Address:</strong> ${specialist.address}</p>`;
    if (specialist.contact) detailsHtml += `<p><strong>Contact:</strong> ${specialist.contact}</p>`;
    return detailsHtml || 'No additional details available';
}

function showLoading() {
    loadingIndicator.style.display = 'flex';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}