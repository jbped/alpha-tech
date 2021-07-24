const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");

// GET ALL COMMENTS INCLUDE USER AND POST
router.get("/", (req, res) => {
    Comments.findAll({
        attributes: ["id", "text", "created_at"],
        include: {
            model: Posts,
            attributes: ["id", "title", "created_at"]
        }
    })
    .then(data => {res.json(data)})
    .catch(err => { console.log(err); res.status(500).json(err); })
});

// GET COMMENTS BY ID INCLUDE USER AND POST
router.get("/:id", (req, res) => {
    Comments.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "text", "created_at"],
        include: {
            model: Posts,
            attributes: ["id", "title", "text", "created_at"]
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No comments were found with the provided Comment ID" });
            return;
        }
        res.json(data)
    })
    .catch(err => { console.log(err); res.status(500).json(err); })
});

// CREATE NEW COMMENT INCLUDE USER AND POST
router.post("/", (req, res) => {
    // Obj layout
    // {
    //     text: (STR), "comment body/text here"
    //     post_id: (INT), post id the comment is associated with"
    //     author_id: (INT), "user id that is posting the comment"
    // }

    Comments.create({
        text: req.body.text,
        commenter_id: req.body.commenter_id,
        post_id: req.body.post_id
    })
    .then(data => {res.json(data)})
    .catch(err => { console.log(err); res.status(500).json(err); })
});

// UPDATE COMMENT BY ID INCLUDE USER AND POST
router.put("/:id", (req, res) => {
    // Obj layout
    // {
    //     text: (STR), "comment body/text here"
    // }

    Comments.update(req.body,{
        text: req.body.text,
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No comments were found with the provided Comment ID" });
            return;
        }
        res.json(data)
    })
    .catch(err => { console.log(err); res.status(500).json(err); })
});

// DELETE COMMENT BY ID INCLUDE USER AND POST
router.delete("/:id", (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No comments were found with the provided Comment ID" });
            return;
        }
        res.json(data)
    })
    .catch(err => { console.log(err); res.status(500).json(err); })
});

module.exports = router;