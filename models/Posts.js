const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Posts extends Model {}

Posts.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: "users",
                key:"id"
            }
        }
    },
    {
        sequelize,
        underscored:true
    }
)

module.exports = Posts;