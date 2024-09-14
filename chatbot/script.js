document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    const fruits = [
        {
            id: 1,
            name: 'Apple',
            image: 'apple.jpg', // Add a valid image path
            pricePerUnit: 2.5
        },
        {
            id: 2,
            name: 'Banana',
            image: 'banana.jpg', // Add a valid image path
            pricePerUnit: 1.2
        },
        {
            id: 3,
            name: 'Orange',
            image: 'orange.jpg', // Add a valid image path
            pricePerUnit: 3.0
        }
    ];

    function addMessage(content, isUser = false) {
        const message = document.createElement('div');
        message.classList.add('chat-message');
        message.classList.add(isUser ? 'user-message' : 'bot-message');
        message.innerHTML = content;
        chatBody.appendChild(message);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function renderFruitCard(fruit) {
        return `
            <div class="fruit-card" data-id="${fruit.id}">
                <img src="${fruit.image}" alt="${fruit.name}">
                <h3>${fruit.name}</h3>
                <div class="quantity-control">
                    <button class="decrease-btn" data-id="${fruit.id}">-</button>
                    <span class="quantity" id="quantity-${fruit.id}">1</span>
                    <button class="increase-btn" data-id="${fruit.id}">+</button>
                </div>
                <div class="price">Price: $<span id="price-${fruit.id}">${fruit.pricePerUnit}</span></div>
            </div>
        `;
    }

    function handleUserMessage(message) {
        if (message.toLowerCase() === 'all list') {
            fruits.forEach(fruit => {
                addMessage(renderFruitCard(fruit), false);
            });
        } else {
            const fruit = fruits.find(f => f.name.toLowerCase() === message.toLowerCase());
            if (fruit) {
                addMessage(renderFruitCard(fruit), false);
            } else {
                addMessage('I\'m sorry, I don\'t recognize that fruit.', false);
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
            addMessage(message, true); // User message
            handleUserMessage(message);
            userInput.value = ''; // Clear input after sending
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click(); // Trigger click on Enter key
        }
    });
});
