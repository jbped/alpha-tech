const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");

// GET ALL USERS
router.get("/", (req, res) => {
    Users.findAll({

    })
});

// GET USER BY ID
router.get("/:id", (req, res) => {
    Users.findOne({

    })
});

// CREATE NEW USER
router.post("/", (req, res) => {
    Users.create({

    })
});

// UPDATE USER BY ID
router.put("/:id", (req, res) => {
    Users.update({

    })
});

// DELETE USER BY ID
router.delete("/:id", (req, res) => {
    Users.destroy({
        
    })
});

module.exports = router;