const User = require('../models/userModel');

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: 'User already exist' });
    }
    await User.create({ name, email, phone, password });
    res.status(200).json({ message: 'successfully registered' });
  } catch (error) {
    console.log(error);
  }
};

const authUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
  } catch (error) {}
};

module.exports = {
  registerUser,
  authUser,
};
