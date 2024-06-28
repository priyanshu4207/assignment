const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db")
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    //check if a user with this username already exists

    Admin.create({
        username : username,
        password: password
    })
    .then(function(resolve){
        res.json({
            message : "Admin creates succesfully"
        })
    })
    .catch(function(){
        res.json({
            message : "Admin does not created"
        })
    })

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price =  req.body.price;
    Course.create({
        title,
        description,
        price,
        imageLink
    }).then((response)=>{
        res.json({msg : "Course created succesfully", CourseId : response._id})
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then(function (resposne) {
        res.json({
            courses : resposne
        })
    })
    
});

module.exports = router;