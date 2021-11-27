const $orderId = document.getElementById("orderId");
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

  //   return productId;
}
$orderId.textContent = getProductIdByUrlParam();
$orderId.style.color = "#3498db";
localStorage.clear();
