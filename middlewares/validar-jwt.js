import jwt from "jsonwebtoken";
import User from "../models/usersModels.js";

export const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ ok: false, msg: "No hay token en la petición" });
  }

  let uid;
  try {
    ({ uid } = jwt.verify(token, process.env.JWT_SECRET));
  } catch {
    return res.status(401).json({ ok: false, msg: "Token no válido" });
  }

  try {
    const user = await User.findById(uid);
    // R10: un usuario desactivado no puede usar su token
    if (!user || !user.active) {
      return res.status(401).json({ ok: false, msg: "Token no válido" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
