// Récupération de l'ID du produit à afficher

function getProductIdByUrlParam() {
  let productUrl = window.location.search;
  let urlParams = new URLSearchParams(productUrl);
  let productId = urlParams.get("id");
  return productId;
}

// Appel du produit spécifique

async function fetchProductById(productId) {
  const res = await fetch(`http://localhost:3000/api/products/${productId}`);
  // console.log(res);
  // console.log(productId);
  const productRes = await res.json();
  // console.log(productRes);

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

  let removeOption = document.querySelector(`option`);
  let selectColor = document.getElementById("colors");
  selectColor.removeChild(removeOption);
  let colors = product.colors;

  // boucle dans le tableau des "colors" et incrémentation des <option></option> pour chaque produit
  colors.forEach((color) => {
    selectColor.innerHTML += `<option value="${color}">${color}</option>`;
  });
}

// Affichage du produit avec ses détails

async function displayProduct(productId) {
  let product = await fetchProductById(productId);
  populateHtmlProductDetails(product);
}

(async () => {
  let productId = getProductIdByUrlParam();
  await displayProduct(productId);
})();
