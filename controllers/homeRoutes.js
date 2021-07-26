const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, Users, Comments } = require("../models");
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
                attributes: ["id", "commenter_id", "text", "created_at", "updated_at"],
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

router.get("/user/:id/activity/", (req, res) => {
    userFindOne(req, res)
    .then(user => {
        // assist.onePostObj(post);
        res.render("userActivity/userActivity", {
            user,
            // loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
router.get("/user/:id/activity/posts", (req, res) => {
    userFindOne(req, res)
    .then(user => {
        // assist.onePostObj(post);
        res.render("userActivity/userPosts", {
            user,
            // loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get("/user/:id/activity/comments", (req, res) => {
    userFindOne(req, res)
    .then(user => {
        res.render("userActivity/userComments", {
            user,
            // loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

function userFindOne(req, res) {
    return new Promise ((resolve, reject) => {
        Users.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Posts,
                    attributes: ["id", "author_id", "title", "text", "created_at", "updated_at", [sequelize.literal("(SELECT COUNT(*) FROM comments WHERE posts.id = comments.post_id)"), "comment_count"]],
                    include: {
                        model: Users,
                        attributes: ["id", "username"]
                    }
                },
                {
                    model: Comments,
                    attributes: ["id", "commenter_id", "text", "post_id", "created_at", "updated_at"],
                    include: [
                    {
                        model: Posts,
                        attributes: ["title"],
                        
                    },
                    {
                        model: Users,
                        attributes: ["id", "username"]
                    }
                    ]
                }
            ]
        })
        .then(data => {
            if(!data) {
                res.status(404).json({ message: "No users were found with the provided User ID"});
                return;
            }
            const user = data.get({ plain: true });
            resolve(user);
        })
    })
}
module.exports = router;