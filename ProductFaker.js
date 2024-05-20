import Product from "./models/Products.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const names = [
  "Samsung S90C",
  "LG C3",
  "Sony A80L",
  "Samsung S95D",
  "Hisense U8K",
  "TCL Roku 6-Series",
  "Vizio MQX",
  "Philips OLED+937: ОLED",
  "Panasonic JZ2000",
  "Beko UL32S",
];
const cats = [
  "Разрешение экрана",
  "Размер экрана",
  "Тип панели",
  "Поддержка HDR",
  "Частота обновления",
  "Интерфейсы и подключения",
  "Звуковая система",
  "Умные функции",
  "Дизайн и внешний вид",
  "Энергоэффективность",
];
const prices = [
  "5600",
  "6000",
  "2500",
  "4000",
  "10000",
  "9500",
  "4690",
  "46675",
  "35535",
  "757755",
  "26868",
  "95464",
  "266476",
  "355353",
  "7374784",
];
const kolvos = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
const proisvods = [
  "Samsung",
  "LG",
  "Sony",
  "Panasonic",
  "Philips",
  "TCL",
  "Hisense",
  "Vizio",
  "Sharp",
  "Beko",
];
const postvs = [
  "Media Markt",
  "Eldorado",
  "DNS",
  "M.Video",
  "Citilink",
  "Ozon",
  "Wildberries",
  "Technosila",
  "LABORATORY",
  "Fix Price",
];

const descs = [
  "Смарт-телевизор Samsung 4K: Кинотеатр в вашем доме - Иммерсивный визуальный опыт с четкостью 4К, технологией HDR и разнообразными функциями умного дома.",
  "LG OLED-телевизор: Чёткость изображения на высшем уровне - Превосходное качество изображения с глубокими чёрными оттенками, широким цветовым охватом и низкой задержкой для идеального гейминга.",
  "Сony Bravia Android TV: Развлечения без границ - Встроенный ассистент Google, доступ к тысячам приложений и умному дому, а также непревзойденное качество изображения и звука.",
  "Телевизор Philips Ambilight: Атмосфера кинотеатра в вашей гостиной - Уникальная технология Ambilight, которая расширяет изображение за пределы экрана, создавая увлекательный и неповторимый визуальный опыт.",
  "Панasonic 4K-телевизор: Технология профессионального кинематографа в вашем доме - Профессиональная технология обработки изображения, широкий цветовой охват и поддержка различных форматов HDR для непревзойденного качества изображения.",
  "Телевизор Hisense ULED: Превосходное качество изображения по доступной цене - Ультраяркий дисплей ULED, технология HDR и разнообразные функции умного телевизора, всё это в одном устройстве.",
  "Sharp Aquos 4K-телевизор: Яркость и четкость в вашей гостиной - Яркий и четкий дисплей с технологией HDR, а также умные функции для удобного использования и доступа к развлечениям.",
  "TCL 4K-телевизор с QLED: Кинотеатр в вашем салоне - Квантовый дисплей QLED, технология HDR и умные функции, всё это в одном устройстве по доступной цене.",
  "Vizio P-Series Quantum X: Непревзойденное качество изображения - Квантовый дисплей с яркостью до 3000 нит, технология HDR и низкая задержка для идеального гейминга.",
  "Sceptre 4K-телевизор: Отличное качество изображения по невероятно низкой цене - Ультраяркий дисплей 4K, технология HDR и умные функции, всё это в одном бюджетном устройстве."
];

function getRandomImagePath() {
  const fakerFolder = path.join(__dirname, "public", "img", "faker");
  const imageFiles = fs.readdirSync(fakerFolder);
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const relativePath = path.join("public", "img", "faker", randomImage);
  return relativePath.replace(/\\/g, "/");
}

function getRandomDate() {
  const start = new Date(1950, 0, 1);
  const end = new Date(2023, 11, 31);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return `${randomDate.getFullYear()}-${String(
    randomDate.getMonth() + 1
  ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`;
}

for (let i = 0; i < 100; i++) {
  let productData = {
    Название: names[Math.floor(Math.random() * names.length)],
    Категория: cats[Math.floor(Math.random() * cats.length)],
    Цена: prices[Math.floor(Math.random() * prices.length)],
    Количество:kolvos[Math.floor(Math.random() * kolvos.length)],
    Производитель: proisvods[Math.floor(Math.random() * proisvods.length)],
    Поставщик: postvs[Math.floor(Math.random() * postvs.length)],
    ДатаПоступления: getRandomDate(),
    Описание: descs[Math.floor(Math.random() * descs.length)],
    Фото: getRandomImagePath(),
  };
  Product.add(productData, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
