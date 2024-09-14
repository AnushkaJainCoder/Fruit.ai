// script.js

// Get the elements
const aboutBox = document.getElementById('aboutBox');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Show the popup when the "About" box is clicked
aboutBox.addEventListener('click', () => {
    popup.style.display = 'block';
});

// Hide the popup when the "Close" button is clicked
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Optionally, you can also hide the popup when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
