// let product = fetch(`http://localhost:3000/api/products/`);
// console.log(product);
// const productUrl = new URLSearchParams(product);
// var productId = productUrl.has("id");
// console.log(productId);

// Récupération de l'ID du produit à afficher

let productUrl = window.location.search;
let urlParams = new URLSearchParams(productUrl);
let productId = urlParams.get("id");
console.log(productId);

// Appel du produit spécifique

async function fetchProductById(productId) {
  const res = await fetch(`http://localhost:3000/api/products/${productId}`);
  const productRes = await res.json();
  return productRes;
}

// Insertion dynamique des détails du produit

function createHtmlProductDetails(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt= "${product.altTxt}" />`;
  document.getElementById("title").innerText = product.name;
  document.getElementById("description").innerText = product.description;
  document.getElementById("price").innerText = product.price + " ";
  document.querySelector(
    "#colors"
  ).innerHTML = `<option value="${product.colors}"></option>`;
}

// Affichage du produit avec ses détails

async function displayProduct() {
  let product = await fetchProductById(productId);
  console.log(product);
  createHtmlProductDetails(product);
}

(async () => {
  await displayProduct();
})();
