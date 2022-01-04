const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('./userModel');
// const auth = require("../middleware/auth");

exports.register = async (req, res) => {
    try {
        let { email, password, displayName,cart,role } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User()
        user.email = email
        user.password = passwordHash
        user.displayName = displayName
        user.cart = cart
        user.role = 'basic'
        user.save()
        res.json({ user,
            confirm:'registered' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

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
    res.json({
        token,
        user: {
            id: user._id,
            displayName: user.displayName,
            role: user.role
        },
       
    });

    res.json('welcome')
} catch (err) {
    
}

    //   res.json()
}

