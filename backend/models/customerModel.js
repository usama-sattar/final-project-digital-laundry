const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name:{type: String, required: true},
    phone:{type: Number, required: true},
},
{
    timestamps: true
}
)
const Customer=mongoose.model('Customer', CustomerSchema)
module.exports = Customer