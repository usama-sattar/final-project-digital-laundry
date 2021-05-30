const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");

router.get("/total", (req, res) => {
  Customer.find()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});
router.delete("/delete/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("user deleted");
    })
    .catch((err) => console.log(err));
});
router.get("/current/:id", (req, res) => {
  console.log(req.params.id);
  Customer.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});
router.post("/update/:id", (req, res) => {
  Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
});

module.exports = router;
