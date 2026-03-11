let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
    let item = cart.find(product => product.name === name);
    
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    
    cartContainer.innerHTML = "";
    cartCount.innerText = cart.length;

    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("open");
}

// Load cart data on page load
document.addEventListener("DOMContentLoaded", updateCart);
