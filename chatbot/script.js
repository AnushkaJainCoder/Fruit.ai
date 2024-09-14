document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    const fruits = [
        {
            id: 1,
            name: 'Apple',
            image: 'apple',
            pricePerUnit: 2.5
        },
        {
            id: 2,
            name: 'Banana',
            image: 'banana.jpg',
            pricePerUnit: 1.2
        },
        {
            id: 3,
            name: 'Orange',
            image: 'orange.jpg',
            pricePerUnit: 3.0
        }
    ];
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
            <div class="fruit-list">
                ${fruits.map(fruit => `
                    <div class="fruit-item" data-id="${fruit.id}">
                        <img src="${fruit.image}" alt="${fruit.name}">
                        <h3>${fruit.name}</h3>
                        <div class="quantity-control">
                            <button class="decrease-btn" data-id="${fruit.id}">-</button>
                            <span class="quantity" id="quantity-${fruit.id}">1</span>
                            <button class="increase-btn" data-id="${fruit.id}">+</button>
                            <div class="price">Price: $<span id="price-${fruit.id}">${fruit.pricePerUnit}</span></div>
                        </div>
                    </div>
                `).join('')}
            </div>
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
                addMessage('Sorry, I don’t recognize that fruit.', false);
            }
        }
        addQuantityListeners();
    }

    function addQuantityListeners() {
        document.querySelectorAll('.increase-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                updateQuantity(id, 1);
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                updateQuantity(id, -1);
            });
        });
    }

    function updateQuantity(id, change) {
        const quantityElement = document.getElementById(`quantity-${id}`);
        const priceElement = document.getElementById(`price-${id}`);
        const fruit = fruits.find(f => f.id === parseInt(id));
        let quantity = parseInt(quantityElement.textContent);
        quantity = Math.max(1, quantity + change); // Ensure quantity is at least 1
        quantityElement.textContent = quantity;
        priceElement.textContent = (fruit.pricePerUnit * quantity).toFixed(2);
    }

    sendMessage.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            handleUserMessage(message);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
});
