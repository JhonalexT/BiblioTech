import { model, Schema } from "mongoose";

const anioActual = () => new Date().getFullYear();

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 80,
    },
    nationality: { type: String, trim: true, minlength: 2, maxlength: 40 },
    birthYear: {
      type: Number,
      min: 0,
      validate: {
        validator: (v) => Number.isInteger(v) && v <= anioActual(),
        message: "birthYear debe ser un entero entre 0 y el año actual",
      },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("Author", authorSchema);
