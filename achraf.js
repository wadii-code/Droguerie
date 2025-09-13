// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Category filter
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        
        const category = this.dataset.category;
        
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElements = document.querySelectorAll('.cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        updateCart();
        showCartNotification();
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalItems);
    
    // Update cart items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-10 text-gray-500">
                <i class="fas fa-shopping-cart text-4xl mb-3"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartSummary.classList.add('hidden');
    } else {
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center py-4 border-b border-gray-200';
            itemElement.innerHTML = `
                <div>
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-gray-600 text-sm">${item.price.toFixed(2)}€</p>
                </div>
                <div class="flex items-center">
                    <button class="decrease-quantity text-gray-500 hover:text-blue-600 px-2" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="increase-quantity text-gray-500 hover:text-blue-600 px-2" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-item text-red-500 hover:text-red-700 ml-4" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotal.textContent = subtotal.toFixed(2) + '€';
        cartTotal.textContent = subtotal.toFixed(2) + '€';
        
        cartSummary.classList.remove('hidden');
    }
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const itemIndex = cart.findIndex(item => item.id === id);
            
            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                } else {
                    cart.splice(itemIndex, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        Produit ajouté au panier
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Cart modal toggle
document.getElementById('cart-button').addEventListener('click', function() {
    document.getElementById('cart-modal').classList.remove('hidden');
});

document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').classList.add('hidden');
});

// Checkout button handler
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
        id: orders.length + 1,
        date: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    
    // Redirect to admin orders page
    window.location.href = 'kika.html#orders';
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Merci pour votre message! Nous vous contacterons bientôt.');
    
    // Reset form
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    // Handle section animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            section.classList.add('animate');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Trigger once on page load
animateOnScroll();

// Cart modal toggle with animation
document.getElementById('cart-button').addEventListener('click', function() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
});

document.getElementById('close-cart').addEventListener('click', function() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 400);
});

// Add loading animation to product cards on page load
document.querySelectorAll('.product-card').forEach(card => {
    card.classList.add('loading');
    setTimeout(() => card.classList.remove('loading'), 1500);
});