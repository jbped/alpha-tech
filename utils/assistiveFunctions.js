postManipulation = (post, length) => {
    if (!length) {
        post.textLimit = null;
    } else {
        post.textLimit = length
    }
    if (post.created_at < post.updated_at) {
        post.edited = true
    } else {
        post.edited = false
    }
    return post
}

postsObj = (posts, length) => {
    posts.forEach(post => {
        postManipulation(post, length)
    })
    console.log(posts)
    return posts
};
onePostObj = (post, length) => {
    postManipulation(post, length)
    return post
};

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/")
    } else {
        next();
    }
}

module.exports = { postsObj, onePostObj, withAuth }