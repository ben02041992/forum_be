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
    game: {

      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

  },
  { timeStamps: true }
);

export default Board;
