const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

// CONSTRAINTS FOR Posts MODEL
Users.hasMany(Posts);
Posts.belongsTo(Users);

// CONSTRAINTS FOR Comments MODEL
Users.hasMany(Comments);
Comments.belongsTo(Users);
Comments.belongsTo(Posts);

module.exports = { Users, Posts, Comments }