// script.js

// Product Data
const products = [
    {
        id: 1,
        category: 'birthday',
        name: "Birthday Special",
        description: "Make birthdays extraordinary with our specially curated gift boxes.",
        image: "images/birthday/main-birthday.jpg",
        subProducts: [
            {
                id: 'b1',
                name: "Premium Birthday Box",
                description: "A luxurious collection featuring premium chocolates, personalized cards, scented candles, and custom decorative items.",
                price: 3999,
                maxPrice: 5999,
                image: "images/birthday/premium-birthday.jpg",
                includes: [
                    "Premium Belgian Chocolates",
                    "Personalized Birthday Card",
                    "Luxury Scented Candle",
                    "Custom Birthday Decorations",
                    "Elegant Gift Wrapping"
                ]
            },
            {
                id: 'b2',
                name: "Wooden Birthday Box",
                description: "Handcrafted wooden box filled with premium gifts and keepsakes.",
                price: 4499,
                maxPrice: 6499,
                image: "images/birthday/wooden-birthday.jpg",
                includes: [
                    "Handcrafted Wooden Box",
                    "Premium Gift Items",
                    "Photo Frame",
                    "Personalized Message",
                    "Luxury Treats"
                ]
            },
            // Add other birthday sub-products...
        ]
    },
    // Add other main categories...
];

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

function initializeWebsite() {
    // Remove preloader
    setTimeout(() => {
        document.getElementById('preloader').style.display = 'none';
    }, 1000);

    renderProducts();
    setupEventListeners();
    initializeSettings();
    initializeCart();
}

// Product Rendering
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-buttons">
                    <button class="read-more-btn" onclick="showProductDetails(${product.id})">
                        Read More
                    </button>
                    <button class="view-products-btn" onclick="showProductDetails(${product.id})">
                        View Products
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    const modalBody = modal.querySelector('.modal-body');

    modalBody.innerHTML = `
        <div class="product-detail-content">
            <h2>${product.name}</h2>
            <div class="product-main-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <p class="product-description">${product.description}</p>
            
            <h3>Available Options</h3>
            <div class="sub-products-grid">
                ${product.subProducts.map(sub => `
                    <div class="sub-product-card">
                        <img src="${sub.image}" alt="${sub.name}">
                        <h4>${sub.name}</h4>
                        <p class="sub-description">${sub.description}</p>
                        <div class="price-tag">
                            <span>Starting from</span>
                            <h5>₹${sub.price.toLocaleString()}</h5>
                        </div>
                        <div class="includes-section">
                            <h6>What's Included:</h6>
                            <ul>
                                ${sub.includes.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${sub.id}')">
                            Add to Cart
                        </button>
                        <button class="order-now-btn" onclick="orderNow('${product.name} - ${sub.name}')">
                            Order Now
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(productId, subProductId) {
        const product = products.find(p => p.id === productId);
        const subProduct = product.subProducts.find(sp => sp.id === subProductId);
        
        const existingItem = this.items.find(item => 
            item.productId === productId && item.subProductId === subProductId
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                productId,
                subProductId,
                name: subProduct.name,
                price: subProduct.price,
                quantity: 1,
                image: subProduct.image
            });
        }

        this.updateTotal();
        this.updateCartUI();
        this.showNotification('Item added to cart');
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );
    }

    updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.querySelector('.cart-count');

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button onclick="cart.updateQuantity('${item.productId}', '${item.subProductId}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.productId}', '${item.subProductId}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="cart.removeItem('${item.productId}', '${item.subProductId}')">×</button>
            </div>
        `).join('');

        cartTotal.textContent = this.total.toLocaleString();
        cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// WhatsApp Integration
function orderNow(product) {
    const message = `Hello! I am interested in ordering the ${product} from Beyond Boxes.
    
Could you please provide details about:
- Current availability
- Customization options
- Delivery timeline
- Payment methods

Thank you!`;
    
    window.open(`https://wa.me/917406839266?text=${encodeURIComponent(message)}`);
}

// Event Listeners
function setupEventListeners() {
    // Settings Panel Toggle
    document.getElementById('settings-toggle').addEventListener('click', () => {
        document.getElementById('settings-panel').classList.toggle('active');
    });

    // Cart Panel Toggle
    document.getElementById('cart-toggle').addEventListener('click', () => {
        document.getElementById('cart-panel').classList.toggle('active');
    });

    // Category Filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterProducts(category);
        });
    });

    // Search Functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
}

// Filter Products
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search Products
function searchProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    searchTerm = searchTerm.toLowerCase();

    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize Settings
function initializeSettings() {
    const root = document.documentElement;
    let fontSize = 16;

    // Theme Toggle
    document.getElementById('light-theme').addEventListener('click', () => {
        root.style.setProperty('--midnight-blue', '#F8F3F1');
        root.style.setProperty('--pearl-white', '#1B1F3B');
    });

    document.getElementById('dark-theme').addEventListener('click', () => {
        root.style.setProperty('--midnight-blue', '#1B1F3B');
        root.style.setProperty('--pearl-white', '#F8F3F1');
    });

    // Font Size Controls
    document.getElementById('increase-font').addEventListener('click', () => {
        if (fontSize < 20) {
            fontSize += 2;
            document.body.style.fontSize = `${fontSize}px`;
        }
    });

    document.getElementById('decrease-font').addEventListener('click', () => {
        if (fontSize > 12) {
            fontSize -= 2;
            document.body.style.fontSize = `${fontSize}px`;
        }
    });
}
