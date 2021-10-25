// let product = fetch(`http://localhost:3000/api/products/`);
// console.log(product);
// const productUrl = new URLSearchParams(product);
// var productId = productUrl.has("id");
// console.log(productId);

let productUrl = window.location.search;
let urlParams = new URLSearchParams(productUrl);
let productId = urlParams.get("id");
console.log(productId);

// Appel d'un seul produit

async function fetchProductById(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  return response.json();
}

// Insertion dynamique des détails du produit

function createHtmlProductDetails(product) {
  document.getElementsByClassName(
    "item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt= "${product.altTxt}" />`;
  document.getElementById("title").innerText = product.name;
  document.getElementById("description").innerText = product.description;
  document.getElementById("price").innerText = product.price + " ";
  document.getElementById(
    "colors"
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
