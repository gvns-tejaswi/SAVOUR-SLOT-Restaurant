$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

const cart = [];
const itm_name = [];
const itm_price = [];
var idx = 0;
function addToCart(itemName, price) {
  let existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity++;
    for (var i = 0; i < itm_name.length; i++) {
      if (itm_name[i] == existingItem.name) {
        itm_price[i] *= 2;
        break;
      }
    }
  } else {
    const newItem = {
      name: itemName,
      price: price,
      quantity: 1,
    };
    cart.push(newItem);
    itm_name.push(itemName);
    itm_price.push(price);
    idx++;
  }

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;
  console.log(idx);
  cart.forEach((item) => {
    const itemTotalPrice = item.price * item.quantity;

    const listItem = document.createElement("li");
    const itemDiv = document.createElement("div");

    itemDiv.innerHTML = `${item.name} - &#8377; ${item.price} Qty : `;

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = item.quantity;
    itemDiv.appendChild(quantitySpan);

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.onclick = () => decreaseQuantity(item.name);
    decreaseBtn.classList.add("subtract-btn");
    itemDiv.appendChild(decreaseBtn);

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.onclick = () => increaseQuantity(item.name);
    increaseBtn.classList.add("add-btn");
    itemDiv.appendChild(increaseBtn);

    listItem.appendChild(itemDiv);
    cartList.appendChild(listItem);

    if (item.quantity == 0) {
      itemDiv.innerHTML = "";
    }
    total += itemTotalPrice;
  });

  totalElement.textContent = total;
}

function increaseQuantity(itemName) {
  let existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity++;
    updateCart();
  }
}

function decreaseQuantity(itemName) {
  let existingItem = cart.find((item) => item.name === itemName);
  if (existingItem && existingItem.quantity >= 1) {
    existingItem.quantity--;
    updateCart();
  }
}

function generateOrderNumber() {
  const date = new Date();
  const orderNumber = date.getTime() % 100000;
  document.getElementById("abc").innerHTML += " " + orderNumber;
}

function checkout() {
  if (cart.length == 0) {
    alert("add atleast 1 item to cart");
  } else {
    const s = JSON.stringify(cart);
    localStorage.setItem("obj", s);
    window.location.href = "chkout.html";
  }
}