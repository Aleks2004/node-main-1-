import db from "../sql.js";

let Product = {};

Product.getAll = (callback) => {
  db.query("SELECT * FROM Product", callback);
};

Product.add = (productData, callback) => {
  db.query("INSERT INTO Product SET ?", productData, callback);
};
Product.update = (id, productData, callback) => {
  db.query("UPDATE Product SET ? WHERE id = ?", [productData, id], callback);
};
Product.delete = (id, callback) => {
  db.query("DELETE FROM Product WHERE id = ?", id, callback);
};
Product.getById = (id, callback) => {
  db.query("SELECT * FROM Product WHERE id = ?", id, callback);
};

Product.deleteAll = (callback) => {
  db.query("DELETE FROM Product ", callback);
};

export default Product;
