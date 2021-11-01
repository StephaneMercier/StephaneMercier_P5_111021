// Récupération du panier depuis le localStorage

function fetchCartFromLocalStorage() {
  const convertFromLocalStorage = localStorage.getItem("cart");
  let cart;
  if (convertFromLocalStorage) {
    cart = JSON.parse(convertFromLocalStorage);

    // si le panier n'existe pas, initialisation de celui-ci
  } else {
    cart = [];
  }
  return cart;
}

// Envoi du contenu du panier vers le localStorage

function cartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
