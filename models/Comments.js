const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init(
    {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        commenter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key:"id"
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "posts",
                key:"id"
            }
        }
    },
    {
        sequelize,
        underscored:true
    }
);

module.exports = Comments;