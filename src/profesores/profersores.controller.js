import { hash } from "argon2";
import Profesores from "./profesores.model.js"

export const getProfesoresById = async (req, res) => {
    try{
        const { uid } = req.params;
        const profesores = await Profesores.findById(uid)

        if(!profesores){
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            profesores
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener al profesor",
            error: err.message
        })
    }
}

export const getProfesores = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, profesores ] = await Promise.all([
            Profesores.countDocuments(query),
            Profesores.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            profesores
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener al profesor0",
            error: err.message
        })
    }
}

export const deleteProfesores = async (req, res) => {
    try{
        const { uid } = req.params

        const profresores = await Profesores.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            profesores
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const profesores = await Profesores.findById(uid)

        const matchOldAndNewPassword = await verify(profesores.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Profesores.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateProfesores = async (req, res) => {
    try{
        const { uid } = req.params;
        const  data  = req.body;

        const profesores = await Profesores.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profesor Actualizado',
            profesores,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar al profesor',
            error: err.message
        })
    }
}