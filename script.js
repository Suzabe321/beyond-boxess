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
                description: "Elegant wooden box with personalized gifts, handcrafted items, and luxury accessories"
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
                description: "Fun-filled boxes perfect for children with toys and treats"
            },
            {
                name: "Customized Birthday Box",
                price: "₹2499",
                image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0",
                description: "Personalized items based on recipient's preferences"
            }
        ]
    },
    {
        id: "anniversary",
        name: "Anniversary Special",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
        description: "Celebrate love with our romantic anniversary collections",
        subProducts: [
            {
                name: "Romantic Luxury Box",
                price: "₹3999",
                image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
                description: "Premium romantic gifts for couples"
            },
            {
                name: "Silver Anniversary Box",
                price: "₹4499",
                image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
                description: "Special silver-themed celebration box"
            },
            {
                name: "Couples Spa Box",
                price: "₹2999",
                image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
                description: "Relaxation and wellness gifts for couples"
            },
            {
                name: "Memory Box",
                price: "₹2499",
                image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
                description: "Customizable box for precious memories"
            },
            {
                name: "Date Night Box",
                price: "₹1999",
                image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
                description: "Perfect items for a romantic evening"
            }
        ]
    },
    // Continue with more products...
];

// Function to create product cards
function createProductCards() {
    const mainProducts = document.querySelector('.main-products');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="button-group">
                    <button class="order-button" onclick="orderProduct('${product.name}')">Order Now</button>
                    <button class="view-more" onclick="showSubProducts('${product.name}')">View Options</button>
                </div>
            </div>
        `;
        mainProducts.appendChild(card);
    });
}

// Function to show sub-products modal
function showSubProducts(productName) {
    const product = products.find(p => p.name === productName);
    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${productName} Collections</h2>
            <div class="sub-products">
                ${product.subProducts.map(sub => `
                    <div class="sub-product">
                        <img src="${sub.image}" alt="${sub.name}" class="sub-product-image">
                        <h4>${sub.name}</h4>
                        <p>${sub.description}</p>
                        <p class="price">${sub.price}</p>
                        <button class="order-button" onclick="orderProduct('${sub.name}')">Order Now</button>
                    </div>
                `).join('')}
            </div>
            <button class="close-button" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Function to handle WhatsApp ordering
function orderProduct(productName) {
    const message = encodeURIComponent(`Hi, I'm interested in ordering the ${productName} from Beyond Boxes. Please provide more details.`);
    window.open(`https://wa.me/917406839266?text=${message}`);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => modal.remove(), 300);
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Function to scroll to products section
function scrollToProducts() {
    document.querySelector('.categories-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Theme switching functionality
function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

// Text size adjustment
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
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-icon')) {
            document.querySelector('.mobile-menu').classList.remove('active');
        }
    });
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
