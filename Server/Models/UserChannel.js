const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const UserModel = require("./User");
const ChannelModel = require("./Channel");

class UserChannel extends Model {}

UserChannel.init(
    {
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        }
    },
    {
        sequelize,
        modelName: "user_channel",
        tableName: "user_channel"
    }
);

UserModel.User.belongsToMany(ChannelModel.Channel, {
    through: UserChannel,
    foreignKey: "id_user"
});
ChannelModel.Channel.belongsToMany(UserModel.User, {
    through: UserChannel,
    foreignKey: "id_channel"
});


sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
UserChannel
};