import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 60 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "El correo no tiene un formato válido"],
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// La contraseña nunca sale en una respuesta
userSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

export default model("User", userSchema);
