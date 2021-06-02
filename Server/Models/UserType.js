const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

class UserType extends Model {}

UserType.init(
    {
        id_user_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
},
    {
        sequelize,
        modelName: "user_type",
        tableName: "user_type"
    }
);

sequelize.sync().then().catch(error => {
    console.log(error);
});

module.exports = {
UserType
};