const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userModel");
// const auth = require("../middleware/auth");

exports.register = async (req, res) => {
  try {
    let { email, password, user_name, cart, role } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User();
    user.email = email;
    user.password = passwordHash;
    user.displayName = user_name;
    user.cart = cart;
    user.role = "admin";
    user.save();
    res.json({ user, confirm: "registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    // res.status(404).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.is_online = true;
    user.save();

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        role: user.role,
        socketID: user.socketID,
        is_online: user.is_online,
      },
    });
    // console.log('userSocket', user)
    res.json("welcome");
  } catch (err) {}

  //   res.json()
};
exports.userList = async (req, res) => {
  try {
    const user = await User.find({});
    // console.log("?X?X?X?X", user);
    const userList = user.map((i) => ({
      id: i._id,
      displayName: i.displayName,
    }));
    res.json({ userList });

    // res.json({ allUsers: [(id: user._id), (displayName: user.displayName)] });
  } catch (err) {}
};

exports.loginData = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    res.json("welcome");
  } catch (err) {}

  //   res.json()
};
