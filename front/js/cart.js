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

// function displayCart() {
//   for (let items of cartContent) {
//     const setElement = document.querySelector("#cart__items");
//     const createElement = document.createElement("div");
//     setElement.appendChild(createElement);
//     createElement.innerHTML = `<article class="cart__item" data-id="${items.id}">
//     <div class="cart__item__img">
//       <img
//         src="${items.image}"
//         alt="${items.altTxt}"
//       />
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__titlePrice">
//         <h2>${items.name}</h2>
//         <p>${items.color}</p></br>
//         <p>${items.price} €</p>

//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté :</p>
//           <input
//             type="number"
//             class="itemQuantity"
//             name="itemQuantity"
//             min="1"
//             max="100"
//             value="${items.quantity}"
//           />
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <button type="button" class="deleteItem">Supprimer</button>
//         </div>
//       </div>
//     </div>
//   </article>`;
//   }
// }

function displayCart() {
  for (let items of cartContent) {
    // Création de l'article
    const itemsSection = document.getElementById("cart__items");
    const createArticle = document.createElement("article");
    createArticle.classList.add("cart__item");
    createArticle.setAttribute("data-id", items.id);
    createArticle.setAttribute("data-color", items.color);
    createArticle.setAttribute("data-price", items.price);
    itemsSection.appendChild(createArticle);

    // Ajout de l'image
    const divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    const image = document.createElement("img");
    image.src = items.image;
    image.alt = items.altTxt;
    divImage.appendChild(image);
    createArticle.appendChild(divImage);

    // Ajout du nom et prix de l'article
    const addCartItemContent = document.createElement("div");
    addCartItemContent.classList.add("cart__item__content");
    createArticle.appendChild(addCartItemContent);
    const addTitlePriceDiv = document.createElement("div");
    addTitlePriceDiv.classList.add("cart__item__content__titlePrice");
    createArticle.appendChild(addTitlePriceDiv);
    const createTitle = document.createElement("h2");
    createTitle.innerHTML = `${items.name} </br> ${items.color}`;
    addTitlePriceDiv.appendChild(createTitle);
    const priceP = document.createElement("p");
    priceP.innerText = `${items.price} €`;
    addTitlePriceDiv.appendChild(priceP);

    // Ajout de la quantité
    const qtyDiv = document.createElement("div");
    qtyDiv.classList.add("cart__item__content__settings");
    createArticle.appendChild(qtyDiv);
    const settingsQty = document.createElement("div");
    settingsQty.classList.add("cart__item__content__settings__quantity");
    qtyDiv.appendChild(settingsQty);
    const qtyP = document.createElement("p");
    qtyP.innerText = `Qté : ${items.quantity}`;
    settingsQty.appendChild(qtyP);
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
    let itemToDelete = cartContent[i].id;
    console.log(itemToDelete);
    cartContent = cartContent.filter((el) => el.id !== itemToDelete);
  });
}
// }

// function clearCart() {}
// Pour clear le panier (reset le localStorage) initialise un tableau vide

fetchCartFromLocalStorage();
displayCart();
calculateItemsTotal();
calculateAndDisplayTotalPrice();
