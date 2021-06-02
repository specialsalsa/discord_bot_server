const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const UserModel = require("./User")

class ServerShare extends Model {}

ServerShare.init(
    {
        id_server_share: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        date_time: {
            type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
},
    {
        sequelize,
        modelName: "server_share",
        tableName: "server_share"
    }
);

UserModel.User.hasMany(ServerShare, {
    foreignKey: {
        name: "id_user",
        allowNull: false
    }
});
ServerShare.belongsTo(UserModel.User, {
    foreignKey: {
        name: "id_user",
        allowNull: false
    }
});


sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
ServerShare
};