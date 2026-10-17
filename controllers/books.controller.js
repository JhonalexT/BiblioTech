import Libro from "../models/authorsModels.js";

export const listBooks = async (req, res, next) => {
    try {

        const books = await Libro.find().populate("store", "name")

        res.status(200).json({
            ok: true,
            books
        })
    } catch (error) {
        next(error)
    }
}
export const createBooks = async (req, res, next) => {
    try {
        const nuevo = await Libro.create(req.body)
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

export const getBooksById = async (req, res, next) => {
    try {
        const book = await Libro.findById(req.params.id)
        if (!book) {
            res.status(404).json({
                ok: false,
                msj: "Libro no encontrado"
            })
            return

        }
        res.status(200).json({
            ok: true,
            book
        })
    }catch (error){
        next(error)
    }
}

export const updateBooks = async (req, res, next) => {
    try {
        const book = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true })
       if(!book){
        res.status(404).json({
            ok: false,
            msj: "Libro no encontrado"
        });
        return;
       }
       res.status(200).json({
        ok: true,
        book
       })
    } catch (error) {
        next(error);
    }
}

export const deleteBooks = async (req, res, next) => {
    try {
        const book = await Libro.findByIdAndDelete(req.params.id);
        if (!book) {
            res.status(404).json({
                ok: false,
                msj: "Libro no encontrado"
            });
            return;
        }
        res.status(200).json({
            ok: true,
            msj: "Libro eliminado"
        })
    } catch (error) {
        next(error)
    }
}

export const updateStochBooks = async (req, res, next) => {
    try{
        const book = await Libro.findById(req.params.id);

        if(!book){
            res.status(404).json({
                ok: false,
                msj: "Libro no encontrado"
            })
            return;
        }

        book.stock = req.body.stock;
        await book.save();
        res.status(200).json({
            ok:true,
            book
        })
    } catch (error){
        next(error);
    }
}
