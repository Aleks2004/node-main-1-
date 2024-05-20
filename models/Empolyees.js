import db from "../sql.js";

let Empolyees = {};

Empolyees.getAll = (callback) => {
  db.query("SELECT * FROM Empolyees", callback);
};

Empolyees.add = (empolyeeData, callback) => {
  db.query("INSERT INTO Empolyees SET ?", empolyeeData, callback);
};
Empolyees.update = (id, empolyeeData, callback) => {
  db.query(
    "UPDATE Empolyees SET ? WHERE id = ?",
    [empolyeeData, id],
    callback
  );
};
Empolyees.delete = (id, callback) => {
  db.query("DELETE FROM Empolyees WHERE id = ?", id, callback);
};
Empolyees.getById = (id, callback) => {
  db.query("SELECT * FROM Empolyees WHERE id = ?", id, callback);
};

Empolyees.deleteAll = (callback) => {
  db.query("DELETE FROM Empolyees", callback);
};

export default Empolyees;
