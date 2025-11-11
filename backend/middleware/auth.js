// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access token required' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//    req.user = {
//       id: decoded.id || decoded._id,
//       _id: decoded.id || decoded._id,
//       email: decoded.email,
//       role: decoded.role,
//     };
//     next();
//   });
// };

// const requireAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access required' });
//   }
//   next();
// };

// module.exports = { authenticateToken, requireAdmin };

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  // DEBUG: log decoded token so we can verify the payload
  // console.log('Decoded token:', decoded);

  // Basic validation: ensure id exists
  if (!decoded || (!decoded.id && !decoded._id)) {
    return res.status(403).json({ message: 'Invalid token payload' });
  }

  // Normalize into req.user (so routes can use req.user.id)
  req.user = {
    id: decoded.id || decoded._id,
    _id: decoded.id || decoded._id,
    email: decoded.email,
    role: decoded.role,
  };

  next();
});

};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { authenticateToken, requireAdmin };
