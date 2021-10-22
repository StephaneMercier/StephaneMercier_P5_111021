// Récupération du produit par son ID

async function fetchProductById(id) {
  let result = await fetch("http://http://localhost:3000/api/products/${id}");
  return result.json();
}

// Fonction template pour infos Produit

function populateProductDetails(product) {
  let product = (document.getElementsByClassName("item_img").innerHTML =
    '<img src="${product.imageUrl}" alt="${product.altTxt}" />');
}

(async () => {})();
