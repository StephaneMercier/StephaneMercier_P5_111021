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
    const priceParagraph = document.createElement("p");
    priceParagraph.innerText = `${items.price} €`;
    addTitlePriceDiv.appendChild(priceParagraph);

    // Ajout de la quantité et de l'input element
    const qtyDiv = document.createElement("div");
    qtyDiv.classList.add("cart__item__content__settings");
    createArticle.appendChild(qtyDiv);
    const settingsQtyDiv = document.createElement("div");
    settingsQtyDiv.classList.add("cart__item__content__settings__quantity");
    qtyDiv.appendChild(settingsQtyDiv);
    const qtyParagraph = document.createElement("p");
    qtyParagraph.innerText = `Qté : `;
    settingsQtyDiv.appendChild(qtyParagraph);
    const inputDiv = document.createElement("input");
    inputDiv.setAttribute("type", "number");
    inputDiv.setAttribute("value", items.quantity);
    inputDiv.name = "itemQuantity";
    inputDiv.min = "1";
    inputDiv.max = "100";
    inputDiv.addEventListener("change", updateItemQuantity);
    qtyParagraph.appendChild(inputDiv);
    addTitlePriceDiv.appendChild(qtyParagraph);

    // Ajout bouton Supprimer et eventListener onClickDeleteItem
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("cart__item__content__settings__delete");
    createArticle.appendChild(deleteDiv);
    const deleteParagraph = document.createElement("p");
    deleteParagraph.classList.add("deleteItem");
    deleteParagraph.innerText = "Supprimer";
    deleteParagraph.addEventListener("click", onClickDeleteItem);
    deleteDiv.appendChild(deleteParagraph);
    qtyParagraph.appendChild(deleteDiv);
  }
}

function onClickDeleteItem(event) {
  const article = event.target.closest("article");
  const getItemId = article.getAttribute("data-id");
  const getItemColor = article.getAttribute("data-color");
  let cart = fetchCartFromLocalStorage();

  cart = cart.filter(
    (itemToRemoveFromLocalStorage) =>
      !(
        itemToRemoveFromLocalStorage.id === getItemId &&
        itemToRemoveFromLocalStorage.color === getItemColor
      )
  );
  const itemToDelete = document.getElementById("cart__items");
  itemToDelete.removeChild(article);

  cartToLocalStorage(cart);
}

function updateItemQuantity(event) {
  const itemId = event.target.closest("article").getAttribute("data-id");
  const itemColor = event.target.closest("article").getAttribute("data-color");
  const cart = fetchCartFromLocalStorage();
  for (const item of cart) {
    if (item.id === itemId && item.color === itemColor) {
      item.quantity = event.target.value;
    }
  }
  cartToLocalStorage(cart);
  calculateAndDisplayTotalPrice();
  calculateItemsQuantity();
}

function calculateItemsQuantity() {
  let totalQuantity = 0;

  const items = document.querySelectorAll("cart__items");
  for (article of items) {
    const itemQty = Number(
      article.getElementsByClassName("itemQuantity")[0].value
    );
    totalQuantity = totalQuantity + itemQty;
  }
  document.getElementById("totalQuantity").innerText = totalQuantity;
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

// Gestion du formulaire pour la commande

function fillOutForm() {
  const firstNameField = document.getElementById("firstName");

  function validateFirstName() {
    const firstNameEntry = firstNameField.value.trim();
    const setFirstNameRegEx =
      /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    const firstNameErrMsg = document.getElementById("firstNameErrorMsg");
    if (firstNameEntry == " ") {
      firstNameErrMsg.innerText = "Merci d'entrer votre prénom";
    } else if (!setFirstNameRegEx.test(firstNameEntry)) {
      firstNameErrMsg.textContent =
        "Le champ du prénom ne doit pas contenir de caractères spéciaux ni d'espaces";
    } else {
      firstNameErrMsg.innerText = " ";
      return firstNameEntry;
    }
  }
  firstNameField.addEventListener("input", validateFirstName);

  const lastNameField = document.getElementById("lastName");
  function validateLastName() {
    const lastNameEntry = lastNameField.value.trim();
    const setLastNameRegEx =
      /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    const lastNameErrMsg = document.getElementById("lastNameErrorMsg");
    if (lastNameEntry == " ") {
      lastNameErrMsg.innerText = "Merci d'entrer votre nom de famille";
    } else if (!setLastNameRegEx.test(lastNameEntry)) {
      lastNameErrMsg.innerText =
        "Le nom de famille ne doit comporter aucun caractère spécial ni d'espace";
    } else {
      lastNameErrMsg.textContent = " ";
      return lastNameEntry;
    }
  }
  lastNameField.addEventListener("input", validateLastName);

  const addressField = document.getElementById("address");
  function validateAddress() {
    const addressEntry = addressField.value.trim();
    const setAddressRegEx = /([A-Z][a-z]+\s?)+,\s[A-Z]{2}\s\d{5}-?\d{4}?/;
    const addressErrMsg = document.getElementById("addressErrorMsg");
    if (addressEntry == " ") {
      addressErrMsg = "Veuillez renseigner votre addresse de résidence";
    } else if (!setAddressRegEx.test(addressEntry)) {
      addressErrMsg.textContent = "Le format de l'adresse n'est pas valide";
    } else {
      addressErrMsg = " ";
      return addressEntry;
    }
  }
  addressField.addEventListener("input", validateAddress);

  const cityField = document.getElementById("city");
  function validateCity() {
    const cityEntry = cityField.value.trim();
    const setCityRegEx =
      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    const cityErrMsg = document.getElementById("cityErrorMsg");
    if (cityEntry == " ") {
      cityErrMsg = "Veuillez renseigner votre Ville de résidence";
    } else if (!setCityRegEx.test(cityEntry)) {
      cityErrMsg.textContent = "Le nom de la Ville est incorrect";
    } else {
      cityErrMsg == " ";
      console.log(cityErrMsg);
      return cityEntry;
    }
  }
  cityField.addEventListener("input", validateCity);

  const emailField = document.getElementById("email");
  function validateEmail() {
    const emailEntry = emailField.value.trim();
    const setEmailRegEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailErrMsg = document.getElementById("emailErrorMsg");
    if (emailEntry == " ") {
      emailErrMsg = "Veuillez renseigner votre addresse e-mail";
    } else if (!setEmailRegEx.test(emailEntry)) {
      emailErrMsg.textContent =
        "le format de l'adresse e-mail n'est pas valide";
    } else {
      emailErrMsg == " ";
      return emailEntry;
    }
  }
  emailField.addEventListener("input", validateEmail);
}

displayCart();
calculateItemsQuantity();
calculateAndDisplayTotalPrice();
fillOutForm();
