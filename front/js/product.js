const productUrl = window.location.search;
const urlParams = new URLSearchParams(productUrl);

const productId = urlParams.get("id");
console.log(productId);

async function fetchProductById(_id) {
  let response = await fetch(`http://localhost:3000/api/products/${_id}`);
  return response.json();
}
