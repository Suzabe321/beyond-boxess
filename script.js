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
                description: "Luxury items with premium packaging"
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
    {
        id: "anniversary",
        name: "Anniversary Special",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
        description: "Celebrate love with our romantic anniversary collections",
        subProducts: [
            {
                name: "Romantic Luxury Box",
                price: "₹3999",
                image: "https://images.unsplash.com/photo-1494919997560-caff2f1cff75",
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
                image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
                description: "Relaxation and wellness gifts for couples"
            },
            {
                name: "Memory Box",
                price: "₹2499",
                image: "https://images.unsplash.com/photo-1496989981497-27d69cdad83e",
                description: "Customizable box for precious memories"
            },
            {
                name: "Date Night Box",
                price: "₹1999",
                image: "https://images.unsplash.com/photo-1578674473215-9e47e4683ee1",
                description: "Perfect items for a romantic evening"
            }
        ]
    },
    {
        id: "wedding",
        name: "Wedding Special",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552",
        description: "Elegant gift solutions for the perfect wedding celebration",
        subProducts: [
            {
                name: "Bridal Box",
                price: "₹5999",
                image: "https://images.unsplash.com/photo-1549416878-b9ca95e26903",
                description: "Luxury items for the bride"
            },
            {
                name: "Groom Box",
                price: "₹5499",
                image: "https://images.unsplash.com/photo-1594121556340-6be88369e590",
                description: "Sophisticated gifts for the groom"
            },
            {
                name: "Couple Box",
                price: "₹7999",
                image: "https://images.unsplash.com/photo-1519741497674-611481863552",
                description: "Combined luxury items for newlyweds"
            },
            {
                name: "Wedding Party Box",
                price: "₹3999",
                image: "https://images.unsplash.com/photo-1511795409834-432f578f52d9",
                description: "Perfect for bridesmaids and groomsmen"
            },
            {
                name: "Marriage Ceremony Box",
                price: "₹4999",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
                description: "Traditional items for wedding ceremonies"
            }
        ]
    },
    {
        id: "corporate",
        name: "Corporate Gifts",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        description: "Professional gift solutions for business relationships",
        subProducts: [
            {
                name: "Executive Box",
                price: "₹4999",
                image: "https://images.unsplash.com/photo-1579487785973-74d2ca7d74a2",
                description: "Premium corporate gifts for executives"
            },
            {
                name: "Employee Recognition Box",
                price: "₹2999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Appreciation gifts for team members"
            },
            {
                name: "Business Welcome Box",
                price: "₹3499",
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
                description: "Perfect for new client relationships"
            },
            {
                name: "Conference Gift Box",
                price: "₹1999",
                image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0",
                description: "Bulk options for corporate events"
            },
            {
                name: "Custom Corporate Box",
                price: "₹3999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Branded gifts with company logo"
            }
        ]
    },
    {
        id: "seasonal",
        name: "Seasonal Special",
        image: "https://images.unsplash.com/photo-1512474932049-78ac69ede12c",
        description: "Festive gift boxes for every season",
        subProducts: [
            {
                name: "Diwali Special Box",
                price: "₹3999",
                image: "https://images.unsplash.com/photo-1514729797343-d0d0b4f09e7e",
                description: "Traditional Diwali gifts and sweets"
            },
            {
                name: "Christmas Joy Box",
                price: "₹2999",
                image: "https://images.unsplash.com/photo-1512474932049-78ac69ede12c",
                description: "Festive Christmas themed gifts"
            },
            {
                name: "New Year Celebration Box",
                price: "₹3499",
                image: "https://images.unsplash.com/photo-1546074177-31bfa593f731",
                description: "Start the year with premium gifts"
            },
            {
                name: "Holi Festival Box",
                price: "₹1999",
                image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19",
                description: "Colorful Holi celebration items"
            },
            {
                name: "Raksha Bandhan Box",
                price: "₹2499",
                image: "https://images.unsplash.com/photo-1589985270958-a664885b4dd1",
                description: "Special sibling celebration box"
            }
        ]
    },
    {
        id: "custom",
        name: "Custom Collection",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        description: "Personalized gift boxes tailored to your needs",
        subProducts: [
            {
                name: "Luxury Custom Box",
                price: "₹5999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Premium personalized gifts"
            },
            {
                name: "Photo Memory Box",
                price: "₹3999",
                image: "https://images.unsplash.com/photo-1496989981497-27d69cdad83e",
                description: "Custom photo-themed gifts"
            },
            {
                name: "Name Engraved Box",
                price: "₹4499",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Personalized engraved items"
            },
            {
                name: "Message Box",
                price: "₹2999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Custom message on all items"
            },
            {
                name: "Theme Based Box",
                price: "₹3499",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Customized theme of your choice"
            }
        ]
    },
    {
        id: "luxury",
        name: "Luxury Premium",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        description: "Ultimate luxury gift experiences",
        subProducts: [
            {
                name: "Diamond Box",
                price: "₹9999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Most premium luxury items"
            },
            {
                name: "Gold Edition Box",
                price: "₹7999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Gold-themed luxury items"
            },
            {
                name: "Platinum Experience Box",
                price: "₹8999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Premium luxury experience"
            },
            {
                name: "VIP Gift Box",
                price: "₹6999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Exclusive VIP selections"
            },
            {
                name: "Ultra Luxury Box",
                price: "₹11999",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
                description: "Ultimate luxury gift collection"
            }
        ]
    }
];

// Function to create product cards
function createProductCards() {
    const mainProducts = document.querySelector('.main-products');
    mainProducts.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
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
    modal.className = 'modal';
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
    const message = encodeURIComponent(`I am interested in ${productName} from Beyond Boxes`);
    window.open(`https://wa.me/917406839266?text=${message}`);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
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
    html.style.fontSize = action === 'increase' 
        ? `${currentSize + 1}px` 
        : `${currentSize - 1}px`;
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    createProductCards();
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-icon')) {
            document.querySelector('.mobile-menu').classList.remove('active');
        }
    });
});
