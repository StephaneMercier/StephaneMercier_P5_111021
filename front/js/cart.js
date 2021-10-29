function getCart() {
  let items = [];
  if (localStorage.getItem(`panier`) != null) {
    items = JSON.parse(localStorage.getItem(`panier`));
  }
  return items;
}

const cart = [
  // {
  //   productId: "abc123bleu",
  //   name: "Kanap Test 2 Bleu",
  //   image: "http://....",
  //   unitPrice: 2900,
  //   quantity: 2,
  // },
];

function addItem() {}

function removeItem() {}

function updateQty() {}

function clearCart() {}

function getCart() {
  return cart;
}
