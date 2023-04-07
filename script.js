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

const addToCart = document.getElementsByClassName("add-to-cart");
for (i = 0; i < addToCart.length; i++) {
  var addButton = addToCart[i];
  addButton.addEventListener("onclick", addToCartClicked);
}

function addToCartClicked(event) {
  var button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName("price")[0].innerText;
  var name = cartItem.getElementsByClassName("item-name")[0].innerText;
  var image = cartItem.getElementsByClassName("item-image")[0].src;
  addItemToCart(name, image, price);
  updateTotalPrice();
}

function addItemToCart(name, image, price) {
  var cartItemBox = document.createElement("div");
  cartItemBox.classList.add("cart-item");
  var cartItemsContainer = document.getElementsByClassName(
    "cart - items - container"
  )[0];
  var cartItemsNames = cartItemsContainer.getElementsByClassName("item-name");
  for (i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == name) {
      alert("You have already added this item to your cart");
      return;
    }
  }
  var cartItemBoxContent = `
            <span class="fas fa-times close"></span>
            <img src="${image}" alt="item-1" />
            <div class="content">
              <h3>${name}</h3>
              <div class="detail-container">
                <div class="prices">${price}</div>
                <input type="number" class="quantity" min="1" />
              </div>
            </div>
          `;
  cartItemBox.innerHTML = cartItemBoxContent;
  cartItemsContainer.append(cartItemBox);
  cartItemBox
    .getElementsByClassName("close")[0]
    .addEventListener(onclick, removeCartItenm);
  cartItemBox
    .getElementsByClassName("quantity")
    .addEventListener(onclick, quantityChanged);
}
