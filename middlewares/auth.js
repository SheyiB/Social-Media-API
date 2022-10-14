const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes
exports.protect = (async (req, res, next) => {
   let token;

   if (
       req.headers.authorization &&
       req.headers.authorization.startsWith('Bearer')
    )  {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(
            res.status(404).json({msg: "Unable to Get token"})
        )
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log('Token is', decoded);

        req.myToken = decoded.id;

        req.user = await User.findById(decoded.id);

        console.log(req.user)


        next();
    } catch (err) {
        return next(res.status(401).json({message: 'Not authorize to access this route'}));
    }
});

