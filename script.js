// All products data
const products = [
    {
        id: "birthday",
        name: "Birthday Special",
        image: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a",
        description: "Make birthdays extraordinary with our specially curated gift boxes",
        subProducts: [
            {
                name: "Premium Birthday Box",
                price: "₹2999",
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
                description: "Luxury items with premium packaging including chocolates, personalized items, and premium decoratives"
            },
            {
                name: "Wooden Birthday Box",
                price: "₹3499",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Elegant wooden box with personalized gifts"
            },
            {
                name: "Surprise Birthday Box",
                price: "₹1999",
                image: "https://images.unsplash.com/photo-1546462569-0f9410dc4e92",
                description: "Mystery items carefully selected for the perfect surprise"
            },
            {
                name: "Kids Birthday Box",
                price: "₹1499",
                image: "https://images.unsplash.com/photo-1531747118685-ca8a6f4514c5",
                description: "Fun-filled boxes perfect for children"
            },
            {
                name: "Customized Birthday Box",
                price: "₹2499",
                image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0",
                description: "Personalized items based on recipient's preferences"
            }
        ]
    },
    // ... [Previous products array continues with all 7 categories]
];

// Utility function to animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Function to create product cards with animation
function createProductCards() {
    const mainProducts = document.querySelector('.main-products');
    mainProducts.innerHTML = ''; // Clear existing content

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-overlay">
                    <div class="overlay-content">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="button-group">
                    <button class="order-button" onclick="orderProduct('${product.name}')">
                        <i class="fas fa-shopping-cart"></i> Order Now
                    </button>
                    <button class="view-more" onclick="showSubProducts('${product.name}')">
                        <i class="fas fa-eye"></i> View Options
                    </button>
                </div>
            </div>
        `;
        
        mainProducts.appendChild(card);
    });
}

// Enhanced modal display function
function showSubProducts(productName) {
    const product = products.find(p => p.name === productName);
    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${productName} Collections</h2>
                <button class="close-button" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sub-products">
                ${product.subProducts.map(sub => `
                    <div class="sub-product fade-in">
                        <div class="sub-product-image-container">
                            <img src="${sub.image}" alt="${sub.name}" class="sub-product-image">
                        </div>
                        <div class="sub-product-info">
                            <h4>${sub.name}</h4>
                            <p>${sub.description}</p>
                            <p class="price">${sub.price}</p>
                            <button class="order-button" onclick="orderProduct('${sub.name}')">
                                <i class="fas fa-shopping-cart"></i> Order Now
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Animate sub-products
    setTimeout(() => {
        modal.querySelectorAll('.sub-product').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('visible');
        });
    }, 100);
}

// Enhanced WhatsApp ordering function
function orderProduct(productName) {
    const product = products.find(p => 
        p.name === productName || 
        p.subProducts.some(sub => sub.name === productName)
    );
    
    let message;
    if (product.name === productName) {
        message = `Hi, I'm interested in the ${productName} collection from Beyond Boxes. Could you please provide more details?`;
    } else {
        const subProduct = product.subProducts.find(sub => sub.name === productName);
        message = `Hi, I'm interested in ordering the ${productName} (${subProduct.price}) from Beyond Boxes. Please provide more information.`;
    }
    
    window.open(`https://wa.me/917406839266?text=${encodeURIComponent(message)}`);
}

// Improved modal closing function
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon i');
    
    mobileMenu.classList.toggle('active');
    mobileMenuIcon.classList.toggle('fa-bars');
    mobileMenuIcon.classList.toggle('fa-times');
}

// Smooth scroll function
function scrollToProducts() {
    document.querySelector('.categories-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Theme switching with local storage
function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    
    // Update theme icons
    const themeButtons = document.querySelectorAll('.theme-options button');
    themeButtons.forEach(button => {
        button.classList.remove('active');
        if (button.onclick.toString().includes(theme)) {
            button.classList.add('active');
        }
    });
}

// Font size adjustment with limits
function changeTextSize(action) {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    let newSize;

    if (action === 'increase' && currentSize < 20) {
        newSize = currentSize + 1;
    } else if (action === 'decrease' && currentSize > 14) {
        newSize = currentSize - 1;
    } else {
        return; // Size limit reached
    }

    html.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize);
}

// Initialize website
document.addEventListener('DOMContentLoaded', () => {
    // Create product cards
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
    
    // Add scroll animation listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize mobile menu click outside listener
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && 
            !e.target.closest('.mobile-menu-icon')) {
            document.querySelector('.mobile-menu').classList.remove('active');
            const mobileMenuIcon = document.querySelector('.mobile-menu-icon i');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        }
    });

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.querySelector('.mobile-menu').classList.remove('active');
            }
        });
    });
});

// Add loading animation for images
document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.classList.add('loaded');
    }
}, true);
// Additional utility functions

// Image preloader
function preloadImages() {
    products.forEach(product => {
        const mainImg = new Image();
        mainImg.src = product.image;
        
        product.subProducts.forEach(sub => {
            const subImg = new Image();
            subImg.src = sub.image;
        });
    });
}

// Search functionality
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.subProducts.some(sub => 
            sub.name.toLowerCase().includes(searchTerm) ||
            sub.description.toLowerCase().includes(searchTerm)
        )
    );
    
    createProductCards(filteredProducts);
}

// Price formatter
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Share functionality
function shareProduct(productName) {
    const product = products.find(p => p.name === productName);
    if (navigator.share) {
        navigator.share({
            title: `Check out ${productName} at Beyond Boxes`,
            text: product.description,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
    }
}

// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productName) {
    const index = wishlist.indexOf(productName);
    if (index === -1) {
        wishlist.push(productName);
        showToast(`${productName} added to wishlist`);
    } else {
        wishlist.splice(index, 1);
        showToast(`${productName} removed from wishlist`);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productName = btn.dataset.product;
        btn.classList.toggle('active', wishlist.includes(productName));
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} fade-in`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form validation for custom orders
function validateCustomOrder(formData) {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Valid email is required');
    }
    if (!formData.phone.match(/^\+?[\d\s-]{10,}$/)) {
        errors.push('Valid phone number is required');
    }
    
    return errors;
}

// Custom order form handler
function handleCustomOrder(event) {
    event.preventDefault();
    
    const formData = {
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        message: event.target.message.value,
        budget: event.target.budget.value
    };
    
    const errors = validateCustomOrder(formData);
    
    if (errors.length > 0) {
        showToast(errors.join('\n'), 'error');
        return;
    }
    
    // Construct WhatsApp message for custom order
    const message = `New Custom Order Request:\n
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Budget: ${formData.budget}
Message: ${formData.message}`;

    window.open(`https://wa.me/917406839266?text=${encodeURIComponent(message)}`);
}

// Lazy loading for images
function lazyLoadImages() {
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

// Add to cart functionality (if needed in future)
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        
        this.saveCart();
        showToast(`${product.name} added to cart`);
    }
    
    removeItem(productName) {
        this.items = this.items.filter(item => item.name !== productName);
        this.saveCart();
        showToast(`${productName} removed from cart`);
    }
    
    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.name === productName);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
        }
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        showToast('Cart cleared');
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartUI();
    }
    
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
}

// Initialize cart
const cart = new Cart();

// Export functionality for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        Cart,
        formatPrice,
        validateCustomOrder
    };
}
