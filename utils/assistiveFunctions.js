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
onePostObj = (post, user_id) => {
    postManipulation(post)
    isAuthor(post, user_id)
    isCommenter(post.Comments, user_id)
    console.log(post)
    return post
};

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/")
    } else {
        next();
    }
}

const isAuthor = (post, user_id) => {
    if (user_id === post.author_id) {
        return post.isAuthor = true;
    } else {
        return post.isAuthor = false;
    }
}

const isCommenter = (comments, user_id) => {
    comments.forEach(comment => {
        if (user_id === comment.commenter_id) {
            return comment.isCommenter = true;
        } else {
            return comment.isCommenter = false;
        }
    })
}

module.exports = { postsObj, onePostObj, withAuth, isAuthor, isCommenter }