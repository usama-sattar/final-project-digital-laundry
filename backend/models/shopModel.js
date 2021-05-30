const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
    name: {type: String},
    vendor: {type: mongoose.Schema.Types.ObjectId , ref: 'Vendor'},
    services: [{}]
})

const Shop=mongoose.model('Shop', ShopSchema)
module.exports = Shop