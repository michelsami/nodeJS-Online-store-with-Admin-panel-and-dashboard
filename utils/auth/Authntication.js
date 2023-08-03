import jwt from 'jsonwebtoken'

export const valid_token = (req , res , next) => {
    try {
      const[_ , token] = req.headers.authorization.split(" ");
      const decode = jwt.verify(token , process.env.JWT_PASS)
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({ success : false , meesage : "Unauthenticated"})
    }
}
