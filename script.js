// Configuration
const CONFIG = {
    STORE: {
        NAME: 'Beyond Boxes',
        PHONE: '917406839266',
        EMAIL: 'beyondboxes1@gmail.com',
        INSTAGRAM: '@beyondboxess',
        CURRENCY: '₹',
        FREE_DELIVERY_THRESHOLD: 1999,
        DEFAULT_DELIVERY_TIME: '2-3 business days'
    },
    
    URLS: {
        IMAGES: {
            LOGO: 'images/logo.png',
            PLACEHOLDER: 'https://via.placeholder.com/400x300'
        }
    }
};

// Product Categories
const CATEGORIES = {
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    WEDDING: 'wedding',
    CORPORATE: 'corporate',
    SEASONAL: 'seasonal',
    CUSTOM: 'custom',
    LUXURY: 'luxury'
};

// Product Data
const products = [
    {
        id: CATEGORIES.BIRTHDAY,
        name: 'Birthday Special',
        image: 'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?auto=format&w=800&h=600&fit=crop',
        description: 'Make birthdays extraordinary with our specially curated gift boxes',
        category: 'celebration',
        rating: 4.8,
        reviews: 245,
        details: {
            deliveryTime: CONFIG.STORE.DEFAULT_DELIVERY_TIME,
            boxSize: '12" x 10" x 6"',
            customizable: true,
            freeDelivery: true
        },
        subProducts: [
            {
                id: 'premium-birthday',
                name: 'Premium Birthday Box',
                price: 2999,
                image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&w=400&h=300&fit=crop',
                description: 'Luxury items with premium packaging',
                contents: [
                    'Premium chocolates selection',
                    'Personalized birthday card',
                    'LED fairy lights',
                    'Scented candle',
                    'Birthday decorations'
                ],
                specifications: {
                    boxSize: '12" x 10" x 6"',
                    weight: '1.2 kg',
                    deliveryTime: '2-3 business days',
                    customizable: true
                }
            },
            {
                id: 'wooden-birthday',
                name: 'Wooden Birthday Box',
                price: 3499,
                image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
                description: 'Elegant wooden gift box with premium items',
                contents: [
                    'Handcrafted wooden box',
                    'Personalized photo frame',
                    'Premium treats',
                    'Custom message plaque',
                    'Luxury accessories'
                ],
                specifications: {
                    boxSize: '14" x 12" x 8"',
                    weight: '1.5 kg',
                    deliveryTime: '3-4 business days',
                    customizable: true
                }
            },
            {
                id: 'kids-birthday',
                name: 'Kids Birthday Box',
                price: 1999,
                image: 'https://images.unsplash.com/photo-1531747118685-ca8a6f4514c5?auto=format&w=400&h=300&fit=crop',
                description: 'Fun-filled box for children',
                contents: [
                    'Age-appropriate toys',
                    'Party accessories',
                    'Birthday crown',
                    'Sweet treats',
                    'Activity kit'
                ],
                specifications: {
                    boxSize: '10" x 8" x 6"',
                    weight: '0.8 kg',
                    deliveryTime: '2-3 business days',
                    customizable: true
                }
            }
        ]
    },
    {
        id: CATEGORIES.ANNIVERSARY,
        name: 'Anniversary Special',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&w=800&h=600&fit=crop',
        description: 'Celebrate love with our romantic anniversary collections',
        category: 'celebration',
        rating: 4.9,
        reviews: 189,
        details: {
            deliveryTime: CONFIG.STORE.DEFAULT_DELIVERY_TIME,
            boxSize: '14" x 12" x 8"',
            customizable: true,
            freeDelivery: true
        },
        subProducts: [
            {
                id: 'romantic-luxury',
                name: 'Romantic Luxury Box',
                price: 4999,
                image: 'https://images.unsplash.com/photo-1494919997560-caff2f1cff75?auto=format&w=400&h=300&fit=crop',
                description: 'Premium romantic celebration box',
                contents: [
                    'Premium chocolates & champagne',
                    'Rose gold photo frame',
                    'Scented candles set',
                    'Couple accessories',
                    'Personalized love message'
                ],
                specifications: {
                    boxSize: '14" x 12" x 8"',
                    weight: '2.0 kg',
                    deliveryTime: '2-3 business days',
                    customizable: true
                }
            }
        ]
    }
];

// Utility Functions
const utils = {
    formatPrice(price) {
        return `${CONFIG.STORE.CURRENCY}${price.toLocaleString('en-IN')}`;
    },

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    createWhatsAppLink(message) {
        return `https://wa.me/${CONFIG.STORE.PHONE}?text=${encodeURIComponent(message)}`;
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

    getImage(imagePath) {
        return imagePath || CONFIG.URLS.IMAGES.PLACEHOLDER;
    }
};
// Core System Managers

// Cart Management System
const cartManager = {
    items: [],
    
    init() {
        this.loadCart();
        this.updateCartDisplay();
        this.setupEventListeners();
    },

    loadCart() {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.items = [];
        }
    },

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
            this.updateCartDisplay();
        } catch (error) {
            console.error('Error saving cart:', error);
            notificationSystem.error('Could not save cart changes');
        }
    },

    addItem(productId, subProductId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        const subProduct = product.subProducts.find(sub => sub.id === subProductId);
        
        if (!product || !subProduct) {
            notificationSystem.error('Product not found');
            return;
        }

        const existingItem = this.items.find(item => 
            item.productId === productId && item.subProductId === subProductId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                productId,
                subProductId,
                name: subProduct.name,
                price: subProduct.price,
                image: subProduct.image,
                quantity
            });
        }

        this.saveCart();
        notificationSystem.success(`Added ${subProduct.name} to cart`);
    },

    removeItem(productId, subProductId) {
        this.items = this.items.filter(item => 
            !(item.productId === productId && item.subProductId === subProductId)
        );
        this.saveCart();
        notificationSystem.info('Item removed from cart');
    },

    updateQuantity(productId, subProductId, quantity) {
        const item = this.items.find(item => 
            item.productId === productId && item.subProductId === subProductId
        );
        
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId, subProductId);
            } else {
                this.saveCart();
            }
        }
    },

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    },

    showCart() {
        const content = this.renderCart();
        modalManager.show('cart', content);
    },

    renderCart() {
        if (this.items.length === 0) {
            return `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="continue-shopping" onclick="modalManager.close()">
                        Continue Shopping
                    </button>
                </div>
            `;
        }

        return `
            <div class="cart-items">
                ${this.items.map(item => `
                    <div class="cart-item">
                        <img src="${utils.getImage(item.image)}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p class="price">${utils.formatPrice(item.price)}</p>
                            <div class="quantity-controls">
                                <button onclick="cartManager.updateQuantity('${item.productId}', '${item.subProductId}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="cartManager.updateQuantity('${item.productId}', '${item.subProductId}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <button class="remove-item" onclick="cartManager.removeItem('${item.productId}', '${item.subProductId}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span class="total-amount">${utils.formatPrice(this.getTotal())}</span>
                </div>
                <div class="cart-actions">
                    <button class="continue-shopping" onclick="modalManager.close()">
                        Continue Shopping
                    </button>
                    <button class="checkout-button" onclick="cartManager.checkout()">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
    },

    checkout() {
        const items = this.items.map(item => 
            `${item.quantity}x ${item.name} (${utils.formatPrice(item.price)})`
        ).join('\n');
        
        const total = utils.formatPrice(this.getTotal());
        const message = `New Order from Beyond Boxes:\n\nItems:\n${items}\n\nTotal: ${total}`;
        
        window.open(utils.createWhatsAppLink(message));
        this.clearCart();
    },

    clearCart() {
        this.items = [];
        this.saveCart();
        modalManager.close();
        notificationSystem.success('Thank you for your order!');
    },

    setupEventListeners() {
        document.querySelector('.cart-icon')?.addEventListener('click', () => {
            this.showCart();
        });
    }
};

// Modal Management System
const modalManager = {
    activeModals: [],

    show(type, content) {
        const modal = document.createElement('div');
        modal.className = `modal ${type}-modal`;
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.getModalTitle(type)}</h3>
                    <button class="close-button" onclick="modalManager.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.activeModals.push(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => modal.classList.add('active'), 10);
        this.setupModalEvents(modal);
    },

    close() {
        const modal = this.activeModals.pop();
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                if (this.activeModals.length === 0) {
                    document.body.style.overflow = '';
                }
            }, 300);
        }
    },

    setupModalEvents(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    },

    getModalTitle(type) {
        const titles = {
            cart: 'Shopping Cart',
            quickView: 'Quick View',
            customization: 'Customize Your Box',
            review: 'Product Reviews'
        };
        return titles[type] || 'Modal';
    }
};

// Notification System
const notificationSystem = {
    show(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getIcon(type)}"></i>
                <p>${message}</p>
            </div>
            <div class="notification-progress"></div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);

        const progress = notification.querySelector('.notification-progress');
        progress.style.transition = `width ${duration}ms linear`;
        progress.style.width = '0%';

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || 'fa-bell';
    },

    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); },
    warning(message) { this.show(message, 'warning'); },
    info(message) { this.show(message, 'info'); }
};
// Product Display System
const productManager = {
    init() {
        this.productsGrid = document.querySelector('.products-grid');
        this.loadProducts();
        this.setupEventListeners();
    },

    loadProducts() {
        if (!this.productsGrid) return;
        
        this.productsGrid.innerHTML = '';
        products.forEach(product => {
            const card = this.createProductCard(product);
            this.productsGrid.appendChild(card);
        });
    },

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img 
                    src="${product.image}" 
                    alt="${product.name}" 
                    class="product-image"
                    loading="lazy"
                >
                <div class="product-overlay">
                    <div class="product-badges">
                        ${product.details.freeDelivery ? 
                            '<span class="badge free-delivery">Free Delivery</span>' : ''}
                        ${product.details.customizable ? 
                            '<span class="badge customizable">Customizable</span>' : ''}
                    </div>
                    <button class="quick-view-btn" onclick="productManager.quickView('${product.id}')">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${this.generateRatingStars(product.rating)}
                    <span class="review-count">(${product.reviews} reviews)</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span><i class="fas fa-truck"></i> ${product.details.deliveryTime}</span>
                    <span><i class="fas fa-box"></i> ${product.details.boxSize}</span>
                </div>
                <div class="product-actions">
                    <button class="view-options-btn" onclick="productManager.showSubProducts('${product.id}')">
                        View Options
                    </button>
                    <button class="wishlist-btn" onclick="wishlistManager.toggleWishlist('${product.id}')">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        return card;
    },

    generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return `
            ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
            ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
            ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
        `;
    },

    quickView(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const content = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-info">
                    <h3>${product.name}</h3>
                    <div class="rating">
                        ${this.generateRatingStars(product.rating)}
                        <span>${product.reviews} reviews</span>
                    </div>
                    <p class="description">${product.description}</p>
                    <div class="details">
                        <div class="detail-item">
                            <i class="fas fa-truck"></i>
                            <span>Delivery: ${product.details.deliveryTime}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-box"></i>
                            <span>Box Size: ${product.details.boxSize}</span>
                        </div>
                        ${product.details.customizable ? `
                            <div class="detail-item">
                                <i class="fas fa-paint-brush"></i>
                                <span>Customizable</span>
                            </div>
                        ` : ''}
                    </div>
                    <button class="primary-btn" onclick="productManager.showSubProducts('${product.id}')">
                        View Options
                    </button>
                </div>
            </div>
        `;

        modalManager.show('quickView', content);
    },

    showSubProducts(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const content = `
            <div class="sub-products-container">
                <div class="sub-products-grid">
                    ${product.subProducts.map(sub => `
                        <div class="sub-product-card">
                            <div class="sub-product-image">
                                <img src="${sub.image}" alt="${sub.name}">
                            </div>
                            <div class="sub-product-info">
                                <h4>${sub.name}</h4>
                                <p class="price">${utils.formatPrice(sub.price)}</p>
                                <p class="description">${sub.description}</p>
                                <div class="contents">
                                    <h5>Box Contents:</h5>
                                    <ul>
                                        ${sub.contents.map(item => `
                                            <li><i class="fas fa-check"></i> ${item}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div class="specifications">
                                    <div class="spec-item">
                                        <i class="fas fa-box"></i>
                                        <span>Size: ${sub.specifications.boxSize}</span>
                                    </div>
                                    <div class="spec-item">
                                        <i class="fas fa-weight-hanging"></i>
                                        <span>Weight: ${sub.specifications.weight}</span>
                                    </div>
                                    <div class="spec-item">
                                        <i class="fas fa-truck"></i>
                                        <span>Delivery: ${sub.specifications.deliveryTime}</span>
                                    </div>
                                </div>
                                <div class="sub-product-actions">
                                    <button class="order-btn" onclick="cartManager.addItem('${product.id}', '${sub.id}')">
                                        Add to Cart
                                    </button>
                                    <button class="customize-btn" onclick="customizationManager.customize('${product.id}', '${sub.id}')">
                                        Customize
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modalManager.show('subProducts', content);
    },

    setupEventListeners() {
        // Product card hover effects
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                card.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                card.classList.remove('hover');
            }
        });

        // Image lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};
// Customization System
const customizationManager = {
    currentCustomization: null,

    customize(productId, subProductId) {
        const product = products.find(p => p.id === productId);
        const subProduct = product.subProducts.find(sub => sub.id === subProductId);
        
        this.currentCustomization = {
            productId,
            subProductId,
            boxSize: null,
            boxColor: null,
            ribbon: null,
            message: '',
            deliveryDate: null,
            deliveryTime: null
        };

        const content = `
            <div class="customizer-container">
                <div class="customizer-steps">
                    <div class="step active" data-step="1">
                        <span>1</span>
                        <p>Box Design</p>
                    </div>
                    <div class="step" data-step="2">
                        <span>2</span>
                        <p>Message</p>
                    </div>
                    <div class="step" data-step="3">
                        <span>3</span>
                        <p>Delivery</p>
                    </div>
                </div>
                
                <div class="customizer-content">
                    ${this.renderStep1(subProduct)}
                </div>

                <div class="customizer-actions">
                    <button class="back-btn" disabled onclick="customizationManager.previousStep()">
                        Back
                    </button>
                    <button class="next-btn" onclick="customizationManager.nextStep()">
                        Next
                    </button>
                </div>
            </div>
        `;

        modalManager.show('customization', content);
    },

    renderStep1(subProduct) {
        return `
            <div class="customization-step" data-step="1">
                <div class="box-preview">
                    <div class="preview-container">
                        <div class="box-3d" id="boxPreview">
                            <!-- 3D box preview will be updated via JS -->
                        </div>
                    </div>
                </div>
                
                <div class="options-container">
                    <div class="option-group">
                        <h4>Box Size</h4>
                        <div class="options">
                            <button class="option-btn" data-option="boxSize" data-value="small">
                                Small
                            </button>
                            <button class="option-btn" data-option="boxSize" data-value="medium">
                                Medium
                            </button>
                            <button class="option-btn" data-option="boxSize" data-value="large">
                                Large
                            </button>
                        </div>
                    </div>

                    <div class="option-group">
                        <h4>Box Color</h4>
                        <div class="color-options">
                            <button class="color-btn" data-option="boxColor" data-value="classic-black" 
                                    style="background-color: #000000;">
                            </button>
                            <button class="color-btn" data-option="boxColor" data-value="royal-blue" 
                                    style="background-color: #1B4B9F;">
                            </button>
                            <button class="color-btn" data-option="boxColor" data-value="rose-gold" 
                                    style="background-color: #B76E79;">
                            </button>
                            <button class="color-btn" data-option="boxColor" data-value="pearl-white" 
                                    style="background-color: #FFFFFF;">
                            </button>
                        </div>
                    </div>

                    <div class="option-group">
                        <h4>Ribbon Style</h4>
                        <div class="ribbon-options">
                            <button class="ribbon-btn" data-option="ribbon" data-value="satin">
                                Satin
                            </button>
                            <button class="ribbon-btn" data-option="ribbon" data-value="velvet">
                                Velvet
                            </button>
                            <button class="ribbon-btn" data-option="ribbon" data-value="gold">
                                Gold Trim
                            </button>
                            <button class="ribbon-btn" data-option="ribbon" data-value="silver">
                                Silver Trim
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderStep2() {
        return `
            <div class="customization-step" data-step="2">
                <div class="message-container">
                    <div class="message-preview">
                        <div class="card-preview" id="messagePreview">
                            <!-- Message preview will be updated via JS -->
                        </div>
                    </div>
                    
                    <div class="message-input">
                        <h4>Your Message</h4>
                        <textarea 
                            placeholder="Enter your personal message..."
                            maxlength="200"
                            onkeyup="customizationManager.updateMessage(this.value)"
                        >${this.currentCustomization.message}</textarea>
                        <div class="character-count">
                            <span id="currentCount">0</span>/200 characters
                        </div>
                    </div>

                    <div class="card-styles">
                        <h4>Card Style</h4>
                        <div class="style-options">
                            <!-- Card style options -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderStep3() {
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 2); // Minimum 2 days from now
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30); // Maximum 30 days from now

        return `
            <div class="customization-step" data-step="3">
                <div class="delivery-container">
                    <div class="date-selection">
                        <h4>Preferred Delivery Date</h4>
                        <input 
                            type="date" 
                            min="${minDate.toISOString().split('T')[0]}"
                            max="${maxDate.toISOString().split('T')[0]}"
                            onchange="customizationManager.updateDeliveryDate(this.value)"
                        >
                    </div>

                    <div class="time-selection">
                        <h4>Preferred Time Slot</h4>
                        <select onchange="customizationManager.updateDeliveryTime(this.value)">
                            <option value="">Select a time slot</option>
                            <option value="morning">Morning (9 AM - 12 PM)</option>
                            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                            <option value="evening">Evening (4 PM - 7 PM)</option>
                        </select>
                    </div>

                    <div class="delivery-summary">
                        <h4>Order Summary</h4>
                        <!-- Summary will be populated via JS -->
                    </div>
                </div>
            </div>
        `;
    },

    updatePreview() {
        const preview = document.getElementById('boxPreview');
        if (preview) {
            // Update 3D box preview based on current customization
            this.update3DBox(preview);
        }
    },

    update3DBox(element) {
        const { boxColor, ribbon } = this.currentCustomization;
        element.style.backgroundColor = this.getColorValue(boxColor);
        // Add more 3D box update logic
    },

    updateMessage(message) {
        this.currentCustomization.message = message;
        const preview = document.getElementById('messagePreview');
        if (preview) {
            preview.innerHTML = message || 'Your message will appear here';
        }
        
        const counter = document.getElementById('currentCount');
        if (counter) {
            counter.textContent = message.length;
        }
    },

    nextStep() {
        const currentStep = document.querySelector('.step.active');
        const nextStep = currentStep.nextElementSibling;
        
        if (nextStep && this.validateCurrentStep()) {
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
            
            const stepNumber = nextStep.dataset.step;
            const content = this[`renderStep${stepNumber}`]();
            document.querySelector('.customizer-content').innerHTML = content;
            
            document.querySelector('.back-btn').disabled = false;
            document.querySelector('.next-btn').textContent = 
                stepNumber === '3' ? 'Complete' : 'Next';
        } else if (!nextStep) {
            this.completeCustomization();
        }
    },

    previousStep() {
        const currentStep = document.querySelector('.step.active');
        const prevStep = currentStep.previousElementSibling;
        
        if (prevStep) {
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            
            const stepNumber = prevStep.dataset.step;
            const content = this[`renderStep${stepNumber}`]();
            document.querySelector('.customizer-content').innerHTML = content;
            
            document.querySelector('.back-btn').disabled = stepNumber === '1';
            document.querySelector('.next-btn').textContent = 'Next';
        }
    },

    validateCurrentStep() {
        const currentStep = document.querySelector('.step.active');
        const stepNumber = currentStep.dataset.step;
        
        switch (stepNumber) {
            case '1':
                if (!this.currentCustomization.boxSize || 
                    !this.currentCustomization.boxColor || 
                    !this.currentCustomization.ribbon) {
                    notificationSystem.warning('Please complete all selections');
                    return false;
                }
                break;
                
            case '2':
                if (!this.currentCustomization.message.trim()) {
                    notificationSystem.warning('Please enter a message');
                    return false;
                }
                break;
                
            case '3':
                if (!this.currentCustomization.deliveryDate || 
                    !this.currentCustomization.deliveryTime) {
                    notificationSystem.warning('Please select delivery preferences');
                    return false;
                }
                break;
        }
        
        return true;
    },

    completeCustomization() {
        const message = this.formatOrderMessage();
        window.open(utils.createWhatsAppLink(message));
        modalManager.close();
        notificationSystem.success('Customization complete! Redirecting to WhatsApp...');
    },

    formatOrderMessage() {
        const { productId, subProductId } = this.currentCustomization;
        const product = products.find(p => p.id === productId);
        const subProduct = product.subProducts.find(sub => sub.id === subProductId);

        return `
Custom Box Order Request:

Product: ${subProduct.name}
Base Price: ${utils.formatPrice(subProduct.price)}

Customization Details:
- Box Size: ${this.currentCustomization.boxSize}
- Box Color: ${this.currentCustomization.boxColor}
- Ribbon Style: ${this.currentCustomization.ribbon}

Personal Message:
"${this.currentCustomization.message}"

Delivery Preferences:
Date: ${this.currentCustomization.deliveryDate}
Time Slot: ${this.currentCustomization.deliveryTime}

Please provide payment details and confirm availability.
        `.trim();
    }
};

// Animation System
const animationManager = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
    },

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    },

    setupHoverAnimations() {
        document.querySelectorAll('.hover-animate').forEach(element => {
            element.addEventListener('mouseenter', () => {
                const animation = element.dataset.hoverAnimation || 'pulse';
                element.classList.add(animation);
            });

            element.addEventListener('mouseleave', () => {
                const animation = element.dataset.hoverAnimation || 'pulse';
                element.classList.remove(animation);
            });
        });
    }
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    loadingSystem.show();

    // Initialize all systems
    Promise.all([
        productManager.init(),
        cartManager.init(),
        wishlistManager.init(),
        animationManager.init()
    ]).then(() => {
        loadingSystem.hide();
        notificationSystem.success('Welcome to Beyond Boxes!');
    }).catch(error => {
        console.error('Initialization error:', error);
        loadingSystem.hide();
        notificationSystem.error('Something went wrong. Please refresh the page.');
    });
});

