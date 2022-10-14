const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req, reply, done) => {
  const { token } = req.headers;
  // conso
  console.log(process.env.JWT_SECRET)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      done(new Error('Unauthorized'));
    }

    req.user = {
      username: decoded.username, // pass in the user's info
    };
  });

  done();
};

module.exports = verifyToken