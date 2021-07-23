const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");

// GET ALL USERS
router.get("/", (req, res) => {
    Users.findAll().then(data = res.json(data)).catch(err => {console.log(err); res.status(500).json(err);})
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
                attributes: ["id", "title", "text", "created_at"]
            },
            {
                model: Comments,
                attributes: ["id", "text", "post_id", "created_at"],
                include: {
                    model: Post,
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
    //  username: "email address"
    //  password: "password" (will be hashed)
    // }

    Users.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {console.log(err); res.status(500).json(err);});
});

// UPDATE USER BY ID
router.put("/:id", (req, res) => {
    // Obj Format
    // {
    //  username: "email address"
    //  password: "password" (will be hashed)
    // }
    
    Users.update({
        username: req.body.username,
        password: req.body.password,
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
router.delete("/:id", (req, res) => {
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

module.exports = router;