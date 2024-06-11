const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access ",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      error,
    });
  }
};