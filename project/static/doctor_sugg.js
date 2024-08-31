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

    const prompt = `I am experiencing ${problem}. Please suggest doctors and hospitals near ${location} that specialize in treating ${problem}. Provide the following information for each suggestion:

* **Doctor or Hospital Name:**
* **Specialization:**
* **Address:**
* **Contact Information:**
* **Timings:**
* **User Reviews:**
* **Severity Level:** [normal, severe, danger]
* **Website:** [Find and display the website]

Based on the severity level of my ${problem}, please recommend doctors or hospitals that are appropriate for my condition. I would prefer real-time data and a comprehensive list of options. Please display the results in the following format:

**Doctors and Hospitals for ${problem} Treatment in ${location}**

### Normal Severity Level

**Doctor Name:** Dr. [Doctor's Name]
**Specialization:** [Doctor's Specialization]
**Address:** [Doctor's or Hospital's Address]
**Contact Information:**
* **Phone:** [Phone Number]
* **Email:** [Email Address]
* **Website:** [Display the website found online]
**Timings:** [Timings]
**User Reviews:** [Average Rating] (Example: 4.5/5)

**Hospital Name:** [Hospital Name]
**Specialization:** [Hospital's Specialization]
**Address:** [Hospital's Address]
**Contact Information:**
* **Phone:** [Phone Number]
* **Email:** [Email Address]
* **Website:** [Display the website found online]
* **Timings:** [Timings]
* **User Reviews:** [Average Rating] (Example: 4.2/5)

[Repeat for Severe and Danger Severity Levels]`;
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