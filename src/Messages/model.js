const sequelize = require("../db/dbConnection");

const userModel = (sequelize, { DataTypes }) => {
  const Message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 150],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { timeStamps: true }
  );
  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };
  return User;
};

module.exports = userModel;
