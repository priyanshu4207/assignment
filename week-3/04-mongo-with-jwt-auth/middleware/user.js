
jwtpassword = "12345"
const jwt = require("jsonwebtoken")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    
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


module.exports = userMiddleware;