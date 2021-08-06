const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");
const { withAuth } = require("../../utils/assistiveFunctions");
// GET ALL USERS
router.get("/", (req, res) => {
    Users.findAll({}).then(data => res.json(data)).catch(err => {console.log(err); res.status(500).json(err);})
});

// GET USER BY ID INCLUDE POSTS AND COMMENTS
router.get("/:id", (req, res) => {
    Users.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Posts,
                attributes: ["id", "title", "text", "created_at", "updated_at"]
            },
            {
                model: Comments,
                attributes: ["id", "text", "post_id", "created_at", "updated_at"],
                include: {
                    model: Posts,
                    attributes: ["title"]
                }
            }
        ]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No users were found with the provided User ID"});
            return; 
        }
        res.json(data)
    })
    .catch(err => {console.log(err); res.status(500).json(err);})
});

// CREATE NEW USER
router.post("/", (req, res) => {
    // Obj Format
    // {
    //  "username": "username",
    //  "email": "email address"
    //  "password": "password" // will be hashed
    // }
    console.log(req.body)
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {console.log(err); res.status(500).json(err);});
});

// UPDATE USER BY ID
router.put("/:id", withAuth, (req, res) => {
    // Obj Format
    // {,
    //  "password": "password" // will be hashed
    // }
    
    Users.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No users were found with the provided User ID"});
            return; 
        }
        res.json(data)
    })
    .catch(err => {console.log(err); res.status(500).json(err);})
});

// DELETE USER BY ID
router.delete("/:id", withAuth, (req, res) => {
    Users.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No users were found with the provided User ID"});
            return; 
        }
        res.json(data)
    })
    .catch(err => {console.log(err); res.status(500).json(err);})
});


// LOGIN VERIFICATION
router.post("/login", (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(400).json({ message: "An account with the provided email was not found."});
            return;
        }
        const verifyPassword = data.checkPassword(req.body.password);
        if (!verifyPassword){
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }

        // DECLARE SESSION VARIABLES
        req.session.save(() => {
                req.session.user_id = data.id,
                req.session.email = data.email;
                req.session.username = data.username;
                req.session.loggedIn = true;

                res.json({ user: data, message: "You are now logged in!"})
        });
    });
});

// LOGOUT OF SESSION
router.post("/logout", withAuth, (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end()
    }
});

module.exports = router;