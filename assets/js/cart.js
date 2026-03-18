// ==========================================
// Cart Logic (LocalStorage functionality)
// ==========================================

const CART_KEY = 'gp_crackers_cart';

// 1. Get the cart from LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// 2. Save the cart to LocalStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartIcon();
}

// 3. Add Item to Cart
function addToCart(productId, name, price, imageSrc) {
    let cart = getCart();
    // Check if item already exists
    const existingIndex = cart.findIndex(item => item.id === productId || item.name === name);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: productId || name.replace(/\s+/g, '-').toLowerCase(),
            name: name,
            price: parseFloat(price.replace(/[^0-9.-]+/g,"")), // Clean ₹ symbols out
            image: imageSrc,
            quantity: 1
        });
    }

    saveCart(cart);
    showToast(`${name} added to cart!`);
}

// 4. Remove Item from Cart
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    if(window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

// 5. Update Item Quantity
function updateQuantity(id, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        cart[itemIndex].quantity = parseInt(newQuantity);
        saveCart(cart);
        
        if(window.location.pathname.includes('cart.html')) {
            renderCartPage();
        }
    }
}

// 6. Calculate total price
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 7. Calculate total number of items
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// 8. Update Navbar Cart Icon Badge
function updateCartIcon() {
    const count = getCartItemCount();
    const badge = document.getElementById('cart-item-count');
    
    if (badge) {
        if (count > 0) {
            badge.style.display = 'inline-block';
            badge.textContent = count;
        } else {
            badge.style.display = 'none';
        }
    }
}

// 9. Show a temporary toast notification when adding items
function showToast(message) {
    // Check if toast container exists, if not create it
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast show align-items-center text-white bg-success border-0 mb-2';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.style.minWidth = '250px';
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body fw-bold">
                <i class="bi bi-check-circle-fill me-2"></i> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Bind "Add to Cart" buttons dynamically on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon(); // Initialize indicator

    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    
    addToCartBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Find the closest product card to scrape visually represented info
            const card = e.target.closest('.product-card');
            if (card) {
                const name = card.querySelector('.product-name').textContent;
                const priceText = card.querySelector('.product-price').textContent;
                const imgSource = card.querySelector('.product-img').getAttribute('src');
                const id = `prod-${index}`; // Simple unique ID generation based on loop 
                
                addToCart(id, name, priceText, imgSource);
            }
        });
    });
});
