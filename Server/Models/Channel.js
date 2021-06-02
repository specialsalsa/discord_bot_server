const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

class Channel extends Model {}

Channel.init(
    {
        id_channel: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
},
    {
        sequelize,
        modelName: "channel",
        tableName: "channel"
    }
);


sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
Channel
};