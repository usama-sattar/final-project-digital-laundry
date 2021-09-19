const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuidv4 } = require('uuid')

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
router.post("/create-payment",async (req, res) => {
  const { price, } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price*100,
    currency:'usd',
    payment_method_types: ['card'],
  })
    const clientSecret = await paymentIntent.client_secret
    try{
      res.send(clientSecret)
    }
    catch(err){
      res.send(`error: ${err}`)
    }
});

router.post("/order",async (req, res) => {
  const { customerId,name,email,address,contact,cart,total } = req.body;
  const orderRecord = await new Order({
    customerId,name,email,address,contact,cart,total
  })
  const result = orderRecord.save()
  try{
      res.send(result)
  }
  catch(err){
     res.send(`error: ${err}`)
  }
});

router.get("/orders/:id",async (req, res) => {
  const {id} = req.params;
  const ordersRecord = await Order.find({customerId: id})
  try{
      res.send(ordersRecord)
  }
  catch(err){
     res.send(`error: ${err}`)
  }
});


module.exports = router;
