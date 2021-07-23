const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");

// GET ALL COMMENTS INCLUDE USER AND POST
router.get("/", (req, res) => {
    Comments.findAll({

    })
});

// GET COMMENTS BY ID INCLUDE USER AND POST
router.get("/:id", (req, res) => {
   Comments.findOne({

   }) 
});

// CREATE NEW COMMENT INCLUDE USER AND POST
router.post("/", (req, res) => {
    Comments.create({

    })
});

// UPDATE COMMENT BY ID INCLUDE USER AND POST
router.put("/:id", (req, res) => {
    Comments.update({

    })
});

// DELETE COMMENT BY ID INCLUDE USER AND POST
router.delete("/:id", (req, res) => {
    Comments.destroy({
        
    })
});

module.exports = router;