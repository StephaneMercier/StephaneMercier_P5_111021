// let product = fetch(`http://localhost:3000/api/products/`);
// console.log(product);
// const productUrl = new URLSearchParams(product);
// var productId = productUrl.has("id");
// console.log(productId);

// Récupération de l'ID du produit à afficher

let productUrl = window.location.search;
let urlParams = new URLSearchParams(productUrl);
let productId = urlParams.getAll("id");
console.log(productId);

// Appel d'un seul produit

async function fetchProductById(productID) {
  const res = await fetch(`http://localhost:3000/api/products/${productID}`);
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

async function displayProduct(id) {
  let product = await fetchProductById(id);
  console.log(product);
  createHtmlProductDetails(product);
}

(async () => {
  await displayProduct();
})();
