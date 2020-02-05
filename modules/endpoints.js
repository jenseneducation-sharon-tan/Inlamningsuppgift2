const database = require("./database-operations");

module.exports = app => {
  //// Adding products in eshop.json dbase ////
  app.post("/api/addProduct", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const image = request.query.image;

    let message = {
      success: true,
      message: "Product added"
    };

    const res = database.insertPropertiesAllProduct(name, price, image);
    message.data = res[res.length - 1];
    response.send(message);
  });

  //// Create end point to retrieve all the products in the product dbase ///////
  app.get("/api/getAllProduct", async (request, response) => {
    const data = database.getAllProduct();
    response.send(data);
  });

  //// Create end point to add each product in the cart ///////
  app.post("/api/addToCart", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const image = request.query.image;

    let message = {
      success: true,
      message: "Item added"
    };

    //// Conditions - if item exist in cart, don't add.  if item not in product list, cannot add /////

    const checkItemInCart = database.checkAddedItemInCart(name, price, image);
    const checkItemInProduct = database.checkExistingItemInProduct(
      name,
      price,
      image
    );

    if (checkItemInCart) {
      console.log(checkItemInCart);
      const errCart = {
        error: "ERROR",
        message: "The item is already in the cart"
      };
      response.send(errCart);
    } else if (!checkItemInProduct) {
      const errProduct = {
        error: "ERROR",
        message: "Item does not exist"
      };
      response.send(errProduct);
    } else {
      const res = database.insertPropertiesCart(name, price, image);
      message.data = res[res.length - 1];
      response.send(message);
    }
  });

  //// Create end point to retrieve all the products in the cart ///////
  app.get("/api/getAllProductCart", async (request, response) => {
    const data = database.getAllProductCart();
    console.log(data);
    response.send(data);
  });

  //// Create end point to delete each product in the cart ///////
  app.delete("/api/deleteProductInCart", async (request, response) => {
    console.log(request.url);
    const name = request.query.name;
    const price = request.query.price;
    const image = request.query.image;

    //// Check if the item exist in the cart ////////

    let message = {
      success: true,
      message: "Item is deleted"
    };

    const checkInCart = database.inCart(name, price, image);

    if (checkInCart) {
      const res = database.deleteProductInCart(name, price, image);
      message.data = res[0];
      response.send(message);
    } else {
      const errorMessage = {
        error: "Message",
        message: "Item does not exist in the cart"
      };
      response.send(errorMessage);
    }
  });
};
