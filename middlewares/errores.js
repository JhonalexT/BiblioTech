export const notFound = (req, res) => {
  res.status(404).json({ ok: false, msg: `Ruta ${req.originalUrl} no encontrada` });
};

// Express 5 exige los 4 parámetros para reconocer un manejador de errores
export const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, msg: "JSON mal formado" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      ok: false,
      errors: Object.values(err.errors).map((e) => ({ field: e.path, msg: e.message })),
    });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ ok: false, msg: `Valor no válido para ${err.path}` });
  }
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue || {})[0] || "campo";
    return res.status(400).json({ ok: false, msg: `Ya existe un registro con ese ${campo}` });
  }
  console.error(err);
  res.status(500).json({ ok: false, msg: "Error interno del servidor" });
};
