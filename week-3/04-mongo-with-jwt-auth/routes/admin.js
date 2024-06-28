const { Router, response } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken")
const router = Router();

const jwtpassword = "12345"

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({
        username,
        password
    }).then((resolve) => {
        if (resolve) {
            res.json({ msg: "User exist previously " })
        } else {
            Admin.create({
                username,
                password
            })
        }
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({
        username,
        password
    }).then((resolve) => {
        if (resolve) {
            var token = jwt.sign({ username, password }, jwtpassword)
            res.json(token)
        } else {
            res.send(404).json({ msg: "user does not exist" })
        }
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const imageLink = req.body.imageLink;
    const description = req.body.description;
    const price = req.body.price

    const existingCourse = await Course.findOne({ title, description, price, imageLink })
       
    if(existingCourse){
        res.json({msg : "Course existed before with same features " , CourseId : existingCourse._id })
    }
    else{Course.create({
        title,
        price,
        description,
        imageLink
    }).then(response=>{
        res.json({msg : "Course created with id is " , CourseId : response._id})
    })}

        
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then(function (resposne) {
        res.json({
            courses: resposne
        })
    })
});

module.exports = router;