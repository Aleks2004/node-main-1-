import express from "express";
import multer from "multer";
import path from "path";
import Empolyee from "../models/Empolyees.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/empolyees");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/empolyees", (req, res) => {
  Empolyee.getAll((err, empolyees) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении заявителей:" });
      return;
    }

    res.json(empolyees);
  });
});
router.get("/empolyees/:id", (req, res) => {
  Empolyee.getById(req.params.id, (err, empolyee) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении заявителя:" });
      return;
    }

    res.json(empolyee);
  });
});
router.post("/empolyees", upload.single("photo"), (req, res) => {
  let empolyeeData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Образование: req.body.education,
    Специальность: req.body.specialty,
    Дата_Рождения: req.body.birth_date,
    Телефон: req.body.phone,
    Email: req.body.email,
    Фото: req.file.path.replace(/\\/g, "/"),
  };

  Empolyee.add(empolyeeData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении заявителя:" });
      return;
    }
    res.json({ message: "Заявитель успешно добавлен" });
  });
});

router.delete("/empolyees/:id", (req, res) => {
  Empolyee.getById(req.params.id, (err, empolyee) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при получении заявителя:" });
      return;
    }

    Empolyee.delete(req.params.id, (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Произошла ошибка при удалении заявителя:" });
        return;
      }
      res.json({ message: "Заявитель успешно удален" });
    });
  });
});
router.delete("/delete-all-empolyees", (req, res) => {
  Empolyee.deleteAll((err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при удалении соискателей:" });
      return;
    }
    res.json({ message: "Все соискатели успешно удалены" });
  });
});
router.put("/empolyees/:id", upload.single("photo"), (req, res) => {
  let empolyeeData = {
    Фамилия: req.body.surname,
    Имя: req.body.name,
    Отчество: req.body.patronymic,
    Образование: req.body.education,
    Специальность: req.body.specialty,
    Дата_Рождения: req.body.birth_date,
    Телефон: req.body.phone,
    Email: req.body.email,
  };

  if (req.file) {
    empolyeeData.Фото = req.file.path.replace(/\\/g, "/");
  }

  Empolyee.update(req.params.id, empolyeeData, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Произошла ошибка при обновлении заявителя:" });
      return;
    }
    res.json({ message: "Заявитель успешно обновлен" });
  });
});

export default router;
