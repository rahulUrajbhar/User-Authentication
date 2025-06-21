import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    console.log(token);
    
    console.log(token ? "Token Found" : "No Token");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication Failed",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
  next();
};
