const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const UserModel = require("./User")

class ServerMovement extends Model {}

ServerMovement.init(
    {
        id_server_movement: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        join_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        leave_date: {
            type: DataTypes.DATE
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        }
    },
    {
        sequelize,
        modelName: "server_movement",
        tableName: "server_movement"
    }
);

UserModel.User.hasMany(ServerMovement, {
    foreginKey: {
        name: "id_user",
        allowNull: false
    }
});
ServerMovement.belongsTo(UserModel.User, {
    foreignKey: {
        name: "id_user",
        allowNull: false
    }
});

sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
    ServerMovement
};