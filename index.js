const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const protect = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT =  5000;

mongoose.connect(process.env.MONGODB_URL,{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    // useUnifiedTopology:true
}).then(() => console.log("DB connected successfully")).catch((err) => console.log(err))

console.log("dddddddddddd")
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(require("./routes/authRoutes"))
app.get("/", (req,res) => {
    res.send("Hi bhenjo");
})

app.listen(PORT,() => console.log(`PORT running at ${PORT}`))