// Configuration and Constants
const CONFIG = {
    WHATSAPP_NUMBER: '917406839266',
    EMAIL: 'beyondboxes1@gmail.com',
    INSTAGRAM: '@beyondboxess',
    FREE_DELIVERY_THRESHOLD: 1999,
    CURRENCY: '₹',
    DEFAULT_DELIVERY_TIME: '2-3 business days'
};

// Complete Product Data
const products = [
    {
        id: 'birthday',
        name: 'Birthday Special',
        image: 'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?auto=format&w=800&h=600&fit=crop',
        description: 'Make birthdays extraordinary with our specially curated gift boxes',
        category: 'celebration',
        rating: 4.8,
        reviews: 245,
        details: {
            deliveryTime: CONFIG.DEFAULT_DELIVERY_TIME,
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
                description: 'Luxury birthday celebration box',
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
            },
            {
                id: 'surprise-birthday',
                name: 'Surprise Birthday Box',
                price: 2499,
                image: 'https://images.unsplash.com/photo-1546462569-0f9410dc4e92?auto=format&w=400&h=300&fit=crop',
                description: 'Mystery box full of surprises',
                contents: [
                    'Mystery gifts',
                    'Party essentials',
                    'Premium snacks',
                    'Birthday accessories',
                    'Special message'
                ],
                specifications: {
                    boxSize: '12" x 10" x 6"',
                    weight: '1.0 kg',
                    deliveryTime: '2-3 business days',
                    customizable: false
                }
            },
            {
                id: 'custom-birthday',
                name: 'Custom Birthday Box',
                price: 3999,
                image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&w=400&h=300&fit=crop',
                description: 'Personalized box based on preferences',
                contents: [
                    'Customized items',
                    'Theme-based décor',
                    'Premium packaging',
                    'Personal message',
                    'Luxury treats'
                ],
                specifications: {
                    boxSize: 'Customizable',
                    weight: 'Varies',
                    deliveryTime: '4-5 business days',
                    customizable: true
                }
            }
        ]
    },
    // Continue with other product categories...
];

// Utility Functions
const utils = {
    formatPrice(price) {
        return `${CONFIG.CURRENCY}${price.toLocaleString('en-IN')}`;
    },

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    }
};

// Product Display Functions
const productManager = {
    init() {
        this.productsGrid = document.querySelector('.products-grid');
        this.loadProducts();
        this.setupEventListeners();
    },

    loadProducts() {
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
                    <div class="product-quick-view">
                        <button onclick="productManager.showQuickView('${product.id}')">
                            Quick View
                        </button>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="rating">
                        <i class="fas fa-star"></i> ${product.rating}
                    </span>
                    <span class="reviews">
                        (${product.reviews} reviews)
                    </span>
                </div>
                <div class="button-group">
                    <button class="order-button" onclick="productManager.orderProduct('${product.id}')">
                        <i class="fas fa-shopping-cart"></i> Order Now
                    </button>
                    <button class="view-more" onclick="productManager.showSubProducts('${product.id}')">
                        <i class="fas fa-eye"></i> View Options
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
        // ... continue with modal content
    }
    // ... continue with more functions
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    productManager.init();
    // ... other initializations
});
// Continue from previous script.js...

// Complete the remaining product categories
const products = [
    // Previous Birthday category...
    {
        id: 'anniversary',
        name: 'Anniversary Special',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&w=800&h=600&fit=crop',
        description: 'Celebrate love with our romantic anniversary collections',
        category: 'celebration',
        rating: 4.9,
        reviews: 189,
        details: {
            deliveryTime: CONFIG.DEFAULT_DELIVERY_TIME,
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
            },
            // Add more anniversary sub-products...
        ]
    },
    // Add remaining categories...
];

// Enhanced Modal Display Functions
const modalManager = {
    show(content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = content;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.close();
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    close() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    },

    showQuickView(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const content = `
            <div class="modal-content quick-view">
                <div class="modal-header">
                    <h2>${product.name}</h2>
                    <button class="close-button" onclick="modalManager.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="quick-view-info">
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
                            <div class="detail-item">
                                <i class="fas fa-star"></i>
                                <span>Rating: ${product.rating} (${product.reviews} reviews)</span>
                            </div>
                        </div>
                        <div class="quick-view-actions">
                            <button class="view-more" onclick="productManager.showSubProducts('${product.id}')">
                                View Options
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.show(content);
    }
};

// Enhanced Product Manager
const productManager = {
    // ... previous product manager code ...

    showSubProducts(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const content = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${product.name} Collections</h2>
                    <button class="close-button" onclick="modalManager.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sub-products">
                    ${product.subProducts.map(sub => `
                        <div class="sub-product">
                            <div class="sub-product-image">
                                <img src="${sub.image}" alt="${sub.name}" loading="lazy">
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
                                    <h5>Specifications:</h5>
                                    <ul>
                                        <li>Box Size: ${sub.specifications.boxSize}</li>
                                        <li>Weight: ${sub.specifications.weight}</li>
                                        <li>Delivery: ${sub.specifications.deliveryTime}</li>
                                        ${sub.specifications.customizable ? 
                                            '<li>Customization Available</li>' : ''}
                                    </ul>
                                </div>
                                <button class="order-button" 
                                    onclick="orderManager.orderSubProduct('${product.id}', '${sub.id}')">
                                    <i class="fas fa-shopping-cart"></i> Order Now
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modalManager.show(content);
    }
};

// Order Management System
const orderManager = {
    orderSubProduct(productId, subProductId) {
        const product = products.find(p => p.id === productId);
        const subProduct = product.subProducts.find(sub => sub.id === subProductId);
        
        const message = `Hi, I'm interested in ordering the ${subProduct.name} (${utils.formatPrice(subProduct.price)}) from the ${product.name} collection.\n\nCould you please provide:\n1. Delivery timeline\n2. Customization options\n3. Payment details`;
        
        window.open(utils.createWhatsAppLink(message));
        
        // Show success notification
        this.showNotification(`Redirecting to WhatsApp for ${subProduct.name} order`);
    },

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    productManager.init();
    
    // Handle scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
// Adding more product categories...
{
    id: 'wedding',
    name: 'Wedding Special',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&w=800&h=600&fit=crop',
    description: 'Elegant gift solutions for the perfect wedding celebration',
    category: 'celebration',
    rating: 4.9,
    reviews: 156,
    details: {
        deliveryTime: CONFIG.DEFAULT_DELIVERY_TIME,
        boxSize: '16" x 14" x 10"',
        customizable: true,
        freeDelivery: true
    },
    subProducts: [
        {
            id: 'bridal-box',
            name: 'Bridal Luxury Box',
            price: 5999,
            image: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903?auto=format&w=400&h=300&fit=crop',
            description: 'Premium bridal gift collection',
            contents: [
                'Luxury beauty products',
                'Bridal accessories',
                'Custom jewelry box',
                'Personalized message book',
                'Premium packaging'
            ],
            specifications: {
                boxSize: '16" x 14" x 10"',
                weight: '2.5 kg',
                deliveryTime: '3-4 business days',
                customizable: true
            }
        },
        {
            id: 'groom-box',
            name: 'Groom Special Box',
            price: 5499,
            image: 'https://images.unsplash.com/photo-1594121556340-6be88369e590?auto=format&w=400&h=300&fit=crop',
            description: 'Sophisticated collection for the groom',
            contents: [
                'Premium grooming kit',
                'Luxury watch box',
                'Custom accessories',
                'Wedding day essentials',
                'Elite packaging'
            ],
            specifications: {
                boxSize: '14" x 12" x 8"',
                weight: '2.0 kg',
                deliveryTime: '3-4 business days',
                customizable: true
            }
        }
        // Add more wedding sub-products...
    ]
},
{
    id: 'corporate',
    name: 'Corporate Gifts',
    image: 'https://images.unsplash.com/photo-1579487785973-74d2ca7d74a2?auto=format&w=800&h=600&fit=crop',
    description: 'Professional gift solutions for business relationships',
    category: 'business',
    rating: 4.8,
    reviews: 134,
    details: {
        deliveryTime: CONFIG.DEFAULT_DELIVERY_TIME,
        boxSize: 'Customizable',
        customizable: true,
        freeDelivery: true,
        bulkOrders: true
    },
    subProducts: [
        {
            id: 'executive-box',
            name: 'Executive Premium Box',
            price: 4999,
            image: 'https://images.unsplash.com/photo-1579487785973-74d2ca7d74a2?auto=format&w=400&h=300&fit=crop',
            description: 'Luxury corporate gift solutions',
            contents: [
                'Premium leather accessories',
                'Executive stationery set',
                'Custom branded items',
                'Business card holder',
                'Professional packaging'
            ],
            specifications: {
                boxSize: '12" x 10" x 6"',
                weight: '1.8 kg',
                deliveryTime: '3-4 business days',
                customizable: true,
                bulkDiscount: true
            }
        }
        // Add more corporate sub-products...
    ]
}

// Enhanced Functionality for Product Display
const productDisplay = {
    createProductCard(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        class="product-image"
                        loading="lazy"
                    >
                    <div class="product-overlay">
                        <div class="quick-view-btn" onclick="modalManager.showQuickView('${product.id}')">
                            <i class="fas fa-eye"></i> Quick View
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${product.rating}</span>
                            <span class="reviews">(${product.reviews} reviews)</span>
                        </div>
                        <div class="delivery-info">
                            <i class="fas fa-truck"></i>
                            <span>${product.details.deliveryTime}</span>
                        </div>
                    </div>
                    <div class="product-actions">
                        <button class="primary-btn" onclick="productManager.showSubProducts('${product.id}')">
                            View Options
                        </button>
                        <button class="secondary-btn" onclick="wishlistManager.toggleWishlist('${product.id}')">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderProducts(products, container) {
        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
        this.initializeAnimations();
    },

    initializeAnimations() {
        const cards = document.querySelectorAll('.product-card');
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

        cards.forEach(card => observer.observe(card));
    }
};

// Wishlist Management
const wishlistManager = {
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index === -1) {
            this.wishlist.push(productId);
            this.showNotification('Added to wishlist');
        } else {
            this.wishlist.splice(index, 1);
            this.showNotification('Removed from wishlist');
        }
        this.saveWishlist();
        this.updateWishlistUI();
    },

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },

    updateWishlistUI() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            const heartIcon = card.querySelector('.fa-heart');
            if (this.wishlist.includes(productId)) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
            }
        });
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-heart"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-grid');
    productDisplay.renderProducts(products, productsContainer);
    wishlistManager.updateWishlistUI();
});
// Search Functionality
const searchManager = {
    init() {
        this.searchInput = document.querySelector('.search-input');
        this.searchResults = document.querySelector('.search-results');
        this.setupListeners();
    },

    setupListeners() {
        this.searchInput.addEventListener('input', utils.debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));
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

            return [
                ...(mainMatch ? [{type: 'main', item: product}] : []),
                ...subMatches.map(sub => ({
                    type: 'sub',
                    item: sub,
                    parent: product
                }))
            ];
        });
    },

    displayResults(results) {
        if (!results.length) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found</p>
                    <span>Try different keywords or browse our categories</span>
                </div>
            `;
            return;
        }

        this.searchResults.innerHTML = `
            <div class="search-results-container">
                ${results.map(result => this.createResultItem(result)).join('')}
            </div>
        `;
    },

    createResultItem(result) {
        if (result.type === 'main') {
            return `
                <div class="search-result-item" onclick="productManager.showSubProducts('${result.item.id}')">
                    <img src="${result.item.image}" alt="${result.item.name}">
                    <div class="result-info">
                        <h4>${result.item.name}</h4>
                        <p>${result.item.description}</p>
                        <span class="result-category">${result.item.category}</span>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="search-result-item" onclick="productManager.showSubProductDetails('${result.parent.id}', '${result.item.id}')">
                    <img src="${result.item.image}" alt="${result.item.name}">
                    <div class="result-info">
                        <h4>${result.item.name}</h4>
                        <p>${result.item.description}</p>
                        <span class="result-category">in ${result.parent.name}</span>
                        <span class="result-price">${utils.formatPrice(result.item.price)}</span>
                    </div>
                </div>
            `;
        }
    },

    clearResults() {
        this.searchResults.innerHTML = '';
    }
};

// Filter System
const filterManager = {
    filters: {
        category: 'all',
        priceRange: 'all',
        sortBy: 'featured'
    },

    init() {
        this.setupFilterListeners();
        this.applyFilters();
    },

    setupFilterListeners() {
        document.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const { type, value } = e.target.dataset;
                this.updateFilter(type, value);
            });
        });
    },

    updateFilter(type, value) {
        this.filters[type] = value;
        this.applyFilters();
        this.updateUI();
    },

    applyFilters() {
        let filteredProducts = [...products];

        // Category filter
        if (this.filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === this.filters.category
            );
        }

        // Price range filter
        if (this.filters.priceRange !== 'all') {
            const [min, max] = this.filters.priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => {
                const lowestPrice = Math.min(...product.subProducts.map(sub => sub.price));
                return lowestPrice >= min && (max ? lowestPrice <= max : true);
            });
        }

        // Sorting
        switch (this.filters.sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => {
                    const aPrice = Math.min(...a.subProducts.map(sub => sub.price));
                    const bPrice = Math.min(...b.subProducts.map(sub => sub.price));
                    return aPrice - bPrice;
                });
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => {
                    const aPrice = Math.max(...a.subProducts.map(sub => sub.price));
                    const bPrice = Math.max(...b.subProducts.map(sub => sub.price));
                    return bPrice - aPrice;
                });
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }

        productDisplay.renderProducts(filteredProducts, document.querySelector('.products-grid'));
    },

    updateUI() {
        // Update active filter buttons
        document.querySelectorAll('.filter-option').forEach(option => {
            const { type, value } = option.dataset;
            option.classList.toggle('active', this.filters[type] === value);
        });
    }
};

// Animation Manager
const animationManager = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    },

    setupScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
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

        elements.forEach(element => observer.observe(element));
    },

    setupHoverEffects() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    productManager.init();
    searchManager.init();
    filterManager.init();
    animationManager.init();
    wishlistManager.init();

    // Apply saved preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
});
// Adding Seasonal and Custom Categories
{
    id: 'seasonal',
    name: 'Seasonal Special',
    image: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&w=800&h=600&fit=crop',
    description: 'Festive gift boxes for every season and celebration',
    category: 'seasonal',
    rating: 4.7,
    reviews: 167,
    details: {
        deliveryTime: CONFIG.DEFAULT_DELIVERY_TIME,
        boxSize: 'Various sizes available',
        customizable: true,
        freeDelivery: true
    },
    subProducts: [
        {
            id: 'diwali-special',
            name: 'Diwali Celebration Box',
            price: 3999,
            image: 'https://images.unsplash.com/photo-1514729797343-d0d0b4f09e7e?auto=format&w=400&h=300&fit=crop',
            description: 'Traditional Diwali gift collection',
            contents: [
                'Designer diyas and candles',
                'Premium dry fruits selection',
                'Traditional sweets',
                'Festive decorations',
                'Luxury packaging'
            ],
            specifications: {
                boxSize: '14" x 12" x 8"',
                weight: '2.0 kg',
                deliveryTime: '3-4 business days',
                customizable: true
            }
        },
        // More seasonal sub-products...
    ]
}

// Shopping Cart System
const cartManager = {
    cart: [],
    
    init() {
        this.loadCart();
        this.updateCartDisplay();
        this.setupEventListeners();
    },

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartDisplay();
    },

    addToCart(productId, subProductId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        const subProduct = product.subProducts.find(sub => sub.id === subProductId);
        
        const existingItem = this.cart.find(item => 
            item.productId === productId && item.subProductId === subProductId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                productId,
                subProductId,
                name: subProduct.name,
                price: subProduct.price,
                image: subProduct.image,
                quantity
            });
        }

        this.saveCart();
        this.showNotification(`Added ${subProduct.name} to cart`);
    },

    removeFromCart(productId, subProductId) {
        this.cart = this.cart.filter(item => 
            !(item.productId === productId && item.subProductId === subProductId)
        );
        this.saveCart();
        this.showNotification('Item removed from cart');
    },

    updateQuantity(productId, subProductId, quantity) {
        const item = this.cart.find(item => 
            item.productId === productId && item.subProductId === subProductId
        );
        
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(productId, subProductId);
            } else {
                this.saveCart();
            }
        }
    },

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    },

    showCart() {
        const modal = document.createElement('div');
        modal.className = 'modal cart-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Shopping Cart</h2>
                    <button class="close-button" onclick="modalManager.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-items">
                    ${this.cart.length > 0 ? this.cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p class="price">${utils.formatPrice(item.price)}</p>
                                <div class="quantity-controls">
                                    <button onclick="cartManager.updateQuantity('${item.productId}', '${item.subProductId}', ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="cartManager.updateQuantity('${item.productId}', '${item.subProductId}', ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <button class="remove-item" onclick="cartManager.removeFromCart('${item.productId}', '${item.subProductId}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('') : `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <button class="continue-shopping" onclick="modalManager.close()">
                                Continue Shopping
                            </button>
                        </div>
                    `}
                </div>
                ${this.cart.length > 0 ? `
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
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
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
        notification.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    setupEventListeners() {
        // Cart icon click
        document.querySelector('.cart-icon')?.addEventListener('click', () => {
            this.showCart();
        });

        // Close cart on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const cartModal = document.querySelector('.cart-modal');
                if (cartModal) {
                    cartModal.remove();
                }
            }
        });
    }
};


