const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
class Users extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}

Users.init (
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true 
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
               newUserData.password = await bcrypt.hash(newUserData.password, 10); 
                    return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        underscored:true
    } 
)

module.exports = Users