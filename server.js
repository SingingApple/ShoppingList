const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/default.json");
const items = require("./routes/api/items");
const app = express();
const path = require("path");
const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
//BodyParser Middleware
app.use(express.json());

//DB config
const db = config.mongoURI;

//Mongo Connect
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    createIndexes: true,
  })
  .then(() => {
    console.log("Mongo Connected....");
  })
  .catch((err) => console.log(err));

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

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
