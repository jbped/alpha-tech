const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, Users, Comments } = require("../models");
const assist = require("../utils/assistiveFunctions");

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
            order: [["created_at", "DESC"]],
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
                    posts,
                    sessionInfo: {
                        loggedIn: req.session.loggedIn,
                        user_id: req.session.user_id
                    }
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
        order: [
            [Comments, "created_at", "DESC"]
        ],
        include: [
            {
                model: Users,
                attributes: ["id", "username"]
            }, 
            {
                model: Comments,
                attributes: ["id", "commenter_id", "post_id", "text", "created_at", "updated_at"],
               
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
        const user_id =  req.session.user_id
        assist.onePostObj(post, user_id);
        // console.log(post)
        res.render("singlePost", {
            post,
            sessionInfo: {
                loggedIn: req.session.loggedIn,
                user_id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get("/user/:id/activity/", (req, res) => {
    req.session.cookie.maxAge = 1000*60
    userFindOne(req, res)
    .then(user => {
        if (req.session.user_id === user.id) {
            user.user_match = true
        } else {
            user.user_match = false
        }
        const sessionInfo = {
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        }
        // console.log(user)
        // console.log(sessionInfo)

        res.render("userActivity/userActivity", {
            user,
            sessionInfo
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// router.get("/user/:id/activity/posts", (req, res) => {
//     userFindOne(req, res)
//     .then(user => {
//         // assist.onePostObj(post);
//         res.render("userActivity/userPosts", {
//             user,
//             sessionInfo: {
//                 loggedIn: req.session.loggedIn,
//                 user_id: req.session.user_id
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

router.get("/user/:id/activity/comments", (req, res) => {
    req.session.cookie.maxAge = 1000*60
    userFindOne(req, res)
    .then(user => {
        if (req.session.user_id === user.id) {
            user.user_match = true
        } else {
            user.user_match = false
        }

        const sessionInfo = {
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        }
        // console.log(user)
        // console.log(sessionInfo)

        res.render("userActivity/userComments", {
            user,
            sessionInfo
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