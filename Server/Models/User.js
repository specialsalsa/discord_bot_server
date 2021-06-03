// CREATION OF THE CLASS USER = TABLE USER at the final

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const UserTypeModel = require("../Models/UserType");

class User extends Model {}

// 1st object - fields of the table user
// 2nd object: the options related to the user model
// INITIALIZE User
User.init(
    {
        user_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        discord_user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        kicked: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        }
    }, 
    {
        sequelize,
        modelName: 'user',
        tableName: 'user'
    }
);

UserTypeModel.UserType.hasMany(User, {
    foreignKey: {
        name: "id_user_type",
        allowNull: false
    }
});
User.belongsTo(UserTypeModel.UserType, {
    foreignKey: {
        name: "id_user_type",
        allowNull: false
    }
})

//Synchronize database
sequelize.sync().then().catch(error => {
        console.log(error);
    }
);

module.exports = {
    User
};