import Autor from "../models/authorsModels.js";

export const listAuthors = async (req, res, next) => {
    try {

        const authors = await Autor.find().populate("store", "name")

        res.status(200).json({
            ok: true,
            authors
        })
    } catch (error) {
        next(error)
    }
}
export const createAuthors = async (req, res, next) => {
    try {
        const nuevo = await Autor.create(req.body)
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

export const getAuthorsById = async (req, res, next) => {
    try {
        const author = await Autor.findById(req.params.id)
        if (!author) {
            res.status(404).json({
                ok: false,
                msj: "Autor no encontrado"
            })
            return

        }
        res.status(200).json({
            ok: true,
            product
        })
    }catch (error){
        next(error)
    }
}

export const updateAuthors = async (req, res, next) => {
    try {
        const author = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true })
       if(!author){
        res.status(404).json({
            ok: false,
            msj: "Autor no encontrado"
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

export const deleteAuthors = async (req, res, next) => {
    try {
        const author = await Autor.findByIdAndDelete(req.params.id);
        if (!author) {
            res.status(404).json({
                ok: false,
                msj: "Autor no encontrado"
            });
            return;
        }
        res.status(200).json({
            ok: true,
            msj: "Autor eliminado"
        })
    } catch (error) {
        next(error)
    }
}
