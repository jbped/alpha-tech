postObj = (posts, length) => {
    posts.forEach(post => {
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
        return posts
    })
};

module.exports = { postObj }