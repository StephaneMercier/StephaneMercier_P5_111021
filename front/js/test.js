const itemsSection = document.getElementById("cart__items");
const $articleDom = document.createElement("article");
const $imageDom = document.createElement("div");
const image = document.createElement("img");
const $itemInfoDom = document.createElement("div");
const $itemPriceDom = document.createElement("div");
const createTitle = document.createElement("h2");
const priceParagraph = document.createElement("p");
const $itemQtyDom = document.createElement("div");
const settingsQtyDiv = document.createElement("div");
const qtyParagraph = document.createElement("p");
const inputDiv = document.createElement("input");
const $itemDeleteBtn = document.createElement("div");
const deleteParagraph = document.createElement("p");

function displayCart() {
  for (let items of cartContent) {
    // Création de l'article
    function createArticle($articleDom) {
      $articleDom.classList.add("cart__item");
      $articleDom.setAttribute("data-id", items.id);
      $articleDom.setAttribute("data-color", items.color);
      $articleDom.setAttribute("data-price", items.price);
      itemsSection.appendChild($articleDom);
    }

    // Ajout de l'image
    function createImg($imageDom) {
      $imageDom.classList.add("cart__item__img");
      image.src = items.image;
      image.alt = items.altTxt;
      $imageDom.appendChild(image);
      $articleDom.appendChild($imageDom);
    }

    // Ajout du nom, de la couleur et du prix de l'article
    function addItemInfo($itemInfoDom) {
      $itemInfoDom.classList.add("cart__item__content");
      $articleDom.appendChild($itemInfoDom);
    }

    function addItemPrice($itemPriceDom) {
      $itemPriceDom.classList.add("cart__item__content__titlePrice");
      $articleDom.appendChild($itemPriceDom);

      createTitle.innerHTML = `${items.name} </br> ${items.color}`;
      $itemPriceDom.appendChild(createTitle);

      priceParagraph.innerText = `${items.price} €`;
      $itemInfoDom.appendChild($itemPriceDom);
      createTitle.appendChild(priceParagraph);
    }

    // Ajout de la quantité et de l'input element

    function addItemQty($itemQtyDom) {
      $itemQtyDom.classList.add("cart__item__content__settings");
      $articleDom.appendChild($itemQtyDom);

      settingsQtyDiv.classList.add("cart__item__content__settings__quantity");
      $itemQtyDom.appendChild(settingsQtyDiv);

      qtyParagraph.innerText = `Qté : `;
      settingsQtyDiv.appendChild(qtyParagraph);

      inputDiv.setAttribute("type", "number");
      inputDiv.setAttribute("value", items.quantity);
      inputDiv.name = "itemQuantity";
      inputDiv.min = "1";
      inputDiv.max = "100";
      inputDiv.addEventListener("change", updateItemQuantity);
      settingsQtyDiv.appendChild(inputDiv);
      $itemQtyDom.appendChild(settingsQtyDiv);
      $itemInfoDom.appendChild($itemQtyDom);
    }

    // Ajout bouton Supprimer et eventListener onClickDeleteItem

    function setDeleteBtn($itemDeleteBtn) {
      $itemDeleteBtn.classList.add("cart__item__content__settings__delete");

      deleteParagraph.classList.add("deleteItem");
      deleteParagraph.innerText = "Supprimer";

      $itemDeleteBtn.appendChild(deleteParagraph);
      $itemQtyDom.appendChild($itemDeleteBtn);
      deleteParagraph.addEventListener("click", onClickDeleteItem);
    }
    createArticle();
    createImg();
    addItemInfo();
    addItemPrice();
    addItemQty();
    setDeleteBtn();
  }
}
// const fields = [{
//   key : "firstName",
//   regex:  /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ -]+$/,
//   errorMsg: "Il n'est pas valide",
//   required : true,
//   type : "text",
// },
// {
//   key: "lastName",
//   regex: /^[A-Za-záÁàÀâÂäÄãÃåÅæÆçÇéÉèÈêÊëËíÍìÌîÎïÏñÑóÓòÒôÔöÖõÕøØœŒßúÚùÙûÛüÜ -]+$/,
//   errorMsg: "Il n'est pas valide",
//   required : true,
// }];

// con $input = "";
// fields.forEach(function (field) {
//   const $input += `<input type="${field.type}" name="${field.key}" placeholder = "Votre Prénom"`;
// })

// Boucle sur le contenu du panier pour extraire les prix et les multiplier par le nombre total d'articles
// for (let i = 0; i < cartContent.length; i++) {
//   let priceInCart = cartContent[i].price * cartContent[i].quantity;
//   addItemsPrice.push(priceInCart);
//   // console.log(addItemsPrice);
// }

// const reducer = (acc, currValue) => acc + currValue;
// const sumOfPrices = addItemsPrice.reduce(reducer, 0);
// $totalPrice.innerText = sumOfPrices;

// Initialisation de la variable
// let addItemsPrice = [];
