// Core Configuration
const CONFIG = {
    WHATSAPP_NUMBER: '917406839266',
    CURRENCY: '₹',
    DEFAULT_DELIVERY_TIME: '2-3 business days',
    FREE_DELIVERY_THRESHOLD: 1999,
    ANIMATION_DURATION: 300,
    IMAGE_QUALITY: 'high', // 'low', 'medium', 'high'
};

// Utility Functions
const utils = {
    formatPrice(price) {
        return `${CONFIG.CURRENCY}${price.toLocaleString('en-IN')}`;
    },
    
    generateDescription(details) {
        return `${details.shortDesc} | ${details.boxSize} | ${details.deliveryTime}`;
    },
    
    createWhatsAppLink(message) {
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

// Product Database
const products = [
    {
        id: "birthday",
        name: "Birthday Special",
        image: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a",
        description: "Make birthdays extraordinary with our specially curated gift boxes",
        category: "celebration",
        rating: 4.8,
        reviews: 245,
        details: {
            shortDesc: "Premium birthday gift collections",
            boxSize: "12\" x 10\" x 6\"",
            deliveryTime: CONFIG.DEFAULT_DELIVERY_TIME,
            materials: "Premium cardboard, silk lining, gold accents",
            packaging: "Luxury gift wrap with satin ribbon",
            customization: "Available",
        },
        subProducts: [
            {
                id: "premium-birthday",
                name: "Premium Birthday Box",
                price: 2999,
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
                description: "Luxury items with premium packaging",
                details: {
                    boxContents: [
                        "Handcrafted luxury gift box",
                        "Premium chocolate selection (Ferrero Rocher/Lindt)",
                        "Personalized birthday card",
                        "Scented candle",
                        "Custom name keychain",
                        "Birthday themed decoratives"
                    ],
                    dimensions: "12\" x 10\" x 6\"",
                    weight: "1.2 kg",
                    deliveryTime: "2-3 business days",
                    customization: {
                        available: true,
                        options: [
                            "Name engraving",
                            "Color theme selection",
                            "Message customization",
                            "Product selection"
                        ]
                    },
                    careInstructions: [
                        "Handle with care",
                        "Keep away from direct sunlight",
                        "Store in cool, dry place"
                    ],
                    targetAudience: "Adults, Couples, Luxury Gift Lovers",
                    occasions: [
                        "Birthday Celebrations",
                        "Milestone Birthdays",
                        "Special Occasions"
                    ]
                }
            },
            {
                id: "wooden-birthday",
                name: "Wooden Birthday Box",
                price: 3499,
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Elegant wooden box with personalized gifts",
                details: {
                    boxContents: [
                        "Handcrafted wooden gift box",
                        "Wooden photo frame",
                        "Personalized message plaque",
                        "Premium chocolates",
                        "Scented wood accessories",
                        "Birthday themed items"
                    ],
                    dimensions: "14\" x 12\" x 8\"",
                    weight: "1.8 kg",
                    deliveryTime: "3-4 business days",
                    customization: {
                        available: true,
                        options: [
                            "Wood type selection",
                            "Custom engraving",
                            "Photo customization",
                            "Product selection"
                        ]
                    },
                    careInstructions: [
                        "Keep away from moisture",
                        "Clean with dry cloth",
                        "Avoid direct sunlight"
                    ],
                    targetAudience: "Luxury Gift Lovers, Milestone Celebrations",
                    occasions: [
                        "Special Birthdays",
                        "Anniversary Celebrations",
                        "Corporate Gifts"
                    ]
                }
            },
            // More sub-products...
        ],
        features: [
            "Premium Quality Materials",
            "Customization Options",
            "Fast Delivery",
            "Luxury Packaging",
            "Satisfaction Guaranteed"
        ],
        faq: [
            {
                question: "Can I customize the contents of the box?",
                answer: "Yes, we offer full customization options for all our gift boxes."
            },
            {
                question: "What is the delivery timeframe?",
                answer: "Standard delivery takes 2-3 business days. Express delivery available."
            },
            {
                question: "Do you offer international shipping?",
                answer: "Yes, we ship worldwide with additional shipping charges."
            }
        ],
        additionalInfo: {
            giftWrapping: "Complimentary luxury gift wrapping",
            shipping: `Free shipping on orders above ${utils.formatPrice(CONFIG.FREE_DELIVERY_THRESHOLD)}`,
            bulk: "Special discounts for bulk orders",
            corporate: "Corporate gifting options available",
            returns: "Easy return policy within 7 days",
            payment: "Secure payment options available"
        }
    },
    // More products follow the same detailed structure...
];

// Theme Management
const themeManager = {
    themes: {
        light: {
            background: '#F8F3F1',
            text: '#4B3832',
            accent: '#722F37'
        },
        dark: {
            background: '#1B1F3B',
            text: '#E6CBA8',
            accent: '#722F37'
        }
    },
    
    currentTheme: 'dark',
    
    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    },
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        this.updateThemeColors(theme);
    },
    
    updateThemeColors(theme) {
        const colors = this.themes[theme];
        document.documentElement.style.setProperty('--background-color', colors.background);
        document.documentElement.style.setProperty('--text-color', colors.text);
        document.documentElement.style.setProperty('--accent-color', colors.accent);
    }
};
// Product Display and Interaction Manager
const productManager = {
    init() {
        this.loadProducts();
        this.initializeEventListeners();
        this.setupAnimations();
    },

    loadProducts() {
        const mainProducts = document.querySelector('.main-products');
        mainProducts.innerHTML = '';

        products.forEach(product => {
            const card = this.createProductCard(product);
            mainProducts.appendChild(card);
            this.animateProductCard(card);
        });
    },

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-overlay">
                    <span class="rating">
                        <i class="fas fa-star"></i> ${product.rating} (${product.reviews} reviews)
                    </span>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="delivery-time">
                        <i class="fas fa-truck"></i> ${product.details.deliveryTime}
                    </span>
                    <span class="box-size">
                        <i class="fas fa-box"></i> ${product.details.boxSize}
                    </span>
                </div>
                <div class="button-group">
                    <button class="primary-button" onclick="productManager.showSubProducts('${product.id}')">
                        View Options
                    </button>
                    <button class="secondary-button" onclick="productManager.toggleWishlist('${product.id}')">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        return card;
    },

    showSubProducts(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${product.name} Collections</h2>
                    <button class="close-button" onclick="productManager.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sub-products-container">
                    ${this.createSubProductsHTML(product.subProducts)}
                </div>
                <div class="modal-footer">
                    <div class="additional-info">
                        <div class="features">
                            <h4>Features</h4>
                            <ul>
                                ${product.features.map(feature => `
                                    <li><i class="fas fa-check"></i> ${feature}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="faq">
                            <h4>Frequently Asked Questions</h4>
                            ${this.createFAQAccordion(product.faq)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    },

    createSubProductsHTML(subProducts) {
        return subProducts.map(sub => `
            <div class="sub-product-card">
                <div class="sub-product-image">
                    <img src="${sub.image}" alt="${sub.name}" loading="lazy">
                </div>
                <div class="sub-product-info">
                    <h3>${sub.name}</h3>
                    <p class="price">${utils.formatPrice(sub.price)}</p>
                    <p class="description">${sub.description}</p>
                    <div class="details-accordion">
                        <div class="accordion-item">
                            <button class="accordion-button" onclick="productManager.toggleAccordion(this)">
                                Box Contents
                            </button>
                            <div class="accordion-content">
                                <ul>
                                    ${sub.details.boxContents.map(item => `
                                        <li>${item}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <button class="accordion-button" onclick="productManager.toggleAccordion(this)">
                                Customization Options
                            </button>
                            <div class="accordion-content">
                                <ul>
                                    ${sub.details.customization.options.map(option => `
                                        <li>${option}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="sub-product-actions">
                        <button class="primary-button" onclick="productManager.orderProduct('${sub.id}', '${sub.name}', ${sub.price})">
                            Order Now
                        </button>
                        <button class="secondary-button" onclick="productManager.customizeProduct('${sub.id}')">
                            Customize
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    createFAQAccordion(faq) {
        return `
            <div class="faq-accordion">
                ${faq.map((item, index) => `
                    <div class="accordion-item">
                        <button class="accordion-button" onclick="productManager.toggleAccordion(this)">
                            ${item.question}
                        </button>
                        <div class="accordion-content">
                            <p>${item.answer}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    orderProduct(productId, productName, price) {
        const message = `Hi, I'm interested in ordering the ${productName} (${utils.formatPrice(price)}) from Beyond Boxes. Could you please provide more details?`;
        window.open(utils.createWhatsAppLink(message));
    },

    customizeProduct(productId) {
        const product = this.findSubProduct(productId);
        this.showCustomizationForm(product);
    },

    showCustomizationForm(product) {
        const modal = document.createElement('div');
        modal.className = 'modal customization-modal';
        // Customization form HTML...
        document.body.appendChild(modal);
    },

    toggleAccordion(button) {
        const content = button.nextElementSibling;
        const isOpen = button.classList.contains('active');
        
        // Close all other accordion items
        const allButtons = document.querySelectorAll('.accordion-button');
        allButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.nextElementSibling.style.maxHeight = null;
        });

        if (!isOpen) {
            button.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    },

    closeModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    },

    animateProductCard(card) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(card);
    },

    setupAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(element => observer.observe(element));
    },

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }

        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.querySelector('.mobile-menu').classList.toggle('active');
            });
        }

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Handle clicks outside modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    productManager.init();
});
// Search System
const searchManager = {
    init() {
        this.searchInput = document.querySelector('.search-input');
        this.searchResults = document.querySelector('.search-results');
        this.setupSearchListeners();
    },

    setupSearchListeners() {
        this.searchInput.addEventListener('input', utils.debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.closeSearch();
            }
        });
    },

    handleSearch(query) {
        if (query.length < 2) {
            this.clearResults();
            return;
        }

        const results = this.searchProducts(query);
        this.displayResults(results);
    },

    searchProducts(query) {
        query = query.toLowerCase();
        return products.flatMap(product => {
            const mainMatch = product.name.toLowerCase().includes(query) || 
                            product.description.toLowerCase().includes(query);

            const subMatches = product.subProducts.filter(sub =>
                sub.name.toLowerCase().includes(query) ||
                sub.description.toLowerCase().includes(query)
            );

            if (mainMatch) {
                return [{
                    type: 'main',
                    item: product
                }];
            }

            return subMatches.map(sub => ({
                type: 'sub',
                item: sub,
                parent: product
            }));
        });
    },

    displayResults(results) {
        if (!results.length) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <p>No products found</p>
                    <p>Try different keywords or browse our categories</p>
                </div>
            `;
            return;
        }

        this.searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="searchManager.handleResultClick('${result.type}', '${result.type === 'main' ? result.item.id : result.item.id}')">
                <img src="${result.item.image}" alt="${result.item.name}">
                <div class="result-info">
                    <h4>${result.item.name}</h4>
                    <p>${result.item.description}</p>
                    ${result.type === 'sub' ? `<span class="parent-product">in ${result.parent.name}</span>` : ''}
                </div>
            </div>
        `).join('');
    },

    handleResultClick(type, id) {
        if (type === 'main') {
            productManager.showSubProducts(id);
        } else {
            const product = this.findSubProduct(id);
            productManager.showSubProductDetails(product);
        }
        this.closeSearch();
    },

    clearResults() {
        this.searchResults.innerHTML = '';
    },

    closeSearch() {
        this.searchResults.innerHTML = '';
        this.searchInput.value = '';
    }
};

// Cart Management System
const cartManager = {
    cart: [],
    
    init() {
        this.loadCart();
        this.updateCartDisplay();
    },

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    },

    addToCart(productId, quantity = 1) {
        const product = this.findProduct(productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Product added to cart');
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Product removed from cart');
    },

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        const cartTotal = document.querySelector('.cart-total');
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = utils.formatPrice(total);
    },

    showCart() {
        const modal = document.createElement('div');
        modal.className = 'modal cart-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Your Cart</h2>
                    <button onclick="cartManager.closeCart()">×</button>
                </div>
                <div class="cart-items">
                    ${this.cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h3>${item.name}</h3>
                                <p class="price">${utils.formatPrice(item.price)}</p>
                                <div class="quantity-controls">
                                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <button class="remove-item" onclick="cartManager.removeFromCart('${item.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span>${utils.formatPrice(this.getTotal())}</span>
                    </div>
                    <button class="checkout-button" onclick="cartManager.checkout()">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    closeCart() {
        const modal = document.querySelector('.cart-modal');
        modal.remove();
    },

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    checkout() {
        const items = this.cart.map(item => 
            `${item.quantity}x ${item.name} (${utils.formatPrice(item.price)})`
        ).join('\n');
        
        const total = utils.formatPrice(this.getTotal());
        const message = `Hi, I'd like to order the following items:\n\n${items}\n\nTotal: ${total}`;
        
        window.open(utils.createWhatsAppLink(message));
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
};

// Initialize all managers
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    productManager.init();
    searchManager.init();
    cartManager.init();
});

// Add event listeners for global interactions
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            if (modal.classList.contains('cart-modal')) {
                cartManager.closeCart();
            } else {
                productManager.closeModal();
            }
        }
    }
});

// Handle loading states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
// Form Validation and Handler
const formManager = {
    init() {
        this.setupCustomizationForm();
        this.setupContactForm();
    },

    setupCustomizationForm() {
        const form = document.getElementById('customization-form');
        if (form) {
            form.addEventListener('submit', this.handleCustomizationSubmit.bind(this));
        }
    },

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', this.handleContactSubmit.bind(this));
        }
    },

    validateForm(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!utils.validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.phone || !/^[\d\s-+]{10,}$/.test(formData.phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        return errors;
    },

    showCustomizationModal(productId) {
        const modal = document.createElement('div');
        modal.className = 'modal customization-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Customize Your Gift Box</h2>
                    <button class="close-button" onclick="formManager.closeModal()">×</button>
                </div>
                <form id="customization-form" class="custom-form">
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="occasion">Occasion</label>
                        <select id="occasion" name="occasion" required>
                            <option value="">Select an occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="preferences">Special Preferences</label>
                        <textarea id="preferences" name="preferences" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="budget">Budget Range</label>
                        <select id="budget" name="budget" required>
                            <option value="">Select budget range</option>
                            <option value="1000-2000">₹1,000 - ₹2,000</option>
                            <option value="2000-3000">₹2,000 - ₹3,000</option>
                            <option value="3000-5000">₹3,000 - ₹5,000</option>
                            <option value="5000+">₹5,000+</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="delivery-date">Preferred Delivery Date</label>
                        <input type="date" id="delivery-date" name="deliveryDate" required>
                    </div>
                    <button type="submit" class="submit-button">
                        Submit Customization Request
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    },

    handleCustomizationSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        const errors = this.validateForm(data);
        if (errors.length > 0) {
            this.showErrors(errors);
            return;
        }

        // Construct WhatsApp message
        const message = `
New Customization Request:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Occasion: ${data.occasion}
Budget: ${data.budget}
Delivery Date: ${data.deliveryDate}
Preferences: ${data.preferences}
        `.trim();

        window.open(utils.createWhatsAppLink(message));
        this.closeModal();
        this.showSuccessMessage('Your customization request has been sent!');
    },

    showErrors(errors) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-messages';
        errorDiv.innerHTML = `
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        const form = document.querySelector('.custom-form');
        form.insertBefore(errorDiv, form.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    },

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    closeModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
};

// Animation Manager
const animationManager = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    },

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => observer.observe(element));
    },

    setupHoverEffects() {
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
    },

    addLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-content">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        document.body.appendChild(spinner);
    },

    removeLoadingSpinner() {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.classList.add('fade-out');
            setTimeout(() => spinner.remove(), 300);
        }
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    productManager.init();
    searchManager.init();
    cartManager.init();
    formManager.init();
    animationManager.init();
    
    // Remove loading spinner once everything is loaded
    window.addEventListener('load', () => {
        animationManager.removeLoadingSpinner();
        document.body.classList.add('loaded');
    });
});


