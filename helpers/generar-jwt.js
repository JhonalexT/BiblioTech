import jwt from "jsonwebtoken";

export const generarJWT = (uid) =>
  jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "4h",
  });
