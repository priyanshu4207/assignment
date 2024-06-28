const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User , Course} = require("../db");
const jwtpassword = "12345"
const jwt = require("jsonwebtoken")
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username,
        password
    }).then((resolve) => {
        if (resolve) {
            res.json({ msg: "User exist previously " })
        } else {
            User.create({
                username,
                password
            })
        }
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
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

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then(function (resposne) {
        res.json({
            courses: resposne
        })
    })
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const token = req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1];
    const decoded =  jwt.verify(jwtToken, jwtpassword)
    const username = decoded.username;
    await User.updateOne(
        { username: username },
        { $push : { purchasedCourses: courseId } })

        res.json({message : "done purchasing"})
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1];
    const decoded =  jwt.verify(jwtToken, jwtpassword)
    const username = decoded.username;
    try {
        const user = await User.findOne({ username })
        if (!user.purchasedCourses || user.purchasedCourses.length === 0) {
            console.log("No purchased courses found for the user");
            return res.status(404).json({ message: "No purchased courses found for the user" });
        }
        const courses = await Course.findById(user.purchasedCourses)
        return res.json({ "courses":  courses});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router