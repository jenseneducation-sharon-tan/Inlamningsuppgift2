let baseURL = "http://localhost:8000";

///////////// Fetch data from product dbase ///////////////////////
const displayProductContainer = document.getElementById("product-list");
fetch(baseURL + "/api/getAllProduct", { method: "GET" })
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data !== undefined) {
      appendProductData(data); //// display data on html product listing page
    }
  });

////////// Check if item is added in the cart. If yes, disable the button and show user "ITEM ADDED" //////////////
const checkItemInCart = () => {
  fetch(baseURL + "/api/getAllProductCart", { method: "GET" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(data => {
        console.log(data.name);
        let itemName = data.name;
        let checkBtn = document.getElementById(itemName);
        console.log(checkBtn);
        checkBtn.classList.remove("add-item");
        checkBtn.classList.add("block");
        checkBtn.disabled = true;
        checkBtn.innerHTML = "ITEM ADDED";
      });
    });
};

//////////// Loop through the object and create a div for each object to nest the properties of p, img and button tags ///////////
const appendProductData = products => {
  for (let i = 0; i < products.length; i++) {
    ////// Parent element /////////
    let div = document.createElement("div");
    div.setAttribute("class", "product");
    displayProductContainer.append(div);
    ////// Child element /////////
    let nameElem = document.createElement("p");
    let priceElem = document.createElement("p");
    let imageElem = document.createElement("img");
    let cartButton = document.createElement("button");
    nameElem.setAttribute("class", "name-product");
    priceElem.setAttribute("class", "price-product");
    imageElem.setAttribute("class", "image-product");
    cartButton.setAttribute("class", "add-item");
    cartButton.setAttribute("id", products[i].name);
    nameElem.innerHTML = products[i].name;
    priceElem.innerHTML = products[i].price;
    imageElem.src = products[i].image;
    cartButton.innerHTML = "TAKE MY MONEY";

    ///////////////Add item to shopping cart //////////////////
    cartButton.addEventListener("click", () => {
      addItemToCart(products[i].name, products[i].price, products[i].image);
    });
    const addItemToCart = () => {
      let name = document.querySelectorAll(".name-product")[i].innerHTML;
      let price = document.querySelectorAll(".price-product")[i].innerHTML;
      let image = document.querySelectorAll(".image-product")[i].src;
      let button = document.querySelectorAll(".add-item")[i].id;
      console.log(name);
      console.log(button);
      fetch(
        baseURL +
          "/api/addToCart?name=" +
          name +
          "&price=" +
          price +
          "&image=" +
          image,
        { method: "POST" }
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          checkItemInCart(data);
        });
    };

    /////////// Wrap properties of name, price, image and button in a div ////////
    div.append(nameElem);
    div.append(priceElem);
    div.append(imageElem);
    div.append(cartButton);
  }
};
window.addEventListener("load", () => {
  console.log("Page is loaded");
  checkItemInCart();
});
