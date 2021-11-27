// connexion à l'API et récupération de tous les produits
async function fetchAllProducts() {
  const res = await fetch("http://localhost:3000/api/products/");
  return res.json();
}

// Création d'un template HTML pour intégration des produits
function createHtmlTemplateForProducts(product) {
  return `<a href="./product.html?id=${product._id}">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}.</p>
  </article>
</a>`;
}

// Fonction Affichage des produits sur la Homepage
async function displayAllProducts() {
  let products = await fetchAllProducts();
  let templateHtml = [];

  // Loop sur le tableau des produits
  products.forEach((product) => {
    var productHtml = createHtmlTemplateForProducts(product);
    templateHtml.push(productHtml);
  });

  let itemsHtml = document.getElementById("items");
  itemsHtml.innerHTML = templateHtml.join(" ");
}

// Fonction globale se lançant elle-même
(async () => {
  await displayAllProducts();
})();
