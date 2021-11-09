const cartContent = fetchCartFromLocalStorage();
console.log(cartContent);

// Récupération du panier dans le localStorage
function fetchCartFromLocalStorage() {
  const convertFromLocalStorage = localStorage.getItem("cart");
  let cart;
  if (convertFromLocalStorage) {
    cart = JSON.parse(convertFromLocalStorage);

    // si le panier n'existe pas, initialisation de celui-ci
  } else {
    cart = [];
  }
  return cart;
}
fetchCartFromLocalStorage();

function displayCart() {
  for (let items of cartContent) {
    const populateCartPage = document.getElementById("cart__items");
    const populateArticle = document.createElement("article");
    const article = populateCartPage.appendChild(populateArticle);
    article.innerHTML = `<div class="cart__item__img">
  <img
    src="${items.image}"
  />
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${items.name}</h2>
    <p>${items.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté :</p>
      <input
        type="number"
        class="itemQuantity"
        name="itemQuantity"
        min="1"
        max="100"
        value="${items.quantity}"
      />
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>`;
  }
}
displayCart();
// function populateCartHtml(product) {}

function updateQty() {
  // Calcul du prix si plusieurs articles
  if (items.quantity > 1) {
    items.price *= items.quantity;
  }
}

// function addSubstractItemQuantity() {}

// function removeItem()

// function clearCart() {}
// Pour clear le panier (reset le localStorage) initialise un tableau vide
