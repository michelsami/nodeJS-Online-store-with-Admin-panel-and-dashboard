export const checkRoles = (role) => (req, res, next) => {
    if (!req.user.user[0])
      return res
        .status(403)
        .json({ status: "error", message: "Unautharized" });
  
    if (!(req.user.user[0].roles == role))
      return res.status(403).json({ status: "error", message: "UnAuthorized" });
  
    next();
};
