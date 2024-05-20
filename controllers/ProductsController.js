import express from "express";
import multer from "multer";
import path from "path";
import Product from "../models/Products.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/products", (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении работодателей:" });
      return;
    }
  
    res.json(products);
  });
});
router.get("/products/:id", (req, res) => {
  Product.getById(req.params.id, (err, product) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении работодателя:" });
      return;
    }
  
    res.json(product);
  });
});
router.post("/products", upload.single("photo"), (req, res) => {
  if (!req.file) {
    console.error("No file received");
    res.status(400).json({ error: "No file received" });
    return;
  }

  let productData = {
    Название: req.body.name,
    Категория: req.body.cat,
    Цена: req.body.price,
    Количество: req.body.kolvo,
    Производитель: req.body.proizv,
    Поставщик: req.body.postv,
    ДатаПоступления: req.body.datap,
    Описание: req.body.desc,
    Фото: req.file.path.replace(/\\/g, "/"),
  };

  Product.add(productData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении работодателя:" });
      return;
    }
    res.json({ message: "Работодатель успешно добавлен" });
  });
});

router.delete("/products/:id", (req, res) => {
  Product.getById(req.params.id, (err, product) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении работодателя:" });
      return;
    }

    Product.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении работодателя:" });
        return;
      }
      res.json({ message: "Работодатель успешно удален" });
    });
  });
});
router.delete("/delete-all-products", (req, res) => {
  Product.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при удалении работодателей:" });
      return;
    }
    res.json({ message: "Все работодатели успешно удалены" });
  });
});

router.put("/products/:id", upload.single("photo"), (req, res) => {
  let productData = {
    Название: req.body.name,
    Категория: req.body.cat,
    Цена: req.body.price,
    Количество: req.body.kolvo,
    Производитель: req.body.proizv,
    Поставщик: req.body.postv,
    ДатаПоступления: req.body.datap,
    Описание: req.body.desc,
  };

  if (req.file) {
    productData.Фото = req.file.path.replace(/\\/g, "/");
  }

  Product.update(req.params.id, productData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении работодателя:" });
      return;
    }
    res.json({ message: "Работодатель успешно обновлен" });
  });
});

export default router;
