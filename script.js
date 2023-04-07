let navbar = document.querySelector(".navbar");

document.querySelector("#hamburger-menu").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");

document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

//add to cart

const addToCart = document.querySelectorAll(".add-to-cart");
const productRow = document.querySelectorAll(".product-row");

for (i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener("onclick", addToCartClicked);
}

function addToCartClicked(event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName("price")[0].innerText;
  var image = cartItem.getElementsByClassName("item-image")[0].src;
  addItemToCart(price, image);
  updateCartPrice();
}
