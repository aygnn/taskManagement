import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import auth from './routes/auth.js';
import userRouter from './routes/userRouter.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();


//routes
// http://localhost:6060
// app.use('/',routers)

//auth
app.use("/auth",auth)
//users
app.use('/users',userRouter)


 const PORT = process.env.PORT;
const url = process.env.CONNECTION.replace("<password>", process.env.PASSWORD);
mongoose.set("strictQuery", true);
mongoose.connect(url, (err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log("SERVER WORKING");
    });
  }
});


const Schema = mongoose.Schema;
const imageSchema = new Schema({
  img: { type: String, required: true },
});

const sizeSchema = new Schema({
  label: { type: String, required: true }, // Ölçü adı (örneğin: Small, Medium, Large)
  quantity: { type: Number, default: 0 }, // Ölçüye ait stok miktarı
});

const products = new Schema({
  image1: { type: String, required: true },
  image: [imageSchema], // Birden çok resim için bir dizi
  gender: { type: String, required: true },
  sizes: [sizeSchema], // Birden çok ölçü için bir dizi
  type: { type: String, required: true },
  product_details: { type: String, required: true },
  about: { type: String, required: true },
  color: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Products = mongoose.model("shopping", products);

app.get("/", (req, res) => {
    res.send("Hello");
  });

  //post product

  app.post("/products", (req, res) => {
    const product = new Products({
      image1: req.body.image1,
      image:req.body.image,
      gender: req.body.gender,
      sizes:
         req.body.sizes,
      type: req.body.type,
      product_details:req.body.product_details,
      about: req.body.about,
      color: req.body.color,
      name: req.body.name,
      price: req.body.price,
    });
    product.save();
    res.send({ message: "product added" });
  });

  //get product

app.get("/products", (req, res) => {
  Products.find({}, (err, doc) => {
  if (!err) {
    res.send(doc);
  } else {
    res.status(404).json({ message: err });
  }
});
});

//get by id

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  Products.findById(id, (err, doc) => {
    if (!err) {
      if (doc) {
        res.send(doc);
      } else {
        res.send({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: err });
    }
  });
});

//delete

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  Products.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.send({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: err });
    }
  });
});

//update product

app.put('/products/:id',(req,res)=>{
  const {id}=req.params
  Products.findByIdAndUpdate(id,req.body,(err)=>{
      if(!err){
          res.send({message:'Updated'})
      }
      else{
          console.log(err);
          res.status(404).json({message:err})
      }
  })



})
