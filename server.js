import express from "express";
import empolyeesRouter from "./controllers/ProductsController.js";
import productsRouter from "./controllers/EmpolyeesController.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", empolyeesRouter);
app.use("/", productsRouter);

app.get("/run-product-faker", (req, res) => {
  exec("node ProductFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("ProductFaker.js запущен");
});
app.get("/run-empolyee-faker", (req, res) => {
  exec("node EmpolyeeFaker.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  res.send("EmpolyeeFaker.js запущен");
});

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});
