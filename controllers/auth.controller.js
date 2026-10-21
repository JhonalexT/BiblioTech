import bcrypt from "bcryptjs";
import User from "../models/usersModels.js";
import { generarJWT } from "../helpers/generar-jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json({ ok: true, data: { user, token: generarJWT(user._id) } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    // Mismo mensaje si el correo no existe o la contraseña es incorrecta 
    const valido = user && user.active && (await bcrypt.compare(password, user.password));
    if (!valido) {
      return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });
    }
    res.status(200).json({ ok: true, data: { user, token: generarJWT(user._id) } });
  } catch (error) {
    next(error);
  }
};

export const me = (req, res) => {
  res.status(200).json({ ok: true, data: req.user });
};
