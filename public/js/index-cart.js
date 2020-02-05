let baseURL = "http://localhost:8000";

//////////// Fetch data from cart dbase ///////////////////////

const displayCartContainer = document.getElementById("cart-list");

fetch(baseURL + "/api/getAllProductCart", { method: "GET" })
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
    if (data !== undefined) {
      appendCartData(data); ////display data on html cart listing page
    }
  });

////////// Display response from fetch on product listing page /////////
const appendCartData = cart => {
  for (let i = 0; i < cart.length; i++) {
    console.log(displayCartContainer);
    //// Parent element /////
    let div = document.createElement("div");
    div.setAttribute("class", "cart");
    div.setAttribute("id", cart[i].name + "div");
    displayCartContainer.append(div);

    ////// Child element ///////
    let nameElem = document.createElement("p");
    let priceElem = document.createElement("p");
    let imageElem = document.createElement("img");
    let deleteButton = document.createElement("button");

    nameElem.setAttribute("class", "name-cart");
    nameElem.setAttribute("id", cart[i].name);
    priceElem.setAttribute("class", "price-cart");
    priceElem.setAttribute("id", cart[i].price);
    imageElem.setAttribute("class", "image-cart");
    imageElem.setAttribute("id", cart[i].image);
    deleteButton.setAttribute("class", "delete-item");
    deleteButton.setAttribute("type", "submit");

    nameElem.innerHTML = cart[i].name;
    priceElem.innerHTML = cart[i].price;
    imageElem.src = cart[i].image;
    deleteButton.innerHTML = "I REGRET...DELETE";

    const deleteItemCart = () => {
      let name = document.getElementById(cart[i].name).innerHTML;
      let price = document.getElementById(cart[i].price).innerHTML;
      let image = document.getElementById(cart[i].image).src;
      let div = document.querySelector("#" + cart[i].name + "div"); /// set unique div name to make it easier to identify and remove from display

      const url =
        baseURL +
        "/api/deleteProductInCart?name=" +
        name +
        "&price=" +
        price +
        "&image=" +
        image;

      fetch(url, { method: "DELETE" })
        .then(response => {
          return response.json();
        })
        .then(data => {
          div.remove(); /// make the per item disappear from the display as delete button is clicked
        });
    };

    ////// Add event listener to delete button and remove item from shopping cart //////////
    deleteButton.addEventListener("click", e => {
      let name = e.target.parentNode.id;
      console.log(name);
      deleteItemCart();
    });

    /////////// Wrap properties of name, price, image and button in a div ////////

    div.append(nameElem);
    div.append(priceElem);
    div.append(imageElem);
    div.append(deleteButton);
  }
};
