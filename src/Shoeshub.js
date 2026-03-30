const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const panel = document.getElementById("sidePanel");

openBtn.addEventListener("click", () => {
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", closePanel);

window.addEventListener("click", (e) => {
  if (!panel.classList.contains("open")) return;
  // if clicked outside the panel (and not the hamburger)
  if (!panel.contains(e.target) && e.target !== openBtn) closePanel();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
});

function closePanel() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
window.addEventListener("resize", () => {
  if (window.innerWidth >= 800 && panel.classList.contains("open"))
    closePanel();
});

/* Add to csart and check out system login */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");

updateCartCount();


function toggleCart(){

const cart = document.getElementById("cart-modal");

cart.style.display = cart.style.display === "block" ? "none" : "block";

renderCart();

}


// ADD TO CART
document.querySelectorAll(".add-to-cart").forEach(btn => {

btn.addEventListener("click", function () {

const card = this.parentElement;

const name = card.querySelector(".product-name").innerText;

const price = parseFloat(card.querySelector(".product-price").innerText);

const product = cart.find(item => item.name === name);

if(product){

product.qty++;

}else{

cart.push({
name,
price,
qty:1
});

}

saveCart();
renderCart();

});

});


// SAVE
function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}

// COUNT
function updateCartCount(){

let count = cart.reduce((sum,item)=>sum+item.qty,0);

cartCount.innerText = count;

}

// RENDER
function renderCart(){

cartItems.innerHTML = "";

cart.forEach((item,index)=>{

let div = document.createElement("div");

div.classList.add("cart-item");

div.innerHTML = `
<p>${item.name}</p>
<p>₹${item.price}</p>

<button onclick="changeQty(${index},-1)">-</button>
<span class="qty">${item.qty}</span>
<button onclick="changeQty(${index},1)">+</button>

<button onclick="removeItem(${index})">Remove</button>
`;

cartItems.appendChild(div);

});

calculateTotal();

}

// CHANGE QTY
function changeQty(index,value){

cart[index].qty += value;

if(cart[index].qty <=0){

cart.splice(index,1);

}

saveCart();

renderCart();

}

// REMOVE
function removeItem(index){

cart.splice(index,1);

saveCart();

renderCart();

}

// TOTAL
function calculateTotal(){

let subtotal = 0;

cart.forEach(item=>{

subtotal += item.price * item.qty;

});

let tax = subtotal * 0.05;

let total = subtotal + tax;

document.getElementById("subtotal").innerText = subtotal.toFixed(2);

document.getElementById("tax").innerText = tax.toFixed(2);

document.getElementById("total").innerText = total.toFixed(2);

}

// WISHLIST
document.querySelectorAll(".wishlist").forEach(heart=>{

heart.addEventListener("click",function(){

this.classList.toggle("active");

if(this.classList.contains("active")){

this.innerHTML="❤️";

}else{

this.innerHTML="♡";

}

});

});

// PAYMENT
document.getElementById("checkout").onclick = function(){

let total = document.getElementById("total").innerText;

var options = {

"key": "YOUR_RAZORPAY_KEY",

"amount": total * 100,

"currency": "INR",

"name": "My Store",

"description": "Order Payment",

"handler": function (response){

alert("Payment Successful");

},

"theme": {

"color": "#000"

}

};

var rzp = new Razorpay(options);

rzp.open();

};
 