const AuthServices = require("../services/auth.service");
const {validateUser} =  require('../validators/user.validation')

const Auth = new AuthServices();

module.exports.register = async (req, res, next) => {
  try {
    const { error} = validateUser(req.body)
    if(error){
        res.status(403).json({"message" : error.details[0].message})
        next()
      }
    const user = await Auth.signUp(req.body);

    if (user) {
      res.status(201).json({
        success: true,
        user,
      });
      next()
    }

  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
    next()
  }
};

module.exports.login = async (req, res, next) => {
    try {

    const {email, password} = req.body;

    const token = await Auth.login(email, password)

    if (token) {
        res.status(200).json({
          success: true,
          message : "Login Successful",
          token
        });
        next()
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message,
      });
      next()
    }
  };


