const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("eshop.json");
const database = lowdb(adapter);

////// Initiating 2 dbase, Product and cart //////////////////////

exports.initiateDatabase = () => {
  const databaseInitiated1 = database.has("product").value();
  const databaseInitiated2 = database.has("cart").value();

  if (!databaseInitiated1) {
    database.defaults({ product: [] }).write();
  }
  if (!databaseInitiated2) {
    database.defaults({ cart: [] }).write();
  }
};

////// Inserting properties (Name, price, image) in the Product dbase /////////

exports.insertPropertiesAllProduct = (name, price, image) => {
  const response = database
    .get("product")
    .push({
      name: name,
      price: price,
      image: image
    })
    .write();

  return response;
};

////// Function to retrieve all data from the Product dbase ////////

exports.getAllProduct = () => {
  return database.get("product").value();
};

///// Inserting properties (name, price, image) in the Cart dbase ////////

exports.insertPropertiesCart = (name, price, image) => {
  const response = database
    .get("cart")
    .push({
      name: name,
      price: price,
      image: image
    })
    .write();

  return response;
};

//// Check for existing item in the cart //////

exports.checkAddedItemInCart = (name, price, image) => {
  const response = database
    .get("cart")
    .find({ name: name, price: price, image: image })
    .value();

  return response;
};

///// Check for exsiting item in the product list //////

exports.checkExistingItemInProduct = (name, price, image) => {
  const response = database
    .get("product")
    .find({ name: name, price: price, image: image })
    .value();

  return response;
};

////// Function to delete a product from the Cart//////

exports.deleteProductInCart = (name, price, image) => {
  const response = database
    .get("cart")
    .remove({ name: name, price: price, image: image })
    .write();

  return response;
};

exports.inCart = (name, price, image) => {
  const response = database
    .get("cart")
    .find({ name: name, price: price, image: image })
    .value();

  return response;
};

////// Function to retrieve all products from the Cart dbase ////////

exports.getAllProductCart = () => {
  return database.get("cart").value();
};
