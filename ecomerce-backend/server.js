const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const products = require('./products');

const app = express();
var cart=[];
var favourites=[]
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
        methods:"GET,POST,PUT"
    })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/getProducts",(req,res)=>{
      res.json({
        data:products
      })
})
app.post("/saveCart",(req,res)=>{
    cart= req.body.cart;
    console.log("cart",cart);
    res.json({message:"Cart Saverd"})
})

app.get("/getCart",(req,res)=>{
    res.json({
        cart:cart,
        favourites:favourites
      })
})

app.post("/saveFav",(req,res)=>{
    favourites = req.body.favourites;
    console.log("favs",favourites);
    res.json({message:"Favourites saved"})
})
app.listen(5000,()=>{
    console.log("Server started on port 5000")
})