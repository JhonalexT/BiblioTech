import Prestamo from "../models/authorsModels.js";

export const listLoans = async (req, res, next) => {
    try {

        const loans = await Prestamo.find().populate("store", "name")

        res.status(200).json({
            ok: true,
            loans
        })
    } catch (error) {
        next(error)
    }
}
export const createLoans = async (req, res, next) => {
    try {

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);


        const nuevo = await Prestamo.create({
            book: req.body.book,
            user: req.body.user,
            dueDate: dueDate
        })
        console.log(nuevo)

        res.status(200).json({
            ok: true,
            nuevo
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getLoansById = async (req, res, next) => {
    try {
        const loan = await Prestamo.findById(req.params.id)
        if (!loan) {
            res.status(404).json({
                ok: false,
                msj: "Prestamo no encontrado"
            })
            return

        }
        res.status(200).json({
            ok: true,
            product
        })
    } catch (error) {
        next(error)
    }
}

export const updateLoans = async (req, res, next) => {
    try {
        const loan = await Prestamo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!loan) {
            res.status(404).json({
                ok: false,
                msj: "Producto no encontrado"
            });
            return;
        }
        res.status(200).json({
            ok: true,
            product
        })
    } catch (error) {
        next(error);
    }
}

export const deleteLoans = async (req, res, next) => {
    try {
        const loan = await Prestamo.findByIdAndDelete(req.params.id);
        if (!loan) {
            res.status(404).json({
                ok: false,
                msj: "Prestamo no encontrado"
            });
            return;
        }
        res.status(200).json({
            ok: true,
            msj: "Prestamo eliminado"
        })
    } catch (error) {
        next(error)
    }
}

