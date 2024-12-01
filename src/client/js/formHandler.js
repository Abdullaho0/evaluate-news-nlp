import { isValidURL } from './urlChecker';

const serverURL =
process.env.NODE_ENV === 'production'
    ? '/analyze' // Production: Use relative path (handled by Express)
    : 'http://localhost:8000/analyze'; // Development: Use full URL for devServer
;

// Check if running in a browser environment before accessing the DOM
if (typeof document !== 'undefined') {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Validate the URL
    if (!isValidURL(formText)) {
        alert("Please enter a valid URL!");
        return;
    }

    // If the URL is valid, send it to the server
    try {
        const serverResponse = await sendDataToServer({ text: formText, lang: "en" });
        updateUI(serverResponse); // Call a function to update the UI with the server response
    } catch (error) {
        console.error("Error in handleSubmit:", error);
        alert("An error occurred while processing your request. Please try again.");
    }
}

// Function to send data to the server
async function sendDataToServer(data) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the text and language as JSON
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const serverData = await response.json();
        return serverData; // Return the server's response to the caller
    } catch (error) {
        console.error("Error in sendDataToServer:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}
export{sendDataToServer};

// Function to update the UI with the server's response
function updateUI(data) {
    const resultSection = document.getElementById('results');
    resultSection.innerHTML = `
        <h3>Analysis Results:</h3>
        <p><strong>Score Tag:</strong> ${data.score_tag || "N/A"}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity || "N/A"}</p>
        <p><strong>Confidence:</strong> ${data.confidence || "N/A"}%</p>
        <p><strong>Irony:</strong> ${data.irony || "N/A"}</p>
    `;
}

export { handleSubmit};
