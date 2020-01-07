const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// need to install npm multer --save

// Item Model
const Item = require("../../models/counter");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/data", (req, res) => {
  console.log(req.query.user);
  Item.find({ user: req.query.user }).then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post("/add", (req, res) => {
  console.log("backend");

  const newItem = new Item({
    value: req.body.value,
    product: req.body.product,
    purchaseId: req.body.purchaseId,
    user: req.body.user
  });

  newItem
    .save()
    .then(result => {
      res.status(201).json({
        _id: result._id,
        value: result.value,
        purchaseId: result.purchaseId,
        user: result.user
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route   POST api/items
// @desc    increment
// @access  Private
router.post("/increment/:id", (req, res) => {
  Item.updateMany({ _id: req.body._id }, { $inc: { value: 1 } })
    .then(result => {
      res.status(201).json({
        _id: result._id,
        value: result.value
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route   POST api/items
// @desc    decrement
// @access  Private
router.post("/decrement/:id", (req, res) => {
  console.log("backend");
  Item.updateMany({ _id: req.body._id }, { $inc: { value: -1 } })
    .then(result => {
      res.status(201).json({
        _id: result._id,
        value: result.value
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route   POST api/items
// @desc    reset
// @access  Private
router.post("/reset", (req, res) => {
  console.log("backend");
  Item.updateMany({}, { $set: { value: 0 } }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete("/delete/:id", (req, res) => {
  console.log("delete");
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
