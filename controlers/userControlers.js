const User = require('../models/userModel');
const genarateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: 'User already exist' });
    }
    const user = await User.create({ name, email, phone, password });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genarateToken(user._id),
    });
  } catch (error) {
    res.json({ error: error });
    console.log(error);
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = genarateToken(user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });

      //storing jwt token on cookie
      res.cookie('jwttoken', token, {
        expiresIn: '30d',
        httpOnly: true,
      });
    } else {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  authUser,
};
