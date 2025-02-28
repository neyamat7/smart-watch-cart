const ringButtons = document.querySelectorAll(".ring-button");
const productImageBaseUrl = "./images/";
// get modal
const modal = document.getElementById("cart-modal");

// click circle button to change the btn border color and the card image
for (const button of ringButtons) {
  button.addEventListener("click", function (event) {
    // click to change circle button color
    for (const circleButton of ringButtons) {
      circleButton.classList.remove("border-purple-600");
      circleButton.classList.add("border-gray-300");
    }
    event.target.classList.remove("border-gray-300");
    event.target.classList.add("border-purple-600");

    // click circle btn to change product image
    const color = event.target.id.replace("-color", ""); // get color name from button
    const productImage = document.getElementById("product-image"); // get product image
    productImage.src = `${productImageBaseUrl}${color}.png`;
  });
}

// select wrist sizes
function selectWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];

  for (let i = 0; i < sizes.length; i++) {
    const button = document.getElementById(`size-${sizes[i]}`);
    button.classList.remove("border-purple-600");
    button.classList.add("border-gray-300");
    if (size === sizes[i]) {
      button.classList.remove("border-gray-300");
      button.classList.add("border-purple-600");
    } else {
      button.classList.remove("border-purple-600");
    }
  }
}

//border-gray-300
// change quantity by clicking operator button
const quantityBtn = document.querySelectorAll(".quantity-button");
const quantity = document.querySelector("#quantity"); // quantity id
let quantityValueInt = parseInt(quantity.innerText); // get initial quantity value

for (const btn of quantityBtn) {
  btn.addEventListener("click", function (event) {
    if (event.target.innerText === "+") {
      quantityValueInt += 1;
      quantity.innerText = quantityValueInt;
    } else {
      if (quantityValueInt === 0) {
        return;
      }
      quantityValueInt += -1;
      quantity.innerText = quantityValueInt;
    }
  });
}

// array of object to store product info
let productsCart = [];
// add to card event handler
let isCheckoutButtonShow = false;
document.getElementById("add-to-cart").addEventListener("click", function () {
  // check if there is any quantity or not
  quantityValueInt > 0 ? (isCheckoutButtonShow = true) : null;

  if (!isCheckoutButtonShow) {
    alert("please add quantity");
    return;
  }
  const checkoutContainer = document.getElementById("checkout-container");
  const cartCount = document.getElementById("cart-count"); // get cart count in checkout button
  const cartCountValueInt = parseInt(cartCount.innerText);
  //  remove "hidden" class to show checkout button
  checkoutContainer.classList.remove("hidden");
  // change cart count value
  cartCount.innerHTML = cartCountValueInt + quantityValueInt;

  // get all value to pass to modal
  const imageColor = document
    .querySelector("button.border-purple-600.w-6")
    .id.split("-")[0];
  const productImage = `${productImageBaseUrl}${imageColor}.png`;
  const title = "Classy Modern Smart Watch";
  const color = imageColor;
  const priceBtn = document.querySelector("button.border-purple-600:not(.w-6)");
  const size = document
    .querySelector("button.border-purple-600:not(.w-6)")
    .id.split("-")[1];
  const quantity = quantityValueInt;
  const price = priceBtn.innerText.split("$")[1];
  const covertedPrice = parseInt(price);
  const ultimatePrice = covertedPrice * quantity;

  if (quantity === 0) {
    alert("please add a quantity");
    return;
  }

  productsCart.push({
    productImage: productImage,
    title: title,
    color: color,
    size: size,
    quantity: quantity,
    price: ultimatePrice,
  });
});

// total producs price
let totalAmount = 0;
// show modal handler
document
  .getElementById("checkout-container")
  .addEventListener("click", function () {
    const cartItems = document.getElementById("cart-items");
    for (const product of productsCart) {
      totalAmount += parseFloat(product.price);
      const row = document.createElement("tr");
      row.classList.add("border-b");
      row.innerHTML = `
          <th>
            <div class="flex items-center gap-2">
              <div class="w-12 h-12 mt-1 mb-1">
                <img class="w-full h-full" src="${product.productImage}" alt="" />
              </div>
              <h2 class="whitespace-nowrap">${product.title}</h2>
            </div>
          </th>
          <th>${product.color}</th>
          <th>${product.size}</th>
          <th>${product.quantity}</th>
          <th>$${product.price}
          </th>
      `;

      cartItems.insertBefore(row, cartItems.firstChild);
    }

    console.log(totalAmount);
    document.getElementById("totol-amount").innerText = totalAmount;
    // remove hidden class to show modal
    modal.classList.remove("hidden");
  });

// continue shopping handler to hide modal and continue shopping
document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    modal.classList.add("hidden");
    productsCart = [];
  });

// checkout handler
document.getElementById("checkout").addEventListener("click", function () {
  alert("redirecting to the payment page");
});
