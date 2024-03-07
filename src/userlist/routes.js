const express = require("express")
const { Router } = require("express");

const userRouter = Router();

const { hashPass, comparePass, } = require("../middleware/auth");

const { signupUser, getAllUsers,login,getOneUser,deleteUser,deleteAllUsers,updateUser } = require("./controller");

userRouter.post("/userlist/signup", hashPass,signupUser);

userRouter.get("/userlist/getAllUsers", getAllUsers);

userRouter.post("/userlist/login",comparePass,login);

userRouter.get("/userlist/getOneUser/:username", getOneUser);

userRouter.get("/userlist/deleteUser", deleteUser,);

userRouter.get("/userlist/deleteAllUsers", deleteAllUsers,);

userRouter.get("/userlist/updateUser", updateUser,);

module.exports = userRouter;