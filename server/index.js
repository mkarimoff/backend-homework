const express = require("express");
const mongoose = require ("mongoose")
const dotenv = require ("dotenv")
const cors = require ("cors")
const bodyParser = require ("body-parser");
const productRouter = require("./routes/router");
const authRouter = require("./routes/auth.router.js");

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/dev-api/products", productRouter)
app.use("/dev-api/auth", authRouter)

mongoose.connect(process.env.MONGO_URl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDB Connected")
    app.listen(process.env.PORT,()=> console.log("server running on",process.env.PORT))
})