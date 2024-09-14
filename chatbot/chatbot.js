document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    const fruits = [
        { id: 1, name: 'Apple', image: 'Images/apple.png', pricePerUnit: 2.5 },
        { id: 2, name: 'Grapes', image: 'Images/grapes.png', pricePerUnit: 1.2 },
        { id: 3, name: 'Orange', image: 'Images/Tangerine.png', pricePerUnit: 3.0 }
    ];

    const selectedQuantities = {};

    function addMessage(content, isUser = false) {
        const message = document.createElement('div');
        message.classList.add('chat-message');
        message.classList.add(isUser ? 'user-message' : 'bot-message');
        message.innerHTML = content;
        chatBody.appendChild(message);
        chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom of chat
    }

    function renderFruitList(fruits) {
        return `
            <ul class="fruit-list">
                ${fruits.map(fruit => {
                    const quantity = selectedQuantities[fruit.id] || 0;
                    const totalPrice = quantity * fruit.pricePerUnit;
                    return `
                        <li class="fruit-item">
                            <div class="fruit-image">
                                <img src="${fruit.image}" alt="${fruit.name}">
                            </div>
                            <div class="fruit-info">
                                <h3 id="fruit-name">${fruit.name}</h3>
                                <p id="single-item-price">$${fruit.pricePerUnit.toFixed(2)}</p>
                            </div>
                            <div class="quantity-controls">
                                <button class="quantity-decrease" data-id="${fruit.id}">-</button>
                                <span id="quantity-${fruit.id}" class="quantity">${quantity}</span>
                                <button class="quantity-increase" data-id="${fruit.id}">+</button>
                                <br>
                                <p id="price-${fruit.id}" class="price">Total Price: $${totalPrice.toFixed(2)}</p>
                            </div>
                        </li>
                    `;
                }).join('')}
            </ul>
        `;
    }

    function handleUserMessage(message) {
        if (message.toLowerCase() === 'all list') {
            addMessage(renderFruitList(fruits), false);
        } else {
            const fruit = fruits.find(f => f.name.toLowerCase() === message.toLowerCase());
            if (fruit) {
                addMessage(renderFruitList([fruit]), false);  // Only display the selected fruit
            } else {
                addMessage('Sorry, the item is not available right now.', false);
            }
        }
    }

    function updateQuantity(fruitId, action) {
        if (!selectedQuantities[fruitId]) {
            selectedQuantities[fruitId] = 0;
        }

        if (action === 'increase') {
            selectedQuantities[fruitId]++;
        } else if (action === 'decrease' && selectedQuantities[fruitId] > 0) {
            selectedQuantities[fruitId]--;
        }

        // Update the displayed quantity and total price
        document.getElementById(`quantity-${fruitId}`).textContent = selectedQuantities[fruitId];
        document.getElementById(`price-${fruitId}`).textContent = `Total Price: $${(selectedQuantities[fruitId] * fruits.find(fruit => fruit.id === fruitId).pricePerUnit).toFixed(2)}`;
    }

    sendMessage.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            handleUserMessage(message);
            userInput.value = '';
        }
    });

    // Handle clicks for quantity adjustment buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-increase') || event.target.classList.contains('quantity-decrease')) {
            const fruitId = parseInt(event.target.getAttribute('data-id'));
            const action = event.target.classList.contains('quantity-increase') ? 'increase' : 'decrease';
            updateQuantity(fruitId, action);
        }
    });
});
