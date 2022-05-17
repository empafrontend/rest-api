const express = require("express");
const fs = require("fs");

const foodFile = "./foods.json";

const foods = require(foodFile);

const app = express();

app.use(express.json());

app.get("/foods", (req, res) => {
  return res.json(foods);
});

app.get("/foods/:foodID", (req, res) => {
  let foodID = parseInt(req.params.foodID);
  let food = foods.find((food) => food.id === foodID);

  if (!food) return res.status(404).json("Ingen Food med det ID");

  return res.json(food);
});

app.post("/foods", (req, res) => {
  let foodList = foods;
  let newFood = {
    id: foods.length + 1,
    food: req.body.food,
    taste: req.body.taste,
    price: req.body.price,
  };
  foodList.push(newFood);

  fs.writeFileSync(
    foodFile,
    JSON.stringify(foodList),
    function writeJSON(error) {
      if (error) return console.log(error);
      console.log("eat your food");
    }
  );

  return res.json(newFood);
});

app.put("/foods/:foodID", (req, res) => {
  let foodID = parseInt(req.params.foodID);
  let foundFood = foods.find((food) => food.id === foodID);

  if (!foundFood) return res.status(404).json("no Food with that ID");

  let yummyFood = {
    id: foodID,
    food: req.body.food,
    taste: req.body.taste,
    price: req.body.price,
  };
  let yummyFoods = foods.map((food) => {
    if (food.id === foodID) {
      food = yummyFood;
      return food;
    }
    return food;
  });
  fs.writeFileSync(
    foodFile,
    JSON.stringify(yummyFoods),
    function writeJSON(error) {
      if (error) return console.log(error);
      console.log("eat your food");
    }
  );

  return res.json(yummyFood);
});

app.delete("/foods/:foodID", (req, res) => {
  let foodID = parseInt(req.params.foodID);
  let foundFood = foods.find((food) => food.id === foodID);

  if (!foundFood) return res.status(404).json("No Food with that ID");

  let yummyFood = foods.filter((food) => food.id !== foodID);
  fs.writeFileSync(
    foodFile,
    JSON.stringify(yummyFood),
    function writeJSON(error) {
      if (error) return console.log(error);
      console.log("eat your food");
    }
  );
  return res.json(foundFood);
});

app.listen(3000, () => {
  console.log("Food server på port 3000");
});
