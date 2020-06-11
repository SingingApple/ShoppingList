const express = require("express");
const router = express.Router();
const auth = require("../../routes/api/middleware/auth");
//Item Model
const Item = require("../../models/Item");
//@route GET api/items
//@desc GET all items
//@access public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => {
      res.json(items);
    });
});

//@route GET api/items/:id
//@desc GET single item
//@access public

router.get("/:id", (req, res) => {
  Item.findById(req.params.id).then((item) => {
    res.json(item);
  });
});
//@route POST api/items
//@desc Create a POST
//@access Public

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items/:id
//@desc delete a POST
//@access Public

router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
