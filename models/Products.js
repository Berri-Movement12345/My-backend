const mongoose = require("mongoose");

//create a schema
const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    //image: String,//

}); 



// Create a Model
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;