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

// function addItem() {}

// function removeItem() {
//   const deleteItem = document.createElement("deleteItem");
//   const elementAppend = document.getElementsByClassName(
//     "cart__item__content__settings__delete"
//   );
//   elementAppend.appendChild(deleteItem);
//   for (let product in deleteItem) {
//     var buttonDelete = product;
//     buttonDelete.addEventListener("click", function () {
//       console.log("Element Supprimé");
//     });
//   }
// }

// function clearCart() {}

// function populateCartPage() {
//   for (let items in cartContent) {
//     return `<!-- <article class="cart__item" data-id="${items.id}">
//   <div class="cart__item__img">
//     <img
//       src="${items.image}"
//       alt="${items.altTxt}"
//     />
//   </div>
//   <div class="cart__item__content">
//     <div class="cart__item__content__titlePrice">
//       <h2>${items.name}</h2>
//       <p>${items.price}</p>
//     </div>
//     <div class="cart__item__content__settings">
//       <div class="cart__item__content__settings__quantity">
//         <p>Qté :</p>
//         <input
//           type="number"
//           class="itemQuantity"
//           name="itemQuantity"
//           min="1"
//           max="100"
//           value="${items.quantity}"
//         />
//       </div>
//       <div class="cart__item__content__settings__delete">
//         <p class="deleteItem">Supprimer</p>
//       </div>
//     </div>
//   </div>
// </article>`;
//   }
// }

// async function displayCartProducts() {
//   let productsInCart = await fetchCartFromLocalStorage();
//   let templateHtmlForCart = [];
//   console.log(templateHtmlForCart);

//   // Loop sur le tableau des produits
//   productsInCart.forEach((items) => {
//     var productInCartHtml = populateCartPage(items);
//     templateHtmlForCart.push(productInCartHtml);
//   });
//   console.log(templateHtmlForCart);

//   let itemsInCartHtml = document.getElementById("cart__items");
//   itemsInCartHtml.innerHTML = templateHtmlForCart.join(" ");
//   console.log(itemsInCartHtml);
// }
// displayCartProducts();
