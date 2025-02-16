// Product Data
const products = [
    {
        id: 'birthday',
        name: 'Birthday Special',
        image: 'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a',
        description: 'Make birthdays extraordinary with our specially curated gift boxes',
        subProducts: [
            {
                name: 'Premium Birthday Box',
                price: '₹2999',
                description: 'Luxury items with premium packaging',
                contents: [
                    'Premium chocolates',
                    'Personalized card',
                    'Birthday decorations',
                    'Scented candle',
                    'Custom message'
                ]
            },
            {
                name: 'Wooden Birthday Box',
                price: '₹3499',
                description: 'Elegant wooden box with personalized gifts',
                contents: [
                    'Handcrafted wooden box',
                    'Photo frame',
                    'Premium treats',
                    'Birthday accessories',
                    'Personalized message'
                ]
            },
            {
                name: 'Kids Birthday Box',
                price: '₹1999',
                description: 'Fun-filled boxes for children',
                contents: [
                    'Age-appropriate toys',
                    'Party accessories',
                    'Sweet treats',
                    'Activity kit',
                    'Birthday crown'
                ]
            },
            {
                name: 'Surprise Birthday Box',
                price: '₹2499',
                description: 'Mystery items for the perfect surprise',
                contents: [
                    'Mystery gifts',
                    'Party essentials',
                    'Premium snacks',
                    'Celebration items',
                    'Special message'
                ]
            },
            {
                name: 'Custom Birthday Box',
                price: '₹3999',
                description: 'Fully customizable birthday box',
                contents: [
                    'Your choice of items',
                    'Custom packaging',
                    'Personalized message',
                    'Theme selection',
                    'Premium wrapping'
                ]
            }
        ]
    },
    {
        id: 'anniversary',
        name: 'Anniversary Special',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
        description: 'Celebrate love with our romantic anniversary collections',
        subProducts: [
            {
                name: 'Romantic Luxury Box',
                price: '₹4999',
                description: 'Premium romantic gifts for couples',
                contents: [
                    'Couple gifts',
                    'Romantic decorations',
                    'Premium chocolates',
                    'Scented candles',
                    'Love message'
                ]
            },
            // Add more sub-products for anniversary
        ]
    },
    // Add remaining main products with their sub-products
];

// Function to create and display product cards
function createProductCards() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="button-group">
                    <button class="order-button" onclick="orderProduct('${product.id}')">Order Now</button>
                    <button class="view-more" onclick="showSubProducts('${product.id}')">View Options</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Function to show sub-products modal
function showSubProducts(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${product.name} Collections</h2>
            <div class="sub-products">
                ${product.subProducts.map(sub => `
                    <div class="sub-product">
                        <h4>${sub.name}</h4>
                        <p>${sub.description}</p>
                        <p class="price">${sub.price}</p>
                        <div class="contents">
                            <h5>Box Contents:</h5>
                            <ul>
                                ${sub.contents.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="order-button" onclick="orderSubProduct('${product.name}', '${sub.name}', '${sub.price}')">
                            Order Now
                        </button>
                    </div>
                `).join('')}
            </div>
            <button class="close-button" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Function to handle main product order
function orderProduct(productId) {
    const product = products.find(p => p.id === productId);
    const message = `Hi, I'm interested in the ${product.name} collection from Beyond Boxes. Could you please provide more details?`;
    openWhatsApp(message);
}

// Function to handle sub-product order
function orderSubProduct(mainProduct, subProduct, price) {
    const message = `Hi, I'm interested in ordering the ${subProduct} (${price}) from the ${mainProduct} collection. Could you please provide more details?`;
    openWhatsApp(message);
}

// Function to open WhatsApp
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917406839266?text=${encodedMessage}`);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Settings Panel Functions
function toggleSettings() {
    const settingsPanel = document.querySelector('.settings-panel');
    settingsPanel.classList.toggle('active');
}

function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

function changeTextSize(action) {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    const newSize = action === 'increase' ? currentSize + 1 : currentSize - 1;
    html.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize);
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    createProductCards();
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
    
    // Apply saved font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
});

// Close settings panel when clicking outside
document.addEventListener('click', (e) => {
    const settingsPanel = document.querySelector('.settings-panel');
    const settingsIcon = document.querySelector('.settings-icon');
    
    if (!settingsPanel.contains(e.target) && e.target !== settingsIcon) {
        settingsPanel.classList.remove('active');
    }
});
