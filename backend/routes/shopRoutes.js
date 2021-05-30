const express = require('express')
const router = express.Router();
const Shop= require('../models/shopModel')


router.get("/",(req,res)=>{
    Shop.find()
    .then(shops=>res.send(shops))
    .catch((err) => console.log(err))
})
router.post("/create", (req,res)=>{
    const shop=  new Shop({
        name: req.body.name,
        vendor: req.body.vendorId,
       services: req.body.services
    })
    shop.save()
    .then((data)=>{console.log('shop created'); res.send(data)})
    .catch((err) => console.log(err))
    }
    // console.log(req.body.services)
    // console.log(req.body.name)
)
router.delete('/delete/:id', (req,res)=>{
    Shop.findByIdAndDelete(req.params.id)
    .then(()=>{res.send("shop deleted")})
    .catch((err)=> console.log(err))
    
})

router.get('/find/:name', (req,res)=>{
    console.log("find called")
    Shop.find({name: req.params.name} )
    .then((item)=> res.send(item))
    .catch((err)=> console.log(err))
    
})
module.exports=router