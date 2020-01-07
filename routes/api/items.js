const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// need to install npm multer --save
const multer = require("multer");
const path = require("path");

// Item Model
const Item = require("../../models/Item");

// get and store file from upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Item.find().then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post("/", upload.single("image"), auth, (req, res) => {
  console.log("backend");
  const newItem = new Item({
    name: req.body.name,
    image: req.file.path
  });

  console.log(newItem);

  newItem
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        name: result.name,
        _id: result._id,
        image: result.image,
        date: result.date,
        request: {
          type: "GET",
          url: `${__dirname}/uploads/` + result.name
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(items => {
      console.log(items);
      res.json(items);
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
