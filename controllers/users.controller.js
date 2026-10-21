import User from "../models/usersModels.js";

export const listUsers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    const [total, data] = await Promise.all([
      User.countDocuments(),
      User.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.status(200).json({ ok: true, total, page, limit, totalPages: Math.ceil(total / limit), data });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { returnDocument: "after", runValidators: true }
    );
    if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
};
