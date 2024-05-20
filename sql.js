import mysql from "mysql2";

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "mm8848au.beget.tech",
  user: "mm8848au_yii",
  password: "Q1qqqqqq",
  database: "mm8848au_yii",
});

export default pool;

