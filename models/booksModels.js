import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 120 },
    isbn: {
      type: String,
      required: true,
      unique: true,
      match: [/^(\d{10}|\d{13})$/, "El ISBN debe tener solo dígitos (10 o 13)"],
    },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    genre: {
      type: String,
      enum: ["novela", "cuento", "poesia", "ensayo", "tecnologia", "historia", "infantil"],
    },
    year: {
      type: Number,
      validate: {
        validator: (v) => Number.isInteger(v) && v <= new Date().getFullYear(),
        message: "El año debe ser un entero no mayor al año actual",
      },
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1,
      validate: { validator: Number.isInteger, message: "totalCopies debe ser un entero" },
    },
    availableCopies: {
      type: Number,
      min: 0,
      validate: { validator: Number.isInteger, message: "availableCopies debe ser un entero" },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("Book", bookSchema);
