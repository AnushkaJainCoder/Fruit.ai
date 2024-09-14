// Get the elements
const aboutBox = document.getElementById('aboutBox');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const homepageContainer = document.getElementById('homepageContainer');
const closePopup = document.getElementById('closePopup');

// Show the popup and overlay, and hide the homepage content when the "About" box is clicked
aboutBox.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
    homepageContainer.classList.add('hidden'); // Hide homepage content
});

// Hide the popup and overlay, and show the homepage content when the "Close" button is clicked
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    homepageContainer.classList.remove('hidden'); // Show homepage content
});

// Optionally, hide the popup and overlay, and show the homepage content when clicking outside of the popup
window.addEventListener('click', (event) => {
    if (event.target === overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        homepageContainer.classList.remove('hidden'); // Show homepage content
    }
});
