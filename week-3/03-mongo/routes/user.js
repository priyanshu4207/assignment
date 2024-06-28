const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    }).then(function(resolve){
        res.json({msg : "User has been created succesfully"})
    })

});

router.get('/courses', userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then(function (resposne) {
        res.json({
            courses : resposne
        })
    })
    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers["username"];
    await User.updateOne(
        { username: username },
        { $push : { purchasedcourses: courseId } })

        res.json({message : "done purchasing"})
})


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
 let allCourses=[]
 const user = await User.findOne({
    username : req.headers["username"]
})

 async function main(){


    for (let i = 0; i < user.purchasedcourses.length; i++) {
        const course = user.purchasedcourses[i]
        allCourses.push(course)
     }
    res.json({courses : allCourses}) }

    main()
    // Another way :  
    // const courses = await Course.find({
    //     _id : {
    //         "$in" : user.purchasedcourses 
    //     }
    // })
});

module.exports = router