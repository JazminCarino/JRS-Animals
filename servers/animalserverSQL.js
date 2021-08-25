const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const saltRounds = 10;
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  host: "localhost",
  user: "root",
  password: 
  database: "animals",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to database");
  }
});

//retrieves all animals
app.get("/api/animals", (req, res) => {
  console.log("getting animals");

  let query = "select * from animals;";

  db.query(query, (err, data, fields) => {
    if (err) {
      res
        .status(500)
        .send({ message: "There was an error retrieving animals" });
    }
    res.send({ animals: data, fields: fields });
  });
});

// // //posts one animal
app.post("/api/animal/", (req, res) => {
  const data = req.body;

  let query =
    "insert into animals (name, latinName, habitat, numLegs, diet, className) \
    values (?,?,?,?,?,?);";

  console.log("\nstarting query");
  db.query(
    query,
    [
      data.name,
      data.latinName,
      data.habitat,
      data.numLegs,
      data.diet,
      data.className,
    ],
    (err, data, fields) => {
      console.log("response from database recieved");
      if (err) {
        console.log("error revieved");
        res
          .status(500)
          .send({ message: "There was an error adding an animal" });
      } else {
        console.log("no error recieved");
        res.send({ animal: data, fields: fields });
      }
    }
  );
  console.log("query complete", "request complete");
});

//deletes an animal by id
app.delete("/api/animal/:id/", (req, res) => {
  //
  var query = "delete from animals where id=? ;";

  db.query(query, [req.params.id], (err, data, fields) => {
    if (err) {
      res
        .status(500)
        .send({ message: "There was an error deleting an animal" });
    } else {
      res.send({ data: data, fields: fields });
    }
  });
});

//updates an animal by id
app.put("/api/animal/update/:id/", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "No update info entered" });
  }

  const id = req.params.id;

  const data = req.body;

  console.log("updating animal");

  let query =
    "UPDATE animals\
      SET name=:name,\
          latinName=:latinName,\
          className=:className,\
          haibtat=:habitat,\
          diet=:diet,\
          numLegs=numLegs;\
      WHERE id=:id;";

  db.query(query, {
    name: data.name,
    latinName: data.latinName,
    habitat: data.habitat,
    numLeg: data.numLeg,
    className: data.className,
    diet: data.diet,
  });
});

//user login
app.post("/api/user/login/", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "No username or password entered" });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  query = "Select * from users where UserName=?;";

  db.query(query, [username], async (error, data, fields) => {
    if (error) {
      res.status(500).send({ error: error, message: "error retrieving data" });
      return;
    } else if (data && data.length == 0) {
      console.log(3);
      res.status(404).send({ message: "User was not found" });
    } else {
      const comparison = await bcrypt.compare(password, data[0].password);

      if (comparison) {
        res.send(data);
      } else {
        res.status(204).send();
      }
    }
  });
});

//create new user
app.post("/api/user/create/", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "No username or password entered" });
    return;
  }
  //take username and password req
  const username = req.body.username;
  const password = req.body.password;
  //encrypt password
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = "INSERT INTO users (UserName, Password) VALUES (?,?);";

  db.query(query, [username, encryptedPassword], (error, data, fields) => {
    if (error) {
      res.status(409).send({ message: "Username already exists" });
      return;
    } else {
      res.send({ data: data, message: "New user created " });
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
