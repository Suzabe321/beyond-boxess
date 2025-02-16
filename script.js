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
// Luxury Category and Enhanced Features
{
    id: 'luxury',
    name: 'Luxury Premium',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=800&h=600&fit=crop',
    description: 'Ultimate luxury gift experiences for special occasions',
    category: 'luxury',
    rating: 5.0,
    reviews: 128,
    details: {
        deliveryTime: 'Premium 1-2 day delivery',
        boxSize: 'Premium sizes available',
        customizable: true,
        freeDelivery: true,
        exclusiveService: true
    },
    subProducts: [
        {
            id: 'diamond-collection',
            name: 'Diamond Collection Box',
            price: 9999,
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'The ultimate luxury gift experience',
            contents: [
                'Premium luxury items',
                'Designer accessories',
                'Exclusive collections',
                'VIP packaging',
                'Personal concierge service'
            ],
            specifications: {
                boxSize: '18" x 16" x 12"',
                weight: '3.0 kg',
                deliveryTime: '1-2 business days',
                customizable: true,
                premium: true
            }
        }
        // More luxury sub-products...
    ]
}

// Enhanced Animation System
const animationSystem = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
    },

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        animatedElements.forEach(element => observer.observe(element));
    },

    triggerAnimation(element) {
        const animation = element.dataset.animation || 'fadeIn';
        element.classList.add(animation);
        element.classList.add('animated');
    },

    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('.hover-animate');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                const animation = element.dataset.hoverAnimation || 'pulse';
                element.classList.add(animation);
            });

            element.addEventListener('mouseleave', () => {
                const animation = element.dataset.hoverAnimation || 'pulse';
                element.classList.remove(animation);
            });
        });
    },

    setupLoadingAnimations() {
        const loadingElements = document.querySelectorAll('.loading-animate');
        
        loadingElements.forEach(element => {
            element.classList.add('loading');
            
            // Simulate loading completion
            setTimeout(() => {
                element.classList.remove('loading');
                element.classList.add('loaded');
            }, 1500);
        });
    }
};

// Enhanced Notification System
const notificationSystem = {
    types: {
        SUCCESS: 'success',
        ERROR: 'error',
        INFO: 'info',
        WARNING: 'warning'
    },

    show(message, type = this.types.SUCCESS, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = this.getIconForType(type);
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <p>${message}</p>
            </div>
            <div class="notification-progress"></div>
        `;

        document.body.appendChild(notification);

        // Add animation classes
        setTimeout(() => notification.classList.add('show'), 10);

        // Setup progress bar
        const progress = notification.querySelector('.notification-progress');
        progress.style.transition = `width ${duration}ms linear`;
        progress.style.width = '0%';

        // Remove notification after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    getIconForType(type) {
        switch(type) {
            case this.types.SUCCESS:
                return 'fa-check-circle';
            case this.types.ERROR:
                return 'fa-exclamation-circle';
            case this.types.WARNING:
                return 'fa-exclamation-triangle';
            case this.types.INFO:
                return 'fa-info-circle';
            default:
                return 'fa-bell';
        }
    },

    success(message, duration) {
        this.show(message, this.types.SUCCESS, duration);
    },

    error(message, duration) {
        this.show(message, this.types.ERROR, duration);
    },

    warning(message, duration) {
        this.show(message, this.types.WARNING, duration);
    },

    info(message, duration) {
        this.show(message, this.types.INFO, duration);
    }
};

// Enhanced Loading System
const loadingSystem = {
    show(message = 'Loading...') {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loader);
        document.body.style.overflow = 'hidden';
    },

    hide() {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
};

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    productManager.init();
    cartManager.init();
    animationSystem.init();
    
    // Show loading screen
    loadingSystem.show('Loading your luxury experience...');
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingSystem.hide();
            notificationSystem.success('Welcome to Beyond Boxes!');
        }, 1000);
    });
});
// Custom Gift Category
{
    id: 'custom',
    name: 'Custom Collection',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=800&h=600&fit=crop',
    description: 'Create your perfect gift box with personalized items',
    category: 'custom',
    rating: 4.9,
    reviews: 173,
    details: {
        deliveryTime: '4-5 business days',
        boxSize: 'Customizable',
        customizable: true,
        freeDelivery: true
    },
    subProducts: [
        {
            id: 'premium-custom',
            name: 'Premium Custom Box',
            price: 4999,
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Fully customizable premium gift box',
            customizationOptions: [
                {
                    type: 'box-size',
                    name: 'Box Size',
                    options: ['Small', 'Medium', 'Large']
                },
                {
                    type: 'box-color',
                    name: 'Box Color',
                    options: ['Classic Black', 'Royal Blue', 'Rose Gold', 'Pearl White']
                },
                {
                    type: 'ribbon',
                    name: 'Ribbon Style',
                    options: ['Satin', 'Velvet', 'Gold Trim', 'Silver Trim']
                }
            ],
            contents: [
                'Choice of premium items',
                'Personalized message card',
                'Custom packaging',
                'Luxury wrapping',
                'Special handling'
            ]
        }
    ]
}

// Custom Box Builder
const customBoxBuilder = {
    currentCustomization: {
        boxSize: null,
        boxColor: null,
        ribbon: null,
        items: [],
        message: '',
        totalPrice: 0
    },

    showCustomizer(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal customizer-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Create Your Custom Box</h2>
                    <button class="close-button" onclick="modalManager.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="customizer-content">
                    <div class="customizer-steps">
                        <div class="step active" data-step="1">
                            <span class="step-number">1</span>
                            <span class="step-name">Box Details</span>
                        </div>
                        <div class="step" data-step="2">
                            <span class="step-number">2</span>
                            <span class="step-name">Select Items</span>
                        </div>
                        <div class="step" data-step="3">
                            <span class="step-number">3</span>
                            <span class="step-name">Personalization</span>
                        </div>
                        <div class="step" data-step="4">
                            <span class="step-number">4</span>
                            <span class="step-name">Review</span>
                        </div>
                    </div>
                    <div class="customizer-stage">
                        ${this.renderStage1(product)}
                    </div>
                    <div class="customizer-controls">
                        <button class="back-btn" disabled>Back</button>
                        <button class="next-btn">Next</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupCustomizerEvents(modal);
    },

    renderStage1(product) {
        return `
            <div class="customizer-stage-content" data-stage="1">
                <h3>Choose Your Box Style</h3>
                <div class="box-options">
                    ${product.subProducts[0].customizationOptions.map(option => `
                        <div class="option-group">
                            <h4>${option.name}</h4>
                            <div class="options">
                                ${option.options.map(choice => `
                                    <div class="option" data-type="${option.type}" data-value="${choice}">
                                        <div class="option-preview ${option.type}">
                                            <span>${choice}</span>
                                        </div>
                                        <div class="option-label">${choice}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    setupCustomizerEvents(modal) {
        const nextBtn = modal.querySelector('.next-btn');
        const backBtn = modal.querySelector('.back-btn');
        let currentStep = 1;

        nextBtn.addEventListener('click', () => {
            if (currentStep < 4) {
                if (this.validateStep(currentStep)) {
                    currentStep++;
                    this.updateCustomizerStage(modal, currentStep);
                } else {
                    notificationSystem.warning('Please complete all selections');
                }
            } else {
                this.finishCustomization();
            }
        });

        backBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                this.updateCustomizerStage(modal, currentStep);
            }
        });

        // Option selection events
        modal.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                const type = option.dataset.type;
                const value = option.dataset.value;
                
                // Remove active class from other options in the same group
                modal.querySelectorAll(`.option[data-type="${type}"]`)
                    .forEach(opt => opt.classList.remove('active'));
                
                option.classList.add('active');
                this.currentCustomization[type] = value;
                
                // Update preview
                this.updateBoxPreview();
            });
        });
    },

    updateCustomizerStage(modal, step) {
        const stages = {
            1: this.renderStage1,
            2: this.renderStage2,
            3: this.renderStage3,
            4: this.renderStage4
        };

        // Update steps indicator
        modal.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.toggle('active', parseInt(stepEl.dataset.step) === step);
            stepEl.classList.toggle('completed', parseInt(stepEl.dataset.step) < step);
        });

        // Update buttons
        const backBtn = modal.querySelector('.back-btn');
        const nextBtn = modal.querySelector('.next-btn');
        backBtn.disabled = step === 1;
        nextBtn.textContent = step === 4 ? 'Finish' : 'Next';

        // Update content
        const stage = modal.querySelector('.customizer-stage');
        stage.innerHTML = stages[step].call(this);
    },

    updateBoxPreview() {
        // Update 3D box preview based on current customization
        const preview = document.querySelector('.box-preview');
        if (preview) {
            preview.style.backgroundColor = this.getColorValue(this.currentCustomization.boxColor);
            // Update other visual elements...
        }
    },

    validateStep(step) {
        switch(step) {
            case 1:
                return this.currentCustomization.boxSize && 
                       this.currentCustomization.boxColor && 
                       this.currentCustomization.ribbon;
            case 2:
                return this.currentCustomization.items.length > 0;
            case 3:
                return this.currentCustomization.message.length > 0;
            default:
                return true;
        }
    },

    finishCustomization() {
        const message = `Custom Box Order:\n` +
            `Size: ${this.currentCustomization.boxSize}\n` +
            `Color: ${this.currentCustomization.boxColor}\n` +
            `Ribbon: ${this.currentCustomization.ribbon}\n` +
            `Items: ${this.currentCustomization.items.join(', ')}\n` +
            `Message: ${this.currentCustomization.message}\n` +
            `Total: ${utils.formatPrice(this.currentCustomization.totalPrice)}`;

        window.open(utils.createWhatsAppLink(message));
        modalManager.close();
        notificationSystem.success('Your custom box order has been sent!');
    }
};

// Continue with more features...
// Custom Box Builder (Remaining Stages)
const customBoxBuilder = {
    // ... (previous code remains the same)

    renderStage2(product) {
        return `
            <div class="customizer-stage-content" data-stage="2">
                <h3>Select Items for Your Box</h3>
                <div class="items-selector">
                    <div class="categories-list">
                        <div class="category-items">
                            <h4>Premium Items</h4>
                            <div class="items-grid">
                                ${this.getAvailableItems().map(item => `
                                    <div class="item-card" data-item-id="${item.id}">
                                        <img src="${item.image}" alt="${item.name}">
                                        <div class="item-info">
                                            <h5>${item.name}</h5>
                                            <p>${item.description}</p>
                                            <span class="price">+${utils.formatPrice(item.price)}</span>
                                        </div>
                                        <button class="add-item-btn" onclick="customBoxBuilder.toggleItem('${item.id}')">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="selected-items">
                        <h4>Your Selected Items</h4>
                        <div class="selected-items-list">
                            ${this.renderSelectedItems()}
                        </div>
                        <div class="total-price">
                            Total: ${utils.formatPrice(this.calculateTotal())}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderStage3() {
        return `
            <div class="customizer-stage-content" data-stage="3">
                <h3>Personalize Your Box</h3>
                <div class="personalization-options">
                    <div class="message-section">
                        <h4>Add Your Message</h4>
                        <textarea 
                            class="message-input" 
                            placeholder="Enter your personal message..."
                            maxlength="200"
                            onkeyup="customBoxBuilder.updateMessage(this.value)"
                        >${this.currentCustomization.message}</textarea>
                        <span class="character-count">
                            <span class="current">0</span>/200 characters
                        </span>
                    </div>
                    <div class="card-options">
                        <h4>Choose Card Style</h4>
                        <div class="card-styles">
                            ${this.getCardStyles().map(style => `
                                <div class="card-style ${style.id === this.currentCustomization.cardStyle ? 'selected' : ''}"
                                     onclick="customBoxBuilder.selectCardStyle('${style.id}')">
                                    <img src="${style.preview}" alt="${style.name}">
                                    <span>${style.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="delivery-options">
                        <h4>Delivery Preferences</h4>
                        <div class="delivery-date">
                            <label>Preferred Delivery Date</label>
                            <input type="date" 
                                   min="${this.getMinDeliveryDate()}" 
                                   onchange="customBoxBuilder.setDeliveryDate(this.value)">
                        </div>
                        <div class="delivery-time">
                            <label>Preferred Time Slot</label>
                            <select onchange="customBoxBuilder.setDeliveryTime(this.value)">
                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                <option value="evening">Evening (4 PM - 7 PM)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderStage4() {
        return `
            <div class="customizer-stage-content" data-stage="4">
                <h3>Review Your Custom Box</h3>
                <div class="review-container">
                    <div class="box-preview">
                        ${this.render3DPreview()}
                    </div>
                    <div class="order-summary">
                        <h4>Order Summary</h4>
                        <div class="summary-details">
                            <div class="summary-item">
                                <span>Box Style:</span>
                                <span>${this.currentCustomization.boxSize} - ${this.currentCustomization.boxColor}</span>
                            </div>
                            <div class="summary-item">
                                <span>Ribbon:</span>
                                <span>${this.currentCustomization.ribbon}</span>
                            </div>
                            <div class="summary-item">
                                <span>Selected Items:</span>
                                <ul>
                                    ${this.currentCustomization.items.map(item => `
                                        <li>${item.name} - ${utils.formatPrice(item.price)}</li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div class="summary-item">
                                <span>Message:</span>
                                <p class="message-preview">${this.currentCustomization.message}</p>
                            </div>
                            <div class="summary-item">
                                <span>Delivery:</span>
                                <span>${this.formatDeliveryDateTime()}</span>
                            </div>
                            <div class="total">
                                <span>Total:</span>
                                <span>${utils.formatPrice(this.calculateTotal())}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="terms-agreement">
                    <label>
                        <input type="checkbox" onchange="customBoxBuilder.setAgreedToTerms(this.checked)">
                        I agree to the terms and conditions
                    </label>
                </div>
            </div>
        `;
    },

    // Helper functions for the custom box builder
    getAvailableItems() {
        return [
            {
                id: 'chocolate-premium',
                name: 'Premium Chocolate Selection',
                description: 'Assorted luxury chocolates',
                price: 999,
                image: 'images/items/chocolate-premium.jpg'
            },
            // Add more available items...
        ];
    },

    calculateTotal() {
        const basePrice = 1999; // Base box price
        const itemsTotal = this.currentCustomization.items.reduce((total, item) => total + item.price, 0);
        return basePrice + itemsTotal;
    },

    // Continue with more helper functions...
};

// Image Gallery System
const imageGallery = {
    showGallery(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="gallery-container">
                    <div class="main-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="thumbnail-container">
                        ${this.getThumbnails(product)}
                    </div>
                </div>
                <button class="close-button" onclick="modalManager.close()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupGalleryEvents(modal);
    }
    // Continue with gallery functions...
};
// Image Zoom and Gallery System
const imageSystem = {
    init() {
        this.setupImageZoom();
        this.setupLazyLoading();
    },

    setupImageZoom() {
        document.querySelectorAll('.zoomable-image').forEach(image => {
            image.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = image.getBoundingClientRect();
                const x = (e.clientX - left) / width * 100;
                const y = (e.clientY - top) / height * 100;
                
                image.style.transformOrigin = `${x}% ${y}%`;
            });

            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(2)';
            });

            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        });
    },

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// Order Processing System
const orderProcessor = {
    async processOrder(orderData) {
        try {
            loadingSystem.show('Processing your order...');

            // Validate order data
            const validationResult = this.validateOrder(orderData);
            if (!validationResult.valid) {
                throw new Error(validationResult.message);
            }

            // Format WhatsApp message
            const message = this.formatOrderMessage(orderData);

            // Save order to local storage
            this.saveOrderToHistory(orderData);

            // Open WhatsApp with formatted message
            window.open(utils.createWhatsAppLink(message));

            notificationSystem.success('Order processed successfully!');
            return true;
        } catch (error) {
            notificationSystem.error(error.message);
            return false;
        } finally {
            loadingSystem.hide();
        }
    },

    validateOrder(orderData) {
        if (!orderData.items || orderData.items.length === 0) {
            return { valid: false, message: 'Please select at least one item' };
        }

        if (!orderData.deliveryDetails) {
            return { valid: false, message: 'Please provide delivery details' };
        }

        return { valid: true };
    },

    formatOrderMessage(orderData) {
        const items = orderData.items.map(item => 
            `- ${item.name} (${utils.formatPrice(item.price)})`
        ).join('\n');

        return `
New Order from Beyond Boxes:

Items:
${items}

Delivery Details:
Name: ${orderData.deliveryDetails.name}
Address: ${orderData.deliveryDetails.address}
Date: ${orderData.deliveryDetails.date}
Time: ${orderData.deliveryDetails.time}

Special Instructions: ${orderData.specialInstructions || 'None'}

Total: ${utils.formatPrice(orderData.total)}
        `.trim();
    },

    saveOrderToHistory(orderData) {
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.push({
            ...orderData,
            orderId: this.generateOrderId(),
            orderDate: new Date().toISOString()
        });
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    },

    generateOrderId() {
        return 'BB-' + Date.now().toString(36).toUpperCase();
    }
};

// Enhanced Product Display System
const productDisplayManager = {
    renderProduct(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img 
                        class="zoomable-image"
                        data-src="${product.image}" 
                        alt="${product.name}"
                        loading="lazy"
                    >
                    <div class="product-badges">
                        ${product.details.freeDelivery ? '<span class="badge free-delivery">Free Delivery</span>' : ''}
                        ${product.details.customizable ? '<span class="badge customizable">Customizable</span>' : ''}
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        ${this.generateRatingStars(product.rating)}
                        <span class="review-count">(${product.reviews} reviews)</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-details">
                        <span><i class="fas fa-box"></i> ${product.details.boxSize}</span>
                        <span><i class="fas fa-truck"></i> ${product.details.deliveryTime}</span>
                    </div>
                    <div class="product-actions">
                        <button class="view-options-btn" onclick="productManager.showSubProducts('${product.id}')">
                            View Options
                        </button>
                        <button class="quick-view-btn" onclick="productManager.quickView('${product.id}')">
                            Quick View
                        </button>
                    </div>
                </div>
            </div>
        `;
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
    }
};

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    productManager.init();
    cartManager.init();
    imageSystem.init();
    
    // Show welcome message
    setTimeout(() => {
        notificationSystem.success('Welcome to Beyond Boxes!');
    }, 1000);
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh dynamic content
        productManager.refreshProducts();
    }
});

// Handle offline/online status
window.addEventListener('online', () => {
    notificationSystem.success('Back online!');
});

window.addEventListener('offline', () => {
    notificationSystem.warning('You are currently offline');
});
// Review System
const reviewSystem = {
    reviews: {},

    init() {
        this.loadReviews();
        this.setupReviewButtons();
    },

    loadReviews() {
        this.reviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    },

    addReview(productId, review) {
        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }
        
        const newReview = {
            id: Date.now(),
            ...review,
            date: new Date().toISOString(),
            verified: true
        };

        this.reviews[productId].unshift(newReview);
        this.saveReviews();
        this.updateProductRating(productId);
    },

    showReviewModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal review-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Reviews for ${product.name}</h3>
                    <button class="close-button" onclick="modalManager.close()">×</button>
                </div>
                <div class="reviews-container">
                    <div class="review-summary">
                        <div class="average-rating">
                            <span class="rating-number">${product.rating}</span>
                            <div class="stars">
                                ${this.generateStars(product.rating)}
                            </div>
                            <span class="review-count">${product.reviews} reviews</span>
                        </div>
                        <button class="write-review-btn" onclick="reviewSystem.showReviewForm('${productId}')">
                            Write a Review
                        </button>
                    </div>
                    <div class="reviews-list">
                        ${this.renderReviews(productId)}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    },

    renderReviews(productId) {
        const productReviews = this.reviews[productId] || [];
        
        if (productReviews.length === 0) {
            return `
                <div class="no-reviews">
                    <i class="fas fa-comments"></i>
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            `;
        }

        return productReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <span class="reviewer-name">${review.name}</span>
                        ${review.verified ? '<span class="verified-badge">Verified Purchase</span>' : ''}
                    </div>
                    <div class="review-rating">
                        ${this.generateStars(review.rating)}
                    </div>
                </div>
                <div class="review-content">
                    <h4>${review.title}</h4>
                    <p>${review.comment}</p>
                </div>
                <div class="review-footer">
                    <span class="review-date">${this.formatDate(review.date)}</span>
                    <div class="review-actions">
                        <button onclick="reviewSystem.likeReview('${review.id}')">
                            <i class="far fa-thumbs-up"></i> ${review.likes || 0}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// Final TouchPoints Manager
const touchPointManager = {
    init() {
        this.setupScrollEffects();
        this.setupHoverEffects();
        this.setupInteractions();
    },

    setupScrollEffects() {
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
    },

    setupInteractions() {
        // Add to wishlist interaction
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.classList.toggle('active');
                
                if (btn.classList.contains('active')) {
                    this.showWishlistAnimation(btn);
                }
            });
        });

        // Quick view interaction
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const rect = btn.getBoundingClientRect();
                this.showQuickViewAnimation(rect);
            });
        });
    },

    showWishlistAnimation(button) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        const rect = button.getBoundingClientRect();
        heart.style.left = `${rect.left}px`;
        heart.style.top = `${rect.top}px`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    productManager.init();
    cartManager.init();
    reviewSystem.init();
    touchPointManager.init();
    imageSystem.init();

    // Show loading screen
    loadingSystem.show('Loading your luxury experience...');

    // Initialize the website
    Promise.all([
        // Load necessary resources
        loadFonts(),
        loadImages(),
        initializeProducts()
    ])
    .then(() => {
        loadingSystem.hide();
        notificationSystem.success('Welcome to Beyond Boxes!');
    })
    .catch(error => {
        loadingSystem.hide();
        notificationSystem.error('Something went wrong. Please refresh the page.');
        console.error('Initialization error:', error);
    });
});

// Final utility functions
function loadFonts() {
    return new Promise((resolve) => {
        // Load custom fonts if needed
        resolve();
    });
}

function loadImages() {
    return new Promise((resolve) => {
        // Preload critical images
        resolve();
    });
}

function initializeProducts() {
    return new Promise((resolve) => {
        // Initialize product data
        resolve();
    });
}
// Complete Product Data
const products = [
    {
        id: 'birthday',
        name: 'Birthday Special',
        image: 'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a',
        description: 'Make birthdays extraordinary with our specially curated gift boxes',
        category: 'celebration',
        rating: 4.8,
        reviews: 245,
        details: {
            deliveryTime: '2-3 business days',
            boxSize: '12" x 10" x 6"',
            customizable: true,
            freeDelivery: true
        },
        subProducts: [
            {
                id: 'premium-birthday',
                name: 'Premium Birthday Box',
                price: 2999,
                image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
                description: 'Luxury items with premium packaging'
            },
            // ... other sub-products
        ]
    },
    // ... other main products
];

// Complete Shopping Cart System
const shoppingCart = {
    items: [],
    
    init() {
        this.loadCart();
        this.updateCartDisplay();
    },

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    },

    addItem(productId, quantity = 1) {
        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ id: productId, quantity });
        }
        this.saveCart();
        this.updateCartDisplay();
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    },

    showCart() {
        modalManager.show('cart', this.renderCart());
    },

    renderCart() {
        if (this.items.length === 0) {
            return `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button onclick="modalManager.close()">Continue Shopping</button>
                </div>
            `;
        }

        return `
            <div class="cart-items">
                ${this.items.map(item => this.renderCartItem(item)).join('')}
            </div>
            <div class="cart-summary">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>${this.getFormattedTotal()}</span>
                </div>
                <button class="checkout-btn" onclick="shoppingCart.checkout()">
                    Proceed to Checkout
                </button>
            </div>
        `;
    }
};

// Form Validation System
const formValidator = {
    validateForm(formData, rules) {
        const errors = {};

        for (const [field, value] of Object.entries(formData)) {
            if (rules[field]) {
                const fieldErrors = this.validateField(value, rules[field]);
                if (fieldErrors.length > 0) {
                    errors[field] = fieldErrors;
                }
            }
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    },

    validateField(value, rules) {
        const errors = [];

        rules.forEach(rule => {
            switch (rule.type) {
                case 'required':
                    if (!value || value.trim() === '') {
                        errors.push(rule.message || 'This field is required');
                    }
                    break;

                case 'email':
                    if (!this.isValidEmail(value)) {
                        errors.push(rule.message || 'Invalid email address');
                    }
                    break;

                case 'phone':
                    if (!this.isValidPhone(value)) {
                        errors.push(rule.message || 'Invalid phone number');
                    }
                    break;

                case 'minLength':
                    if (value.length < rule.value) {
                        errors.push(rule.message || `Minimum ${rule.value} characters required`);
                    }
                    break;

                case 'maxLength':
                    if (value.length > rule.value) {
                        errors.push(rule.message || `Maximum ${rule.value} characters allowed`);
                    }
                    break;
            }
        });

        return errors;
    },

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    isValidPhone(phone) {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    }
};

// Complete Modal System
const modalManager = {
    activeModals: [],

    show(type, content) {
        const modal = document.createElement('div');
        modal.className = `modal ${type}-modal`;
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.getModalTitle(type)}</h3>
                    <button class="close-button" onclick="modalManager.close()">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.activeModals.push(modal);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Add animation
        setTimeout(() => modal.classList.add('active'), 10);

        // Setup event listeners
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
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        // Close on escape key
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

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    shoppingCart.init();
    // ... other initializations
});


