const express = require("express")
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change to specific origin(s) for production
    res.setHeader('Access-Control-Allow-Methods', 'GET'); // Adjust for allowed methods (GET, POST, etc.)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Adjust for allowed headers
    next();
  });

app.get("/sum" , (req,res)=>{
    const  {a , b} = req.query

    let c = parseInt(a)+parseInt(b)
    res.status(200).send(c.toString())

})

app.listen(3000)