import sequelize from "../db/dbConnection";
import DataTypes from "sequelize";

const Message = sequelize.define(
  "message",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    messageContents: {
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
