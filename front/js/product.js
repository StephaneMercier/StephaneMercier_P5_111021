// Récupération de l'ID du produit à afficher
function getProductIdByUrlParam() {
  let productUrl = window.location.search;
  let urlParams = new URLSearchParams(productUrl);
  let productId = urlParams.get("id");
  if (urlParams.has("id")) {
    id = urlParams.get("id");
    return id;
  }
  return productId;
}

// Appel du produit spécifique
async function fetchProductById(productId) {
  const res = await fetch(`http://localhost:3000/api/products/${productId}`);
  const productRes = await res.json();

  return productRes;
}

// Insertion dynamique des détails du produit
async function populateHtmlProductDetails(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt= "${product.altTxt}" />`;
  document.getElementById("title").innerText = product.name;
  document.getElementById("description").innerText = product.description;
  document.getElementById("price").innerText = product.price + " ";

  // Affichage du nom du produit dans l'onglet de la page
  document.title = `${product.name} | KANAP `;

  // Boucle dans l'array des "colors" et incrémentation des <option></option> de couleurs pour chaque produit
  let selectColor = document.getElementById("colors");
  let colors = product.colors;
  colors.forEach((color) => {
    selectColor.innerHTML += `<option value="${color}">${color}</option>`;
  });
}

// Récupérer la couleur sélectionnée
function colorSelected() {
  let colorChoice = document.getElementById("colors");
  return colorChoice.value;
}

// Récupérer la quantité
function qtyValue() {
  let qty = document.getElementById(`quantity`);
  return qty.value;
}

// Affichage du produit avec ses détails
async function displayProduct(productId) {
  let product = await fetchProductById(productId);
  populateHtmlProductDetails(product);
}

// Fonction Globale
(async () => {
  let productId = getProductIdByUrlParam();
  await displayProduct(productId);
})();

function productToAddToCart() {
  const cart = fetchCartFromLocalStorage();
  const productAdded = {
    name: document.getElementById("title").innerText,
    image: document.querySelector(".item__img").innerHTML,
    id: getProductIdByUrlParam(),
    price: document.getElementById("price").innerText,
    color: colorSelected(),
    quantity: +qtyValue(),
  };
  console.log(productAdded);

  // Alerte en cas de valeur nulle ou excédant 100 pour la quantité
  if (productAdded.quantity < 1 || productAdded.quantity > 100) {
    alert("Quantité Non Valide");
    return;
  }
  // Alerte si couleur non choisie
  if (productAdded.color == "") {
    alert("Veuillez sélectionner une couleur");
    return;
  }

  // Calcul du prix si plusieurs articles
  if (productAdded.quantity > 1) {
    productAdded.price *= productAdded.quantity;
  }

  // Ajout d'un produit même ID même couleur
  let sameId = false;
  for (productDetail of cart) {
    if (
      productDetail.id === productAdded.id &&
      productDetail.color === productAdded.color
    ) {
      productDetail.quantity += productAdded.quantity;
      sameId = true;
    }
  }

  // si différente ID différente couleur
  if (!sameId) {
    cart.push(productAdded);
  }
  cartToLocalStorage(cart);
}

const addToCart = document.getElementById(`addToCart`);
addToCart.addEventListener(`click`, productToAddToCart);
