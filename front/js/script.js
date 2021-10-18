// connexion à l'API et récupération des infos produits

// fetch("http://localhost:3000/api/products").then(function (data) {
//   console.log(data);
// });

// fetch("http://localhost:3000/api/products")
//   .then((res) => res.json())
//   .then((data) => console.log(data));
let products = [];

const fetchAllProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      products = promise;
      console.log(products);
    });
};

const productsDisplay = async () => {
  await fetchAllProducts();

  console.log(products[0]);
  console.log(products[1]);
  console.log(products[2]);
  console.log(products[3]);
  console.log(products[4]);
  console.log(products[5]);
  console.log(products[6]);
  console.log(products[7]);
  console.log(products[8]);
};

productsDisplay();
