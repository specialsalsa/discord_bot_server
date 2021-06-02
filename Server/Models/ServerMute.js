const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const UserModel = require("./User");

class ServerMute extends Model {}

ServerMute.init(
    {
        id_server_mute: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        date_time: {
            type: DataTypes.DATE
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        }
    },
    {
        sequelize,
        modelName: "server_mute",
        tableName: "server_mute"
    }
);

UserModel.User.hasMany(ServerMute, {
    foreignKey: {
        name: "id_user",
        allowNull: false
    }
});

ServerMute.belongsTo(UserModel.User, {
    foreginKey: {
        name: "id_user",
        allowNull: false
    }
});

sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
    ServerMute
};