const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");

// GET ALL POSTS INCLUDE USER AND COMMENTS
router.get("/", (req, res) => {
    Posts.findAll({

    })
});

// GET POSTS BY ID INCLUDE USER AND COMMENTS
router.get("/:id", (req, res) => {
    Posts.findOne({

    })
});

// CREATE NEW POST INCLUDE USER AND COMMENTS
router.post("/", (req, res) => {
    Posts.create({

    })
});

// UPDATE POST BY ID INCLUDE USER AND COMMENTS
router.put("/:id", (req, res) => {
    Posts.update({

    })
});

// DELETE POST BY ID INCLUDE USER AND COMMENTS
router.delete("/:id", (req, res) => {
    Posts.delete({
        
    })
});

module.exports = router;