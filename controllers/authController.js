const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    console.log("hellosignup");
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //___checking if the email and password is there
    if (!email || !password) {
      throw new Error("Please provide email and pasword");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.passwordCompare(password, user.password))) {
      throw new Error("Please provide valid email or password");
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      throw new Error("Your are not logged in! Please logged in");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const freshUser = await User.findOne({ id: decoded.id });
    console.log(freshUser);
    if (!freshUser) {
      throw new Error("You are not validate.Please login again");
    }
    req.user = freshUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    // _______compare the token_________ //

    try {
      const decoded = await jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);

      // _______checking if the user still exist__________ //
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        throw new AppError("User doesnot exist! Please log in");
      }
      // ______checking if the user change the password after the token was issued____ //

      // if (freshUser.passwordChangeAfter(decoded.iat)) {
      //   return next(new AppError("User recently changed the password", 401));
      // }

      res.locals.user = freshUser;

      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      console.log(roles);
      if (!roles.includes(req.user.role)) {
        throw new Error("You are not authorized");
      }
      next();
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };
};
