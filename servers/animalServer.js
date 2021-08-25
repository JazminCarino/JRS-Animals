const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = {};

db.mongoose = mongoose;
db.url = 
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!");
    process.exit();
  });

//define schema/model
const Animal = mongoose.model(
  "animal",
  mongoose.Schema({
    name: String,
    className: String,
    numLegs: Number,

    diet: String,
    habitat: String,
    latinName: String,
  })
);

//retrieves all animals
app.get("/api/animals", (req, res) => {
  Animal.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
});

//posts one animal
app.post("/api/animal", (req, res) => {
  if (!req.body.name || !req.body.className) {
    res.status(400).send({
      message: "Animal requires name and class",
    });
    return;
  }

  const animal = new Animal({
    name: req.body.name,
    className: req.body.className,
    numLegs: req.body.numLegs,
    diet: req.body.diet,
    habitat: req.body.habitat,
    latinName: req.body.latinName,
  });

  animal
    .save(animal)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Animal Was Not Saved" });
    });
});

//adds multiple animals
app.post("api/animals/multiple", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request must include a body" });
  } else if (!Array.isArray(req.body)) {
    res.status(400).send({ message: "Must be an Array of Animals" });
  }

  let animals = req.body;

  for (let animal of Animals) {
    if (!animal.name || !animal.className || !animal.numLegs) {
      res.status(400).send({
        message: "Animal must include name, class name, and number of legs",
        badAnimal: animal,
      });
      return;
    }
  }

  Animal.insertMany(req.body)
    .then((data) => {
      res.send({ message: "All animals inserted", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Animals Were Not Saved" });
    });
});

//deletes an animal
app.delete("/api/animal/:id", (req, res) => {
  var name = req.params.id;
  var query = { id: id };

  Animal.findOneAndRemove(query)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No Animal Found With Name " + name });
      }
      res.send({ message: "Animal was deleted" });
    })
    .catch((error) => {
      res.status(500).send({ message: "Could not delete animal" });
    });
});

//updates an animal
app.put("/api/animal/:id", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "No update info entered" });
  }
  const id = req.params.id;

  Animal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Could not update animal with id:" + id });
      } else res.send({ message: "Animal Updated" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating animal with id" + id });
    });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
