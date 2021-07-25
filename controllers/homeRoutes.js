const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, Users, Comments } = require("../models");
const assist = require("../utils/assistiveFunctions")

router.get("/", (req, res) => {
    Posts.findAll({
        attributes:[
            "id",
            "title",
            "text",
            "author_id",
            "created_at",
            "updated_at",
            [sequelize.literal("(SELECT COUNT(*) FROM comments WHERE posts.id = comments.post_id)"), "comment_count"]
        ],
        include: [
            {
                model: Users,
                attributes: ["id", "username"]
            }
        ]
    })
    .then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        assist.postObj(posts, 500)
        console.log(posts)
        res.render("homepage", {
            posts
            // loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;