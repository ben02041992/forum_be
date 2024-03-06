const bcrypt = require("bcrypt");

const User = require("../userlist/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    console.log("req.body.password before hash: ", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); 

    req.body.password = hashedPassword; 
    console.log("req.body.password after hash: ", req.body.password);
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const comparePass = async (req, res, next) => {
  try {

    const user = await User.findOne({ where: { username: req.body.username } });

    const matched = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );

    if (!matched) {
      res.status(401).json({ message: "no!!!!!!!!!!!" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const emailValidation = async (req, res, next) => {
 
  next();
};

const passwordValdation = async (req, res, next) => {
  
  next();
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  emailValidation: emailValidation,
  passwordValdation: passwordValdation,
};