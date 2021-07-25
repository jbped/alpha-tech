const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, Users, Comments } = require("../models");
const { upsert } = require("../models/Users");
const assist = require("../utils/assistiveFunctions")

router.get("/", (req, res) => {
    Posts.findAll({
        attributes: [
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
        assist.postsObj(posts, 500)
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
});

router.get("/post/:id", (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
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
            }, 
            {
                model: Comments,
                attributes: ["id", "text", "created_at", "updated_at"],
                include: {
                    model: Users,
                    attributes: ["id", "username"]
                }
            }
        ]
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: "No posts were found for the provided ID"});
            return;
        }
        const post = data.get({ plain: true });
        assist.onePostObj(post);
        console.log(post)
        res.render("singlePost", {
            post,
            // loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get("/user/activity/:id", (req, res) => {
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
        if(!data) {
            res.status(404).json({ message: "No users were found with the provided User ID"});
            return;
        }
        const user = data.get({ plain: true });
        // assist.onePostObj(post);
        console.log(user)
        res.render("userActivity", {
            user,
            // loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;