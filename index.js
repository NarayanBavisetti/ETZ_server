const express = require('express')
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send("Hi bhenjo");
})

app.listen(PORT,() => console.log(`PORT running at ${PORT}`))