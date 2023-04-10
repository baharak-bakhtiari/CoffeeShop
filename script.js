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

let cartItem = document.querySelector(".cart-container");

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

//Cart working JS

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //Remove Cart items
  var removeItemButtons = document.getElementsByClassName("close");
  for (i = 0; i < removeItemButtons.length; i++) {
    var removeButton = removeItemButtons[i];
    removeButton.addEventListener("click", removeCartItem);
  }

  //add to cart, menu

  var addToCart = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addToCart.length; i++) {
    var addButton = addToCart[i];
    addButton.addEventListener("click", addToCartClicked);
  }

  //add to cart, products

  var addToCart = document.getElementsByClassName("add-product-to-cart");
  for (var i = 0; i < addToCart.length; i++) {
    var addButton = addToCart[i];
    addButton.addEventListener("click", addProductToCartClicked);
  }
}

//add to cart, product

function addProductToCartClicked(event) {
  var button = event.target;
  var productIcons = button.parentElement;
  var cartItem = productIcons.parentElement;
  var priceElement = cartItem.getElementsByClassName("price")[0].innerText;
  var price = parseFloat(priceElement.replace("$", ""));
  var name = cartItem.getElementsByClassName("product-name")[0].innerText;
  var image = cartItem.getElementsByClassName("product-image")[0].src;
  addItemToCart(name, image, price);
  updateTotalPrice();
}

//add to cart, menu

function addToCartClicked(event) {
  var button = event.target;
  var cartItem = button.parentElement;
  var priceElement = cartItem.getElementsByClassName("price")[0].innerText;
  var price = parseFloat(priceElement.replace("$", ""));
  var name = cartItem.getElementsByClassName("item-name")[0].innerText;
  var image = cartItem.getElementsByClassName("item-image")[0].src;
  addItemToCart(name, image, price);
  updateTotalPrice();
}

function addItemToCart(name, image, price) {
  var cartItemBox = document.createElement("div");
  cartItemBox.classList.add("cart-item");
  var cartItemsContainer = document.getElementsByClassName(
    "cart-items-container"
  )[0];
  var cartItemsNames =
    cartItemsContainer.getElementsByClassName("cart-item-name");
  for (i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == name) {
      alert("You have already added this item to your cart!");
      return;
    }
  }
  var cartItemBoxContent = `
            <span class="fas fa-times close"></span>
            <img src="${image}" alt="item-1" class="cart-item-image"/>
            <div class="content">
              <h3 class="cart-item-name">${name}</h3>
              <div class="detail-container">
                <div class="prices">${price}</div>
                <input type="number" class="quantity" value="1" min="1" />
              </div>
            </div>
          `;
  cartItemBox.innerHTML = cartItemBoxContent;
  cartItemsContainer.append(cartItemBox);
  cartItemBox
    .getElementsByClassName("close")[0]
    .addEventListener("click", removeCartItem);
  cartItemBox
    .getElementsByClassName("quantity")[0]
    .addEventListener("change", quantityChanged);
}

//Remove Cart items

function removeCartItem(event) {
  var button = event.target;
  button.parentElement.remove();
  updateTotalPrice();
}

//Update total

function updateTotalPrice() {
  var cartItemsContainer = document.getElementsByClassName(
    "cart-items-container"
  )[0];
  var cartItems = cartItemsContainer.getElementsByClassName("cart-item");
  var total = 0;
  if (cartItems.length == 0) {
    total = 0;
  } else {
    for (i = 0; i < cartItems.length; i++) {
      var cartItem = cartItems[i];
      var priceElement = cartItem.getElementsByClassName("prices")[0];
      var quantityElement = cartItem.getElementsByClassName("quantity")[0];
      var price = parseFloat(priceElement.innerText);
      var quantity = quantityElement.value;
      total = total + quantity * price;
      total = Math.round(total * 100) / 100;
    }
  }
  document.getElementsByClassName("total-price")[0].innerText = total;
}

//Change quantity

var quantityInputs = document.getElementsByClassName("quantity");
for (i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  var input = event.target;
  updateTotalPrice();
}

//Checkout

var checkoutButton = document.getElementsByClassName("checkout-btn")[0];
checkoutButton.addEventListener("click", doCheckout);

function doCheckout(event) {
  var button = event.target;
  var cartContainer = button.parentElement;
  var cartItemsContainer = cartContainer.getElementsByClassName(
    "cart-items-container"
  )[0];

  savePurchaseHistory(cartItemsContainer);

  //empty the cart
  cartItemsContainer.innerHTML = null;
  alert("Your purchase is completed!");
  document.getElementsByClassName("total-price")[0].innerText = 0;

  creatHistoryButton();
}

//History button

function creatHistoryButton() {
  var historyButton = document.createElement("button");
  historyButton.classList.add("history-btn");
  var cartContainer = document.getElementsByClassName("cart-container")[0];
  var historyButtonContent = `
            show purchase</button>
          `;
  historyButton.innerHTML = historyButtonContent;
  cartContainer.append(historyButton);
  checkoutButton.classList.remove("checkout-btn");
  checkoutButton.classList.add("checkout-btn-hidden");
  historyButton.addEventListener("click", function openPurchaseHistory() {
    window.open("purchase-History.html");
  });
}

//save purchase in sessionStorage

function savePurchaseHistory(allItems) {
  const cartData = [];

  var cartItems = allItems.getElementsByClassName("cart-item");
  const cartItemsArray = [...cartItems];
  cartItemsArray.forEach((item) => {
    const name = item.querySelector(".cart-item-name").textContent;
    const price = parseFloat(item.querySelector(".prices").textContent);
    const img = parseInt(item.querySelector(".cart-item-image").src);
    const quantity = parseInt(item.querySelector(".quantity").value);

    const itemData = {
      name: name,
      price: price,
      img: img,
      quantity: quantity,
    };
    cartData.push(itemData);
  });

  sessionStorage.setItem("cartItems", JSON.stringify(cartData));
}
