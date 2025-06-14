// Products Data
const products = [
    {
        id: 1,
        name: "Red Velvet Cake (Round 20 cm)",
        description: "Kue velvet merah premium dengan cream cheese frosting yang lembut dan tekstur yang sempurna",
        price: 450000,
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&h=300&fit=crop&crop=center",
        category: "cake"
    },
    {
        id: 2,
        name: "Chocolate Brownie Premium",
        description: "Brownie coklat premium dengan tekstur fudgy yang menggoda dan rasa coklat yang kaya",
        price: 285000,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&crop=center",
        category: "brownie"
    },
    {
        id: 3,
        name: "Strawberry Cheesecake (Round 20 cm)",
        description: "Cheesecake lembut dengan topping strawberry segar dan base biskuit yang renyah",
        price: 395000,
        image: "https://images.unsplash.com/photo-1553882299-9601a48ebe6a?w=400&h=300&fit=crop&crop=center",
        category: "cheesecake"
    },
    {
        id: 4,
        name: "Tiramisu Classic (Round 20 cm)",
        description: "Dessert Italia klasik dengan perpaduan kopi, mascarpone, dan ladyfinger yang sempurna",
        price: 425000,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center",
        category: "tiramisu"
    },
    {
        id: 5,
        name: "Lemon Tart Fresh",
        description: "Tart lemon segar dengan curd lemon yang asam manis dan pastry yang renyah",
        price: 320000,
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop&crop=center",
        category: "tart"
    },
    {
        id: 6,
        name: "Black Forest (Round 20 cm)",
        description: "Kue coklat klasik dengan cherry dan whipped cream, cita rasa Jerman yang autentik",
        price: 465000,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center",
        category: "cake"
    },
    {
        id: 7,
        name: "Vanilla Sponge Cake",
        description: "Kue spons vanilla klasik yang lembut dengan buttercream vanilla yang creamy",
        price: 350000,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop&crop=center",
        category: "cake"
    },
    {
        id: 8,
        name: "Matcha Roll Cake",
        description: "Roll cake matcha premium dengan cream cheese filling dan taburan matcha powder",
        price: 385000,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center",
        category: "roll"
    }
];

// Global Variables
let cart = [];
let currentSlide = 0;
const productsPerPage = 4;

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function saveToLocalStorage() {
    try {
        // Placeholder for localStorage functionality
        console.log('Cart saved:', cart);
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
}

function loadFromLocalStorage() {
    try {
        // Placeholder for localStorage functionality
        console.log('Cart loaded from storage');
    } catch (error) {
        console.error('Failed to load cart:', error);
    }
}

// Product Functions
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const startIndex = currentSlide * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const visibleProducts = products.slice(startIndex, endIndex);

    productsGrid.innerHTML = visibleProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/400x300/8B4513/white?text=No+Image'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    `).join('');

    // Add animation to product cards
    animateProductCards();
}

function slideProducts(direction) {
    const maxSlides = Math.ceil(products.length / productsPerPage) - 1;
    
    if (direction === 1 && currentSlide < maxSlides) {
        currentSlide++;
    } else if (direction === -1 && currentSlide > 0) {
        currentSlide--;
    } else if (direction === 1 && currentSlide === maxSlides) {
        currentSlide = 0; // Loop back to start
    } else if (direction === -1 && currentSlide === 0) {
        currentSlide = maxSlides; // Loop to end
    }
    
    loadProducts();
}

function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} berhasil ditambahkan ke keranjang!`);
    saveToLocalStorage();
    
    // Add visual feedback to button
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Ditambahkan!';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    saveToLocalStorage();
    showNotification('Item berhasil dihapus dari keranjang');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    updateCartCount();
    renderCartItems();
    saveToLocalStorage();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation to cart count
    if (totalItems > 0) {
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px 0; color: #666;">
                <div style="font-size: 3rem; margin-bottom: 15px;">🛒</div>
                <p>Keranjang belanja kosong</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Silakan pilih produk favorit Anda</p>
            </div>
        `;
        cartTotal.innerHTML = '<strong>Total: Rp 0</strong>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${formatCurrency(item.price)} × ${item.quantity}</p>
            </div>
            <div class="item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `<strong>Total: ${formatCurrency(total)}</strong>`;
}

// Modal Functions
function openCart() {
    const cartModal = document.getElementById('cartModal');
    if (!cartModal) return;
    
    renderCartItems();
    cartModal.style.display = 'block';
    
    // Add animation
    setTimeout(() => {
        cartModal.style.opacity = '1';
    }, 10);
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    if (!cartModal) return;
    
    cartModal.style.opacity = '0';
    setTimeout(() => {
        cartModal.style.display = 'none';
    }, 300);
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja kosong!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Generate order summary
    const orderSummary = cart.map(item => 
        `• ${item.name} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');
    
    const confirmMessage = `Konfirmasi Pesanan:\n\n${orderSummary}\n\nTotal: ${formatCurrency(total)}\nJumlah Item: ${itemCount}\n\nLanjutkan ke pembayaran?`;
    
    if (confirm(confirmMessage)) {
        // Simulate order processing
        showNotification('Pesanan berhasil dibuat! Anda akan diarahkan ke halaman pembayaran.', 'success');
        
        // Clear cart after successful order
        setTimeout(() => {
            cart = [];
            updateCartCount();
            closeCart();
            saveToLocalStorage();
        }, 2000);
    }
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '3000',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        background: type === 'error' ? '#e74c3c' : '#27ae60'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto dismiss
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Navigation Functions
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-active');
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.about-content, .section-header, .feature').forEach(el => {
        observer.observe(el);
    });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Open cart with 'C' key
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                openCart();
            }
        }
        
        // Close modals with 'Escape' key
        if (e.key === 'Escape') {
            closeCart();
        }
        
        // Navigate products with arrow keys
        if (e.key === 'ArrowLeft') {
            slideProducts(-1);
        }
        if (e.key === 'ArrowRight') {
            slideProducts(1);
        }
    });
}

// Auto-slide Products
function initAutoSlide() {
    setInterval(() => {
        slideProducts(1);
    }, 10000); // Auto slide every 10 seconds
}

// Initialize App
function initApp() {
    // Load initial data
    loadFromLocalStorage();
    loadProducts();
    updateCartCount();
    
    // Initialize features
    initSmoothScrolling();
    initScrollAnimations();
    initKeyboardShortcuts();
    initAutoSlide();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
        
        .cart-modal {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎂 CakeCart initialized successfully!');
    console.log('💡 Keyboard shortcuts: C = Open Cart, ESC = Close, ← → = Navigate Products');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - pausing auto-slide');
    } else {
        console.log('Page visible - resuming auto-slide');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showNotification('Koneksi internet tersambung kembali', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Koneksi internet terputus', 'error');
});

// Export functions for global access
window.addToCart = addToCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.slideProducts = slideProducts;
window.scrollToProducts = scrollToProducts;
window.toggleMobileMenu = toggleMobileMenu;
window.updateQuantity = updateQuantity;