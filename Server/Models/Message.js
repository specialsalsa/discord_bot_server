const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

const UserModel = require("./User");
const ChannelModel = require("./Channel");

class Message extends Model {}

Message.init(
    {
        id_message: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,

    },
    deleted: {
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
        modelName: "message",
        tableName: "message"
    }
);

UserModel.User.hasMany(Message, {
    foreignKey: {
        name: "id_user",
        allowNull: false
    }
});
Message.belongsTo(UserModel.User, {
    foreignKey: {
        name: "id_user",
        allowNull: false
    }
});
ChannelModel.Channel.hasMany(Message, {
    foreignKey: {
        name: "id_channel",
        allowNull: false
    }
});
Message.belongsTo(ChannelModel.Channel, {
    foreignKey: {
        name: "id_channel",
        allowNull: false
    }
});

// UserModel.User.belongsToMany(ChannelModel.Channel, {
//     through: Message,
//     foreignKey: "id_user"
// });

// ChannelModel.Channel.belongsToMany(UserModel.User, {
//     through: Message,
//     foreignKey: "id_channel"
// });


sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
Message
};