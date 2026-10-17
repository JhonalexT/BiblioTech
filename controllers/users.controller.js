import Usuario from "../models/authorsModels.js";

export const listUsers = async (req, res, next) => {
    try {

        const users = await Usuario.find().populate("store", "name")

        res.status(200).json({
            ok: true,
            products
        })
    } catch (error) {
        next(error)
    }
}
export const createUsers = async (req, res, next) => {
    try {
        const nuevo = await Usuario.create(req.body)
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

export const getUsersById = async (req, res, next) => {
    try {
        const user = await Usuario.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                ok: false,
                msj: "Usuario no encontrado"
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

export const updateUsers = async (req, res, next) => {
    try {
        const user = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true })
       if(!user){
        res.status(404).json({
            ok: false,
            msj: "Usuario no encontrado"
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

export const deleteUsers = async (req, res, next) => {
    try {
        const user = await Usuario.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({
                ok: false,
                msj: "Usuario no encontrado"
            });
            return;
        }
        res.status(200).json({
            ok: true,
            msj: "Usuario eliminado"
        })
    } catch (error) {
        next(error)
    }
}
