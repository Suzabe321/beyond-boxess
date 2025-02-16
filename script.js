// Main JavaScript (script.js)

// Product Data
const products = [
    {
        name: "Birthday Special",
        description: "Make birthdays extraordinary with our specially curated gift boxes",
        image: "path/to/birthday-special.jpg",
        subProducts: [
            {
                name: "Premium Birthday Box",
                description: "Luxurious birthday celebration package with premium items",
                price: "₹2999 onwards",
                image: "path/to/premium-birthday.jpg"
            },
            {
                name: "Wooden Birthday Box",
                description: "Elegant wooden crafted box filled with birthday surprises",
                price: "₹3499 onwards",
                image: "path/to/wooden-birthday.jpg"
            },
            {
                name: "Surprise Birthday Box",
                description: "Mystery box with carefully selected birthday treats",
                price: "₹2499 onwards",
                image: "path/to/surprise-birthday.jpg"
            },
            {
                name: "Customized Birthday Box",
                description: "Personalized birthday box tailored to your preferences",
                price: "₹3999 onwards",
                image: "path/to/custom-birthday.jpg"
            },
            {
                name: "Kids Birthday Box",
                description: "Fun-filled box designed specially for children's birthdays",
                price: "₹2799 onwards",
                image: "path/to/kids-birthday.jpg"
            }
        ]
    },
    // ... (Continue with other products as per previous structure)
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
});

function initializeWebsite() {
    generateProductCards();
    setupEventListeners();
    initializeSettings();
}

// Generate Product Cards
function generateProductCards() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product="${product.name}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-buttons">
                    <button class="read-more-btn" onclick="showProductDetails('${product.name}')">Read More</button>
                    <button class="order-btn" onclick="orderNow('${product.name}')">Order Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Product Details Modal
function showProductDetails(productName) {
    const product = products.find(p => p.name === productName);
    const modal = document.getElementById('product-modal');
    const modalBody = modal.querySelector('.modal-body');

    modalBody.innerHTML = `
        <div class="product-detail-content">
            <h2>${product.name}</h2>
            <div class="product-main-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
            </div>
            <p class="product-description">${product.description}</p>
            
            <h3>Available Options</h3>
            <div class="sub-products-grid">
                ${product.subProducts.map(sub => `
                    <div class="sub-product-card">
                        <img src="${sub.image}" alt="${sub.name}" onerror="this.src='placeholder.jpg'">
                        <h4>${sub.name}</h4>
                        <p>${sub.description}</p>
                        <p class="price">${sub.price}</p>
                        <button class="order-btn" onclick="orderNow('${product.name} - ${sub.name}')">Order Now</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// WhatsApp Integration
function orderNow(product) {
    const message = `Hello! I am interested in ordering the ${product} from Beyond Boxes. Please provide more details.`;
    window.open(`https://wa.me/917406839266?text=${encodeURIComponent(message)}`);
}

// Settings Panel Functionality
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

// Mobile Menu
function setupEventListeners() {
    // Settings Panel Toggle
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const menuItems = document.querySelector('.menu-items');
    
    mobileMenuBtn.addEventListener('click', () => {
        menuItems.classList.toggle('show-mobile-menu');
    });

    // Modal Close
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add smooth scroll animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
