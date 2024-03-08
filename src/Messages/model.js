import sequelize from "../db/dbConnection.js";
import DataTypes from "sequelize";

const Message = sequelize.define(
  "message",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    Contents: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timeStamps: true }
);

export default Message;
