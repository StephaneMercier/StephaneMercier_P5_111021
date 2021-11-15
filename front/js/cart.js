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

function displayCart() {
  for (let items of cartContent) {
    const setElement = document.querySelector("#cart__items");
    const createElement = document.createElement("div");
    setElement.appendChild(createElement);
    createElement.innerHTML = `<article class="cart__item" data-id="${items.id}">
    <div class="cart__item__img">
      <img
        src="${items.image}"
        alt="${items.altTxt}"
      />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${items.name}</h2>
        <p>${items.color}</p></br>
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
    </div>
  </article>`;
  }
}

// Fonction de calcul et display du total des articles
function calculateItemsTotal() {
  // initialisation de la variable
  let addItemsQuantity = [];

  // Boucle sur le contenu du panier pour extraire les quantités sous forme d'array
  for (let i = 0; i < cartContent.length; i++) {
    let quantityInCart = cartContent[i].quantity;
    addItemsQuantity.push(quantityInCart);
    console.log(addItemsQuantity);
  }

  // Utilisation de reduce() pour calculer le total des articles et l'afficher
  document.getElementById("totalQuantity").innerText =
    addItemsQuantity.reduce(totalQuantity);
  function totalQuantity(total, items) {
    return total + items;
  }
}

// Fonction de calcul et de display du total du prix du panier
function calculateAndDisplayTotalPrice() {
  // Initialisation de la variable
  let addItemsPrice = [];

  // Boucle sur le contenu du panier pour extraire les prix et les multiplier par le nombre total d'articles
  for (let i = 0; i < cartContent.length; i++) {
    let priceInCart = cartContent[i].price * cartContent[i].quantity;
    addItemsPrice.push(priceInCart);
    console.log(addItemsPrice);
  }

  const reducer = (acc, currValue) => acc + currValue;
  const sumOfPrices = addItemsPrice.reduce(reducer, 0);
  document.getElementById("totalPrice").innerText = sumOfPrices;
}

// function selectItemToDelete() {
//   let itemToDelete = [];
//   for (i = 0; i < cartContent.length; i++) {
//     let whichItem = cartContent[i].id;
//     itemToDelete.splice(whichItem);
//     console.log(itemToDelete);
//   }
// }

// function onClickDeleteItem() {
let deleteButton = document.getElementsByClassName("deleteItem");
console.log(deleteButton);
for (i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", (event) => {
    event.preventDefault();
    let itemToDelete = cartContent[i].items.id;
    cartContent = cartContent.filter((el) => el.id !== itemToDelete);
    console.log(cartContent);
  });
}
// }

// function clearCart() {}
// Pour clear le panier (reset le localStorage) initialise un tableau vide

fetchCartFromLocalStorage();
displayCart();
calculateItemsTotal();
calculateAndDisplayTotalPrice();

// const populateArticle = document.createElement("article");
//     const article = populateCartPage.appendChild(populateArticle);
//     article.innerHTML = `<article class="cart__item" data-id="${items.id}">
//     <div class="cart__item__img">
//   <img
//     src="${items.image}"
//   />
// </div>
// <div class="cart__item__content">
//   <div class="cart__item__content__titlePrice">
//     <h2>${items.name}</h2>
//     <p>Couleur: ${items.color}</p>
//     <p>${items.price} €</p>

//   </div>
//   <div class="cart__item__content__settings">
//     <div class="cart__item__content__settings__quantity">
//       <p>Qté :</p>
//       <input
//         type="number"
//         class="itemQuantity"
//         name="itemQuantity"
//         min="1"
//         max="100"
//         value="${items.quantity}"
//       />
//     </div>
//   </div>
// </div></article>`;
//     const getElement = document.getElementById("cart__items");
//     const createTag = document.createElement("div");
//     const appendChild = getElement.appendChild(createTag);
//     appendChild.innerHTML = `<div class="cart__item__content__settings__delete">
//     <p class="deleteItem">Supprimer</p>
//     </div> `;
