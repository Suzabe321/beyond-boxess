const products = [
    {
        name: "Birthday Special",
        image: "https://placehold.co/600x400/722F37/E6CBA8?text=Birthday+Special",
        description: "Make birthdays extraordinary with our specially curated gift boxes",
        subProducts: [
            {
                name: "Premium Birthday Box",
                price: "₹2999",
                description: "Luxury items with premium packaging"
            },
            {
                name: "Wooden Birthday Box",
                price: "₹3499",
                description: "Elegant wooden box with personalized gifts"
            },
            {
                name: "Surprise Birthday Box",
                price: "₹1999",
                description: "Mystery items carefully selected for the perfect surprise"
            },
            {
                name: "Kids Birthday Box",
                price: "₹1499",
                description: "Fun-filled boxes perfect for children"
            },
            {
                name: "Customized Birthday Box",
                price: "₹2499",
                description: "Personalized items based on recipient's preferences"
            }
        ]
    },
    {
        name: "Anniversary Special",
        image: "https://placehold.co/600x400/722F37/E6CBA8?text=Anniversary+Special",
        description: "Celebrate love with our romantic anniversary collections",
        subProducts: [
            {
                name: "Romantic Luxury Box",
                price: "₹3999",
                description: "Premium romantic gifts for couples"
            },
            {
                name: "Silver Anniversary Box",
                price: "₹4499",
                description: "Special silver-themed celebration box"
            },
            {
                name: "Couples Spa Box",
                price: "₹2999",
                description: "Relaxation and wellness gifts for couples"
            },
            {
                name: "Memory Box",
                price: "₹2499",
                description: "Customizable box for precious memories"
            },
            {
                name: "Date Night Box",
                price: "₹1999",
                description: "Perfect items for a romantic evening"
            }
        ]
    },
    // ... [Previous products remain the same, continuing with remaining products]
];

// Function to create product cards
function createProductCards() {
    const mainProducts = document.querySelector('.main-products');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="order-button" onclick="orderProduct('${product.name}')">Order Now</button>
            <button class="read-more" onclick="showSubProducts('${product.name}')">View Options</button>
        `;
        mainProducts.appendChild(card);
    });
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Function to handle WhatsApp ordering
function orderProduct(productName) {
    const message = encodeURIComponent(`I am interested in ${productName}`);
    window.open(`https://wa.me/917406839266?text=${message}`);
}

// Function to show sub-products modal
function showSubProducts(productName) {
    const product = products.find(p => p.name === productName);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${productName} Options</h2>
            <div class="sub-products">
                ${product.subProducts.map(sub => `
                    <div class="sub-product">
                        <h4>${sub.name}</h4>
                        <p>${sub.description}</p>
                        <p class="price">${sub.price}</p>
                        <button class="order-button" onclick="orderProduct('${sub.name}')">Order Now</button>
                    </div>
                `).join('')}
            </div>
            <button class="order-button" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

// Function to toggle settings panel
function toggleSettings() {
    document.querySelector('.settings-panel').classList.toggle('active');
}

// Function to change theme
function changeTheme(theme) {
    document.body.className = theme;
}

// Function to change text size
function changeTextSize(action) {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    html.style.fontSize = action === 'increase' 
        ? `${currentSize + 1}px` 
        : `${currentSize - 1}px`;
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    createProductCards();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-icon')) {
            document.querySelector('.mobile-menu').classList.remove('active');
        }
    });
});

