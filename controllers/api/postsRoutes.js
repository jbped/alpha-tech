const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");

// GET ALL POSTS INCLUDE USER AND COMMENTS
router.get("/", (req, res) => {
    Posts.findAll({
        include: [
            {
                model: Users,
                attributes: ["id", "username"]
            },
            {
                model: Comments,
                attributes: ["id", "text", "created_at"],
                include: {
                    model: Users,
                    attributes: ["id", "username"]
                }
            }
        ]
    })
    .then(data => {res.json(data)})
    .catch(err => { console.log(err); res.status(500).json(err); });
});

// GET POSTS BY ID INCLUDE USER AND COMMENTS
router.get("/:id", (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Users,
                attributes: ["id", "username"]
            },
            {
                model: Comments,
                attributes: ["id", "text", "created_at"],
                include: {
                    model: Users,
                    attributes: ["id", "username"]
                }
            }
        ]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No posts were found with the provided Post ID" });
            return;
        }
        res.json(data)
    })
    .catch(err => { console.log(err); res.status(500).json(err); });
});

// CREATE NEW POST INCLUDE USER AND COMMENTS
router.post("/", (req, res) => {
    // Obj layout
    // {
    //     title: {STR}, //post title here//
    //     text: {STR}, //post body/text here//
    //     author_id: {INT} //user id that is posting the comment//
    // }

    Posts.create({
        title: req.body.title,
        text: req.body.text,
        author_id: req.body.author_id
    })
    .then(data => {res.json(data)})
    .catch(err => { console.log(err); res.status(500).json(err); })
});

// UPDATE POST BY ID INCLUDE USER AND COMMENTS
router.put("/:id", (req, res) => {
    // Obj layout
    // {
    //     title: {STR}, //post title here//
    //     text: {STR}, //post body/text here//
    // }
    Posts.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No posts were found with the provided Post ID" });
            return;
        }
        res.json(data)
    })
    .catch(err => { console.log(err); res.status(500).json(err); });
});

// DELETE POST BY ID INCLUDE USER AND COMMENTS
router.delete("/:id", (req, res) => {
    Posts.delete({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "No posts were found with the provided Post ID" });
            return;
        }
        res.json(data)
    })
    .catch(err => { console.log(err); res.status(500).json(err); });
});

module.exports = router;