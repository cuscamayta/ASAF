'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var price = new Schema({
    product: productSchema,
    dateProductPrice: Date,
    price: Number
});

var productType = {
    name: String,
    description: String
};


var productSchema = new Schema({
    productId : Objectid,
    name: String,
    description: String,
    Code: string,
    productType: productType
})


module.exports = mongoose.model('Country', productSchema);
