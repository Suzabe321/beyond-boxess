// Product Data with Optimized Images
const products = [
    {
        id: 'birthday',
        name: 'Birthday Special',
        image: 'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?auto=format&w=800&h=600&fit=crop',
        description: 'Make birthdays extraordinary with our specially curated gift boxes',
        subProducts: [
            {
                name: 'Premium Birthday Box',
                price: '₹2999',
                image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&w=400&h=300&fit=crop',
                description: 'Premium celebration box with luxury items',
                contents: [
                    'Premium chocolates selection',
                    'Customized birthday card',
                    'LED fairy lights',
                    'Scented candle',
                    'Birthday decorations'
                ]
            },
            {
                name: 'Wooden Birthday Box',
                price: '₹3499',
                image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
                description: 'Elegant wooden gift box with premium items',
                contents: [
                    'Handcrafted wooden box',
                    'Personalized photo frame',
                    'Premium treats',
                    'Custom message plaque',
                    'Luxury accessories'
                ]
            },
            {
                name: 'Kids Birthday Box',
                price: '₹1999',
                image: 'https://images.unsplash.com/photo-1531747118685-ca8a6f4514c5?auto=format&w=400&h=300&fit=crop',
                description: 'Fun-filled box for children',
                contents: [
                    'Age-appropriate toys',
                    'Party accessories',
                    'Birthday crown',
                    'Sweet treats',
                    'Activity kit'
                ]
            },
            {
                name: 'Surprise Birthday Box',
                price: '₹2499',
                image: 'https://images.unsplash.com/photo-1546462569-0f9410dc4e92?auto=format&w=400&h=300&fit=crop',
                description: 'Mystery box full of surprises',
                contents: [
                    'Mystery gifts',
                    'Party essentials',
                    'Premium snacks',
                    'Birthday accessories',
                    'Special message'
                ]
            },
            {
                name: 'Custom Birthday Box',
                price: '₹3999',
                image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&w=400&h=300&fit=crop',
                description: 'Personalized box based on preferences',
                contents: [
                    'Customized items',
                    'Theme-based décor',
                    'Premium packaging',
                    'Personal message',
                    'Luxury treats'
                ]
            }
        ]
    },
    // ... [Previous products data structure remains the same]
];

// Function to create and display product cards
function createProductCards() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
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
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="button-group">
                    <button class="order-button" onclick="orderProduct('${product.id}')">
                        <i class="fas fa-shopping-cart"></i> Order Now
                    </button>
                    <button class="view-more" onclick="showSubProducts('${product.id}')">
                        <i class="fas fa-eye"></i> View Options
                    </button>
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
            <div class="modal-header">
                <h2>${product.name} Collections</h2>
                <button class="close-button" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sub-products">
                ${product.subProducts.map(sub => `
                    <div class="sub-product">
                        <img 
                            src="${sub.image}" 
                            alt="${sub.name}" 
                            class="sub-product-image"
                            loading="lazy"
                        >
                        <h4>${sub.name}</h4>
                        <p class="price">${sub.price}</p>
                        <p class="description">${sub.description}</p>
                        <div class="contents">
                            <h5>Box Contents:</h5>
                            <ul>
                                ${sub.contents.map(item => `
                                    <li><i class="fas fa-check"></i> ${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <button class="order-button" onclick="orderSubProduct('${product.name}', '${sub.name}', '${sub.price}')">
                            <i class="fas fa-shopping-cart"></i> Order Now
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Function to order main product
function orderProduct(productId) {
    const product = products.find(p => p.id === productId);
    const message = `Hi, I'm interested in the ${product.name} collection from Beyond Boxes. Could you please provide more details?`;
    sendWhatsAppMessage(message);
}

// Function to order sub-product
function orderSubProduct(mainProduct, subProduct, price) {
    const message = `Hi, I'm interested in ordering the ${subProduct} (${price}) from the ${mainProduct} collection. Could you please provide more details?`;
    sendWhatsAppMessage(message);
}

// Function to send WhatsApp message
function sendWhatsAppMessage(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917406839266?text=${encodedMessage}`);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.style.overflow = 'auto';
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    }
}

// Function to toggle settings panel
function toggleSettings() {
    const settingsPanel = document.querySelector('.settings-panel');
    settingsPanel.classList.toggle('active');
}

// Function to change theme
function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

// Function to change text size
function changeTextSize(action) {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    const newSize = action === 'increase' ? currentSize + 1 : currentSize - 1;
    
    if (newSize >= 14 && newSize <= 20) {
        html.style.fontSize = `${newSize}px`;
        localStorage.setItem('fontSize', newSize);
    }
}

// Initialize website
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

    // Handle clicks outside settings panel
    document.addEventListener('click', (e) => {
        const settingsPanel = document.querySelector('.settings-panel');
        const settingsIcon = document.querySelector('.fa-cog');
        
        if (!settingsPanel.contains(e.target) && e.target !== settingsIcon) {
            settingsPanel.classList.remove('active');
        }
    });
});
// Adding the remaining products to the products array:

{
    id: 'wedding',
    name: 'Wedding Special',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&w=800&h=600&fit=crop',
    description: 'Elegant gift solutions for the perfect wedding celebration',
    subProducts: [
        {
            name: 'Bridal Box',
            price: '₹5999',
            image: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903?auto=format&w=400&h=300&fit=crop',
            description: 'Luxurious collection for the bride',
            contents: [
                'Bridal accessories',
                'Premium beauty products',
                'Wedding day essentials',
                'Personalized items',
                'Luxury packaging'
            ]
        },
        {
            name: 'Groom Box',
            price: '₹5499',
            image: 'https://images.unsplash.com/photo-1594121556340-6be88369e590?auto=format&w=400&h=300&fit=crop',
            description: 'Sophisticated gifts for the groom',
            contents: [
                'Premium grooming kit',
                'Luxury accessories',
                'Wedding essentials',
                'Custom message',
                'Elite packaging'
            ]
        },
        {
            name: 'Couple Box',
            price: '₹7999',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&w=400&h=300&fit=crop',
            description: 'Special combined box for newlyweds',
            contents: [
                'Couples gifts',
                'Premium items',
                'Personalized messages',
                'Wedding memories kit',
                'Luxury presentation'
            ]
        },
        {
            name: 'Wedding Party Box',
            price: '₹3999',
            image: 'https://images.unsplash.com/photo-1511795409834-432f578f52d9?auto=format&w=400&h=300&fit=crop',
            description: 'Perfect for bridesmaids and groomsmen',
            contents: [
                'Party accessories',
                'Thank you gifts',
                'Celebration items',
                'Custom messages',
                'Event memorabilia'
            ]
        },
        {
            name: 'Reception Box',
            price: '₹4999',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&w=400&h=300&fit=crop',
            description: 'Elegant gifts for reception celebration',
            contents: [
                'Reception decorations',
                'Celebration items',
                'Premium treats',
                'Party essentials',
                'Luxury packaging'
            ]
        }
    ]
},
{
    id: 'corporate',
    name: 'Corporate Gifts',
    image: 'https://images.unsplash.com/photo-1579487785973-74d2ca7d74a2?auto=format&w=800&h=600&fit=crop',
    description: 'Professional gift solutions for business relationships',
    subProducts: [
        {
            name: 'Executive Box',
            price: '₹4999',
            image: 'https://images.unsplash.com/photo-1579487785973-74d2ca7d74a2?auto=format&w=400&h=300&fit=crop',
            description: 'Premium corporate gifts for executives',
            contents: [
                'Premium stationery',
                'Leather accessories',
                'Executive items',
                'Business essentials',
                'Professional packaging'
            ]
        },
        {
            name: 'Employee Recognition Box',
            price: '₹2999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Appreciation gifts for team members',
            contents: [
                'Achievement awards',
                'Motivational items',
                'Premium gifts',
                'Recognition card',
                'Custom message'
            ]
        },
        {
            name: 'Business Welcome Box',
            price: '₹3499',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&w=400&h=300&fit=crop',
            description: 'Perfect for new client relationships',
            contents: [
                'Welcome package',
                'Business essentials',
                'Premium items',
                'Company branding',
                'Professional presentation'
            ]
        },
        {
            name: 'Conference Gift Box',
            price: '₹1999',
            image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&w=400&h=300&fit=crop',
            description: 'Bulk options for corporate events',
            contents: [
                'Event materials',
                'Conference essentials',
                'Branded items',
                'Premium gifts',
                'Professional packaging'
            ]
        },
        {
            name: 'Custom Corporate Box',
            price: '₹3999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Branded gifts with company logo',
            contents: [
                'Custom branded items',
                'Corporate gifts',
                'Premium products',
                'Business essentials',
                'Professional presentation'
            ]
        }
    ]
},
{
    id: 'seasonal',
    name: 'Seasonal Special',
    image: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&w=800&h=600&fit=crop',
    description: 'Festive gift boxes for every season',
    subProducts: [
        {
            name: 'Diwali Special Box',
            price: '₹3999',
            image: 'https://images.unsplash.com/photo-1514729797343-d0d0b4f09e7e?auto=format&w=400&h=300&fit=crop',
            description: 'Traditional Diwali celebration box',
            contents: [
                'Designer diyas',
                'Premium sweets',
                'Festive decorations',
                'Luxury dry fruits',
                'Traditional items'
            ]
        },
        {
            name: 'Christmas Joy Box',
            price: '₹2999',
            image: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&w=400&h=300&fit=crop',
            description: 'Festive Christmas themed gifts',
            contents: [
                'Christmas decorations',
                'Premium treats',
                'Festive items',
                'Holiday gifts',
                'Special packaging'
            ]
        },
        {
            name: 'New Year Box',
            price: '₹3499',
            image: 'https://images.unsplash.com/photo-1546074177-31bfa593f731?auto=format&w=400&h=300&fit=crop',
            description: 'New Year celebration gifts',
            contents: [
                'Celebration items',
                'Premium products',
                'Party accessories',
                'New Year specials',
                'Festive packaging'
            ]
        },
        {
            name: 'Holi Festival Box',
            price: '₹1999',
            image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&w=400&h=300&fit=crop',
            description: 'Colorful Holi celebration items',
            contents: [
                'Organic colors',
                'Festival treats',
                'Celebration items',
                'Protection gear',
                'Party accessories'
            ]
        },
        {
            name: 'Raksha Bandhan Box',
            price: '₹2499',
            image: 'https://images.unsplash.com/photo-1589985270958-a664885b4dd1?auto=format&w=400&h=300&fit=crop',
            description: 'Special sibling celebration box',
            contents: [
                'Designer rakhis',
                'Premium sweets',
                'Gift items',
                'Celebration accessories',
                'Special packaging'
            ]
        }
    ]
}

// Adding the final two categories:

{
    id: 'custom',
    name: 'Custom Collection',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=800&h=600&fit=crop',
    description: 'Personalized gift boxes tailored to your needs',
    subProducts: [
        {
            name: 'Luxury Custom Box',
            price: '₹5999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Premium personalized luxury box',
            contents: [
                'Custom selected items',
                'Premium packaging',
                'Personalized message',
                'Handpicked products',
                'Luxury presentation'
            ]
        },
        {
            name: 'Photo Memory Box',
            price: '₹3999',
            image: 'https://images.unsplash.com/photo-1496989981497-27d69cdad83e?auto=format&w=400&h=300&fit=crop',
            description: 'Custom photo-themed gifts',
            contents: [
                'Personalized photo album',
                'Custom photo frame',
                'Photo prints',
                'Memory book',
                'Special messages'
            ]
        },
        {
            name: 'Name Engraved Box',
            price: '₹4499',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Personalized engraved items',
            contents: [
                'Engraved items',
                'Custom accessories',
                'Premium products',
                'Personalized message',
                'Luxury packaging'
            ]
        },
        {
            name: 'Theme Based Box',
            price: '₹3499',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Custom themed gift box',
            contents: [
                'Theme-based items',
                'Matching accessories',
                'Custom decorations',
                'Themed packaging',
                'Special message'
            ]
        },
        {
            name: 'Occasion Special Box',
            price: '₹4999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Customized for any occasion',
            contents: [
                'Occasion-specific items',
                'Custom selections',
                'Premium products',
                'Special packaging',
                'Personalized note'
            ]
        }
    ]
},
{
    id: 'luxury',
    name: 'Luxury Premium',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=800&h=600&fit=crop',
    description: 'Ultimate luxury gift experiences',
    subProducts: [
        {
            name: 'Diamond Box',
            price: '₹9999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Most premium luxury items',
            contents: [
                'Premium luxury items',
                'Designer products',
                'VIP selections',
                'Exclusive gifts',
                'Elite packaging'
            ]
        },
        {
            name: 'Gold Edition Box',
            price: '₹7999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Gold-themed luxury items',
            contents: [
                'Gold-themed items',
                'Premium selections',
                'Luxury products',
                'Designer gifts',
                'Premium packaging'
            ]
        },
        {
            name: 'Platinum Experience Box',
            price: '₹8999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Premium luxury experience',
            contents: [
                'Elite selections',
                'Premium products',
                'Luxury items',
                'VIP gifts',
                'Exclusive packaging'
            ]
        },
        {
            name: 'VIP Gift Box',
            price: '₹6999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Exclusive VIP selections',
            contents: [
                'VIP items',
                'Premium selections',
                'Luxury products',
                'Elite gifts',
                'Premium presentation'
            ]
        },
        {
            name: 'Ultra Luxury Box',
            price: '₹11999',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=400&h=300&fit=crop',
            description: 'Ultimate luxury collection',
            contents: [
                'Ultra-premium items',
                'Exclusive selections',
                'Designer products',
                'Limited edition items',
                'Elite packaging'
            ]
        }
    ]
}

// Enhanced functionality for better user experience
function showNotification(message, type = 'success') {
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

// Enhanced order handling
function orderSubProduct(mainProduct, subProduct, price) {
    const message = `Hi, I'm interested in ordering the ${subProduct} (${price}) from the ${mainProduct} collection. Could you please provide more details about:
1. Delivery timeline
2. Customization options
3. Payment methods`;
    
    sendWhatsAppMessage(message);
    showNotification(`Redirecting to WhatsApp for ${subProduct} order`);
}

// Image loading optimization
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Enhanced modal functionality
function showSubProducts(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.name} Collections</h2>
                <button class="close-button" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sub-products">
                ${product.subProducts.map(sub => `
                    <div class="sub-product fade-in">
                        <div class="sub-product-image-container">
                            <img src="${sub.image}" alt="${sub.name}" loading="lazy">
                        </div>
                        <div class="sub-product-info">
                            <h4>${sub.name}</h4>
                            <p class="price">${sub.price}</p>
                            <p class="description">${sub.description}</p>
                            <div class="contents-list">
                                <h5>Box Contents:</h5>
                                <ul>
                                    ${sub.contents.map(item => `
                                        <li><i class="fas fa-check"></i> ${item}</li>
                                    `).join('')}
                                </ul>
                            </div>
                            <button class="order-button" onclick="orderSubProduct('${product.name}', '${sub.name}', '${sub.price}')">
                                <i class="fas fa-shopping-cart"></i> Order Now
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate sub-products
    setTimeout(() => {
        modal.querySelectorAll('.sub-product').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('visible');
        });
    }, 100);
}


