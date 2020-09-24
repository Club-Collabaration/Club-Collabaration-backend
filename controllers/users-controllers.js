const Users = require("../models/user");
const bcrypt = require("bcrypt");
const { use } = require("../routes/users-routes");
const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await Users.create({
      name,
      email,
      password,
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().sort({ name: 1 });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).send("the user with email doesn't exist");
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result)
          return res.status(200).send("You have logged in successfully");
        else return res.status(400).send("password doesn't match");
      })
      .catch((err) => {
        return res.status(400).send("bad credintials");
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports.signUp = signUp;
module.exports.userLogin = userLogin;
module.exports.getAllUsers = getAllUsers;
