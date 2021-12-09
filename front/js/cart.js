// Initialisation des variables de modif du DOM
const cartContent = fetchCartFromLocalStorage();
const $totalQuantity = document.getElementById("totalQuantity");
const $totalPrice = document.getElementById("totalPrice");
const $firstNameField = document.getElementById("firstName");
const $lastNameField = document.getElementById("lastName");
const $addressField = document.getElementById("address");
const $cityField = document.getElementById("city");
const $emailField = document.getElementById("email");
const namesRegex =
  /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ -]+$/;
const adressRegex =
  /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ 0-9-]+$/;
const cityRegex =
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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

// Fonction Affichage du panier
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

    // Ajout du nom, de la couleur et du prix de l'article
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
    addCartItemContent.appendChild(addTitlePriceDiv);
    createTitle.appendChild(priceParagraph);

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
    settingsQtyDiv.appendChild(inputDiv);
    qtyDiv.appendChild(settingsQtyDiv);
    addCartItemContent.appendChild(qtyDiv);

    // Ajout bouton Supprimer et eventListener onClickDeleteItem
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("cart__item__content__settings__delete");
    const deleteParagraph = document.createElement("p");
    deleteParagraph.classList.add("deleteItem");
    deleteParagraph.innerText = "Supprimer";

    deleteDiv.appendChild(deleteParagraph);
    qtyDiv.appendChild(deleteDiv);
    deleteParagraph.addEventListener("click", onClickDeleteItem);
  }
}

// Fonction de suppression d'un article
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

// function updateTotal() {
//   var newPrice =
// }

// Modifications de la quantité et du prix en fonction
function updateItemQuantity(event) {
  const itemId = event.target.closest("article").getAttribute("data-id");
  const itemColor = event.target.closest("article").getAttribute("data-color");

  let itemKey = cartContent.findIndex(
    (cartItem) => cartItem.id === itemId && cartItem.color === itemColor
  );

  // Gestion de l'erreur en cas de quantité nulle pour un ou plusieurs articles du panier
  if (event.target.value < 0) {
    event.target.value = 1;
    alert("quantité non reconnue (min : 1)");
  }

  cartContent[itemKey].quantity = event.target.value;

  calculateTotalPrice();
  calculateItemsQuantity();
  cartToLocalStorage(cartContent);
}

// Calcul du total des articles
function calculateItemsQuantity() {
  let countItemsQuantity = cartContent.reduce(
    (acc, curr) => acc + parseInt(curr.quantity),
    0
  );

  $totalQuantity.innerText = countItemsQuantity;
}

// Fonction de calcul et de display du total du prix du panier
function calculateTotalPrice() {
  $totalPrice.innerText = cartContent.reduce((acc, item) => {
    return acc + parseInt(item.quantity * item.price);
  }, 0);
}

// Gestion du formulaire pour la commande
// Validation du champs "Prénom"
function validateFirstName() {
  const firstNameEntry = $firstNameField.value.trim();
  const firstNameErrMsg = document.getElementById("firstNameErrorMsg");
  if (firstNameEntry == "") {
    firstNameErrMsg.textContent = "Merci d'entrer votre prénom";
  } else if (!namesRegex.test(firstNameEntry)) {
    firstNameErrMsg.textContent = "Le format du prénom est incorrect";
  } else {
    firstNameErrMsg.innerText = "";
    return firstNameEntry;
  }
}
$firstNameField.addEventListener("change", validateFirstName);

// Validation du champs "Nom"
function validateLastName() {
  const lastNameEntry = $lastNameField.value.trim();
  const lastNameErrMsg = document.getElementById("lastNameErrorMsg");
  if (lastNameEntry == "") {
    lastNameErrMsg.textContent = "Merci d'entrer votre nom de famille";
  } else if (!namesRegex.test(lastNameEntry)) {
    lastNameErrMsg.textContent = "Le format du nom de famille est incorrect";
  } else {
    lastNameErrMsg.textContent = "";
    return lastNameEntry;
  }
}
$lastNameField.addEventListener("change", validateLastName);

// Validation du champs "Adresse"
function validateAddress() {
  const addressEntry = $addressField.value.trim();
  const addressErrMsg = document.getElementById("addressErrorMsg");
  if (addressEntry == "") {
    addressErrMsg.textContent =
      "Veuillez renseigner votre addresse de résidence";
  } else if (!adressRegex.test(addressEntry)) {
    addressErrMsg.textContent = "Le format de l'adresse n'est pas valide";
  } else {
    addressErrMsg.textContent = "";
    return addressEntry;
  }
}
$addressField.addEventListener("change", validateAddress);

// Validation du champs "Ville"
function validateCity() {
  const cityEntry = $cityField.value.trim();
  const cityErrMsg = document.getElementById("cityErrorMsg");
  if (cityEntry == "") {
    cityErrMsg.textContent = "Veuillez renseigner votre Ville de résidence";
  } else if (!cityRegex.test(cityEntry)) {
    cityErrMsg.textContent = "Le format du nom de la Ville est incorrect";
  } else {
    cityErrMsg.textContent = "";
    return cityEntry;
  }
}
$cityField.addEventListener("change", validateCity);

// Validation du champs "E-mail"
function validateEmail() {
  const emailEntry = $emailField.value.trim();
  const emailErrMsg = document.getElementById("emailErrorMsg");
  if (emailEntry == "") {
    emailErrMsg.textContent = "Veuillez renseigner votre addresse e-mail";
  } else if (!emailRegex.test(emailEntry)) {
    emailErrMsg.textContent = "le format de l'adresse e-mail n'est pas valide";
  } else {
    emailErrMsg.textContent = "";
    return emailEntry;
  }
}
$emailField.addEventListener("change", validateEmail);

// Confirmation de la commande
function confirmOrder(contact) {
  if (cartContent === null || cartContent.length === 0) {
    alert("Panier vide");
    return;
  }

  const myBody = JSON.stringify({
    contact,
    products: cartContent.map((product) => product.id),
  });

  const myHeaders = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  const myInit = {
    method: "POST",
    headers: myHeaders,
    mode: `cors`,
    body: myBody,
  };
  fetch("http://localhost:3000/api/products/order", myInit)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (order) {
      window.location.replace(`./confirmation.html?orderId=${order.orderId}`);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Envoi des données du formulaire
function submitOrder(e) {
  e.preventDefault();
  const firstName = validateFirstName();
  const lastName = validateLastName();
  const address = validateAddress();
  const city = validateCity();
  const email = validateEmail();

  // Création de l'objet "contact"
  if (firstName && lastName && address && city && email) {
    const contact = { firstName, lastName, address, city, email };
    confirmOrder(contact);
  } else {
    alert("Formulaire non complété");
  }
}
document.getElementById("order").onclick = submitOrder;

// Appel des fonctions
displayCart();
calculateItemsQuantity();
calculateTotalPrice();
