import DataTypes from "sequelize";
import sequelize from "../db/dbConnection.js";
import isEmail from "validator/lib/isEmail.js";

const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timeStamps: true }
);

User.associate = (models) => {
  User.hasMany(models.Message, { onDelete: "CASCADE" });
};

export default User;
