// script.js

// Mock function to fetch FAQs from the server (replace with actual API call)
async function fetchFaqs() {
    try {
        const response = await fetch('http://127.0.0.1:5000/faqs');

        console.log('Response:', response);  // Check response object
        const data = await response.json();
        console.log('Data:', data);  // Check parsed JSON data
        return data;
    } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        return [];
    }
}



// Render FAQs on the page
function renderFaqs(faqs) {
    const faqsContainer = document.getElementById('faqsContainer');
    faqsContainer.innerHTML = ''; // Clear existing content

    faqs.forEach(faq => {
        const faqItem = document.createElement('li');
        faqItem.innerHTML = `
            <p><strong>ID:</strong> ${faq.id}</p>
            <p><strong>Q:</strong> ${faq.question}</p>
            <p><strong>A:</strong> ${faq.answer}</p>
        `;
        faqsContainer.appendChild(faqItem);
    });
}

// Function to submit a new FAQ
async function addFaq(faq) {
    const response = await fetch('http://127.0.0.1:5000/faqs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
    });

    if (response.ok) {
        // Fetch and re-render FAQs after adding
        const faqs = await fetchFaqs();
        renderFaqs(faqs);
    }
}

// Modal behavior (open/close form)
const modal = document.getElementById('faqModal');
const addFaqBtn = document.getElementById('addFaqBtn');
const closeModal = document.querySelector('.close');

// Open the modal
addFaqBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Handle form submission
document.getElementById('faqForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;

    // Add FAQ and close modal
    addFaq({ question, answer });
    modal.style.display = 'none';
});

// Initial FAQ Fetch and Render
window.onload = async () => {
    const faqs = await fetchFaqs();
    renderFaqs(faqs);
};
