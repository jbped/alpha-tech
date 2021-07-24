const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

// CONSTRAINTS FOR Posts MODEL
Users.hasMany(Posts, {
    foreignKey: "author_id"
});
Posts.belongsTo(Users, {
    foreignKey: "author_id"
});


// CONSTRAINTS FOR Comments MODEL
Users.hasMany(Comments, {
    foreignKey:"commenter_id"
});
Posts.hasMany(Comments, {
    foreignKey:"post_id"
});
Comments.belongsTo(Users, {
    foreignKey:"commenter_id"
});
Comments.belongsTo(Posts, {
    foreignKey:"post_id"
});

module.exports = { Users, Posts, Comments }