let jwt = require("jsonwebtoken")

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.status(403).send({ message: `token not provided` })
  } else {
    //if there’s a token, verify that it’s not expired
    jwt.verify(token, `${process.env.PRIVATEKEY}`, function (err, decoded) {
      console.log(decoded)
      if (err) {
        console.log(err)
        return res.status(403).send({ message: `token expired` })
      } else {
        next()
      }
    })
  }
}
