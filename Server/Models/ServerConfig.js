const { Model, DataTypes } = require("sequelize");
const sequelize = require("../Database/database");

class ServerConfig extends Model {}

ServerConfig.init(
    {
        server_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        server_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        command_prefix: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "server_config",
        tableName: "server_config"
    }
);

sequelize
    .sync()
    .then()
    .catch(error => {
        console.log(error);
    });

module.exports = {
    ServerConfig
};
