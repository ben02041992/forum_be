import DataTypes from "sequelize";
import sequelize from "../db/dbConnection.js";

const Board = sequelize.define(
  "board",
  {
    // id: {
    //   type: DataTypes.STRING,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    Genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timeStamps: true }
);

export default Board;
