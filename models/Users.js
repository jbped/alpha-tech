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
        hooks:{
            async beforeCreate(data) {
                newUser.password = await bcyrpt.hash(data.password, saltRounds)
                    return newUser;
            },
            async beforeUpdate(data) {
                updateUser.password = await bcyrpt.hash(data.password, saltRounds)
                    return updateUser;
            }
        },
        sequelize,
    } 
)