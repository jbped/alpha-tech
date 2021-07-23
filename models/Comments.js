const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init(
    {
        text: {
            types: DataTypes.TEXT,
            allowNull: false
        },
        commenter_id: {
            types: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key:"id"
            }
        },
        post_id: {
            types: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "posts",
                key:"id"
            }
        }
    }
);

module.exports = Comments;