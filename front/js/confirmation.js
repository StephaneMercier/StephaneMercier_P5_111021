const $orderId = document.getElementById("orderId");

// Récupération de l'Id du numéro de commande
function getProductIdByUrlParam() {
  let productUrl = window.location.search;
  let urlParams = new URLSearchParams(productUrl);
  let productId = urlParams.get("orderId");
  if (urlParams.has("orderId")) {
    return productId;
  } else {
    console.error("L'ID du produit est introuvable");
    window.location.replace("./index.html");
  }
}

// Affichage du numéro de commande et message de remerciement
$orderId.textContent = getProductIdByUrlParam();
$orderId.style.color = "#3498db";
const message = document.createElement("p");
message.textContent = " Merci pour votre Achat !";
$orderId.appendChild(message);

// Effacer le localStorage pour ne pas stocker les données sensibles
localStorage.clear();
