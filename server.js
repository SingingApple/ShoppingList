const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Mongo Connect
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongo Connected....");
  })
  .catch((err) => console.log(err));

app.use("/api/items", items);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
