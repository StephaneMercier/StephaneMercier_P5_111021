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

// Fonction globale pour validation du formulaire
function validate(id, pattern, messageError) {
  const $field = document.querySelector(`#${id}`);
  const $errorMsg = document.querySelector(`#${id}ErrorMsg`);
  const fieldValue = $field.value.trim();
  const regex = `/^[${pattern}]+$/`;

  if (fieldValue == "" || !regex.test(fieldValue)) {
    $errorMsg.textContent = messageError;
    return false;
  } else {
    $errorMsg.textContent = "";
    return fieldValue;
  }
}
