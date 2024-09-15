// Mock function to fetch FAQs from the server (replace with actual API call)
async function fetchFaqs() {
    try {
        const response = await fetch('http://127.0.0.1:5000/faqs');
        const data = await response.json();
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

    faqs.forEach((faq, index) => {
        const faqItem = document.createElement('li');
        faqItem.innerHTML = `
            <div class="actions">
                <button class="editBtn" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="deleteBtn" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
            <p><strong>Q${index + 1}:</strong> ${faq.question}</p>
            <p><strong>A:</strong> ${faq.answer}</p>
        `;
        faqsContainer.appendChild(faqItem);
    });
}

// Function to handle Edit FAQ
function handleEdit(event) {
    if (event.target.classList.contains('editBtn') || event.target.closest('.editBtn')) {
        const index = event.target.closest('.editBtn').getAttribute('data-index');
        const faqItem = event.target.closest('li');
        const question = faqItem.querySelector('p:nth-of-type(1)').textContent.replace(/^Q\d+:/, '').trim();
        const answer = faqItem.querySelector('p:nth-of-type(2)').textContent.replace('A:', '').trim();

        document.getElementById('question').value = question;
        document.getElementById('answer').value = answer;

        const faqForm = document.getElementById('faqForm');
        faqForm.dataset.index = index; // Store index for editing

        modal.style.display = 'flex'; // Show modal for editing
    }
}

// Function to handle Delete FAQ
async function handleDelete(event) {
    if (event.target.classList.contains('deleteBtn') || event.target.closest('.deleteBtn')) {
        const index = event.target.closest('.deleteBtn').getAttribute('data-index');
        const faqs = await fetchFaqs();
        const faqId = faqs[index].id; // Retrieve the ID of the FAQ to delete

        const response = await fetch(`http://127.0.0.1:5000/faqs/${faqId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Fetch and re-render FAQs after deleting
            const updatedFaqs = await fetchFaqs();
            renderFaqs(updatedFaqs);
        } else {
            console.error('Failed to delete FAQ:', response.statusText);
        }
    }
}

// Function to submit a new FAQ or update an existing one
async function submitFaq(faq) {
    const faqForm = document.getElementById('faqForm');
    const index = faqForm.dataset.index;
    const method = index ? 'PUT' : 'POST';
    const url = index 
        ? `http://127.0.0.1:5000/faqs/${index}` 
        : 'http://127.0.0.1:5000/faqs';

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
    });

    if (response.ok) {
        // Fetch and re-render FAQs after adding or updating
        const faqs = await fetchFaqs();
        renderFaqs(faqs);
        document.getElementById('faqForm').reset(); // Clear form
        delete document.getElementById('faqForm').dataset.index; // Remove index for new additions
        modal.style.display = 'none'; // Close modal
    } else {
        console.error('Failed to submit FAQ:', response.statusText);
    }
}

// Handle form submission
document.getElementById('faqForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;

    submitFaq({ question, answer });
});

// Attach event listeners to the FAQ list for edit and delete actions
document.getElementById('faqsContainer').addEventListener('click', handleEdit);
document.getElementById('faqsContainer').addEventListener('click', handleDelete);

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

// Initial FAQ Fetch and Render
window.onload = async () => {
    const faqs = await fetchFaqs();
    renderFaqs(faqs);
};
