const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
const path = require("path");

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

if (process.env.NODE_ENV === "production") {
  //Set Static Folder
  app.use(express.static("/client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
