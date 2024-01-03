import jwt from "jsonwebtoken";

const checkToken = (req, res, next, role) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    const ogToken = token.split(" ")[1]; // to remove bearer
    const isvalid = jwt.verify(
      ogToken,
      "awsaddfjfgfhjgeroietnd34#$dfhdfdf90@#d"
    );
    console.log(isvalid);
    if (!role.includes(isvalid.role)) {
      //if (role != isvalid.role) {
      throw Error("You are not authorized");
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export default checkToken;
