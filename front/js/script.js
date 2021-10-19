// connexion à l'API et récupération des infos produits
let products = [];
async function fetchAllProducts() {
  const res = await fetch("http://localhost:3000/api/products/");
  let products = await res.json();
  console.log(products);
}

fetchAllProducts();

// async function getProductById(productId) {
//   const response = await fetch(
//     "http://localhost:3000/api/products/${productId}/"
//   );
//   let product = await response.json();
//   console.log(product);
//   console.log("titre : ", product.name);
// }

// Intégration des Produits sur la page d'accueil
