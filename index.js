const express = require("express");
const fs = require("fs");

const foodFile = "./foods.json";

const foods = require(foodFile);

const app = express();

app.get("/foods", (req, res) => {
  return res.send(foods);
});

app.get("/foods/:foodID", (req, res) => {
  let foodID = parseInt(req.params.foodID);
  let food = foods.find((food) => food.id === foodID);

  if (!food) return res.status(404).send("Ingen Food med det ID");

  return res.send(food);
});

app.post("/foods", (req, res) => {
  let foodList = foods;
  let newFood = {
    id: foods.length + 1,
    food: "some nasty school lunch",
    taste: "disgusting",
    price:
      "nothing because in Sweden, school lunch is gratis, and gratis is gott",
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

  return res.send("Food added " + JSON.stringify(newFood));
});

app.put("/foods/:foodID", (req, res) => {
  let foodID = parseInt(req.params.foodID);
  let foundFood = foods.find((food) => food.id === foodID);

  if (!foundFood) return res.status(404).send("no Food with that ID");

  let yummyFood = {
    id: foodID,
    food: "ribeye steak",
    taste: "it's alright, but i wanted it medium rare",
    price: 260,
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

  return res.send(
    "Yummy Food " + foodID + " new snacks " + JSON.stringify(yummyFood)
  );
});

app.delete("/foods/:foodID", (req, res) => {
  let foodID = parseInt(req.params.foodID);
  let foundFood = foods.find((food) => food.id === foodID);

  if (!foundFood) return res.status(404).send("No Food with that ID");

  let yummyFood = foods.filter((food) => food.id !== foodID);
  fs.writeFileSync(
    foodFile,
    JSON.stringify(yummyFood),
    function writeJSON(error) {
      if (error) return console.log(error);
      console.log("eat your food");
    }
  );
  return res.send(
    "Removed ID " + foodID + " new list " + JSON.stringify(yummyFood)
  );
});

app.listen(3000, () => {
  console.log("Food server på port 3000");
});
