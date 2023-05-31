const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
try{
const token = req.header("Authorization");
if(!token)
return res.status(401).json("You need to login in first");
const verified = jwt.verify(token, process.env.JWT_SECRET);
if(!verified)
return res.status(401).json({msg: " authorization denied"});

next();
} catch (err) {
res.status(500).json({ error: err.message });
}
}