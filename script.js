const products = [
    {
        name: "Birthday Special",
        image: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a",
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
                description: "Mystery items carefully selected"
            },
            {
                name: "Kids Birthday Box",
                price: "₹1499",
                description: "Fun-filled boxes for children"
            },
            {
                name: "Customized Birthday Box",
                price: "₹2499",
                description: "Personalized items based on preferences"
            }
        ]
    },
    {
        name: "Anniversary Special",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
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
                description: "Relaxation and wellness gifts"
            },
            {
                name: "Memory Box",
                price: "₹2499",
                description: "Customizable box for memories"
            },
            {
                name: "Date Night Box",
                price: "₹1999",
                description: "Perfect items for a romantic evening"
            }
        ]
    },
    {
        name: "Wedding Special",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552",
        description: "Elegant gift solutions for weddings",
        subProducts: [
            {
                name: "Bridal Box",
                price: "₹5999",
                description: "Luxury items for the bride"
            },
            {
                name: "Groom Box",
                price: "₹5499",
                description: "Sophisticated gifts for the groom"
            },
            {
                name: "Couple Box",
                price: "₹7999",
                description: "Combined luxury items for newlyweds"
            },
            {
                name: "Wedding Party Box",
                price: "₹3999",
                description: "For bridesmaids and groomsmen"
            },
            {
                name: "Marriage Ceremony Box",
                price: "₹4999",
                description: "Traditional wedding items"
            }
        ]
    },
    {
        name: "Corporate Gifts",
        image: "https://images.unsplash.com/photo-1579487785973-74d2ca7d74a2",
        description: "Professional gift solutions for business",
        subProducts: [
            {
                name: "Executive Box",
                price: "₹4999",
                description: "Premium corporate gifts"
            },
            {
                name: "Employee Recognition Box",
                price: "₹2999",
                description: "Appreciation gifts for team"
            },
            {
                name: "Business Welcome Box",
                price: "₹3499",
                description: "New client relationship gifts"
            },
            {
                name: "Conference Gift Box",
                price: "₹1999",
                description: "Bulk corporate event gifts"
            },
            {
                name: "Custom Corporate Box",
                price: "₹3999",
                description: "Branded company gifts"
            }
        ]
    },
    {
        name: "Seasonal Special",
        image: "https://images.unsplash.com/photo-1512474932049-78ac69ede12c",
        description: "Festive gift boxes for every season",
        subProducts: [
            {
                name: "Diwali Special Box",
                price: "₹3999",
                description: "Traditional Diwali gifts"
            },
            {
                name: "Christmas Joy Box",
                price: "₹2999",
                description: "Festive Christmas gifts"
            },
            {
                name: "New Year Box",
                price: "₹3499",
                description: "New Year celebration gifts"
            },
            {
                name: "Holi Festival Box",
                price: "₹1999",
                description: "Colorful Holi celebration items"
            },
            {
                name: "Raksha Bandhan Box",
                price: "₹2499",
                description: "Special sibling celebration box"
            }
        ]
    },
    {
        name: "Custom Collection",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        description: "Personalized gift boxes for any occasion",
        subProducts: [
            {
                name: "Luxury Custom Box",
                price: "₹5999",
                description: "Premium personalized gifts"
            },
            {
                name: "Photo Memory Box",
                price: "₹3999",
                description: "Custom photo-themed gifts"
            },
            {
                name: "Name Engraved Box",
                price: "₹4499",
                description: "Personalized engraved items"
            },
            {
                name: "Message Box",
                price: "₹2999",
                description: "Custom message items"
            },
            {
                name: "Theme Based Box",
                price: "₹3499",
                description: "Your choice of theme"
            }
        ]
    },
    {
        name: "Luxury Premium",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        description: "Ultimate luxury gift experiences",
        subProducts: [
            {
                name: "Diamond Box",
                price: "₹9999",
                description: "Most premium luxury items"
            },
            {
                name: "Gold Edition Box",
                price: "₹7999",
                description: "Gold-themed luxury items"
            },
            {
                name: "Platinum Box",
                price: "₹8999",
                description: "Premium luxury experience"
            },
            {
                name: "VIP Gift Box",
                price: "₹6999",
                description: "Exclusive VIP selections"
            },
            {
                name: "Ultra Luxury Box",
                price: "₹11999",
                description: "Ultimate luxury collection"
            }
        ]
    }
];

// Create product cards
function createProductCards() {
    const mainProducts = document.querySelector('.main-products');
    mainProducts.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="order-button" onclick="orderProduct('${product.name}')">Order Now</button>
            <button class="view-more" onclick="showSubProducts('${product.name}')">View Options</button>
        `;
        mainProducts.appendChild(card);
    });
}

// Show sub-products modal
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
                        <button onclick="orderProduct('${sub.name}')">Order Now</button>
                    </div>
                `).join('')}
            </div>
            <button onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Handle WhatsApp ordering
function orderProduct(productName) {
    const message = encodeURIComponent(`I am interested in ${productName} from Beyond Boxes`);
    window.open(`https://wa.me/917406839266?text=${message}`);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

// Toggle settings panel
function toggleSettings() {
    const settingsPanel = document.querySelector('.settings-panel');
    settingsPanel.classList.toggle('active');
}

// Change theme
function changeTheme(theme) {
    document.body.className = theme;
}

// Change text size
function changeTextSize(action) {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    html.style.fontSize = action === 'increase' 
        ? `${currentSize + 1}px` 
        : `${currentSize - 1}px`;
}

// Initialize website
document.addEventListener('DOMContentLoaded', createProductCards);
