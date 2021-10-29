function fetchCartFromLocalStorage() {
  const convertFromLocalStorage = localStorage.getItem("cart");
  let cart;
  if (convertFromLocalStorage) {
    cart = JSON.parse(convertFromLocalStorage);
  } else {
    cart = [];
  }
  return cart;
}

function cartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
