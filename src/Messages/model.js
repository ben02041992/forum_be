import sequelize from "../db/dbConnection.js";
import DataTypes from "sequelize";

const Message = sequelize.define(
  "message",
  {
    // id: {
    //   type: DataTypes.STRING,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
      }
    },
    content: {
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
