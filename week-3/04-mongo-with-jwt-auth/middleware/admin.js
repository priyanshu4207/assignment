const {Admin} = require("../db")
const jwt = require("jsonwebtoken")

jwtpassword = "12345"
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1];
    try{
        const decoded =  jwt.verify(jwtToken, jwtpassword)
        if(decoded.username){
            next()
        }else{
            res.send(404).json({message : "Admin does not exist"})
        }
    }catch(e){
        console.log(e)
    }

}

module.exports = adminMiddleware;