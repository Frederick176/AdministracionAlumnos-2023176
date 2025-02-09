import { hash } from "argon2";
import Alumnos from "./alumnos.model.js"

export const getAlumnosById = async (req, res) => {
    try{
        const { uid } = req.params;
        const alumnos = await Alumnos.findById(uid)

        if(!alumnos){
            return res.status(404).json({
                success: false,
                message: "Alumno no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            alumnos
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener al alumno",
            error: err.message
        })
    }
}

export const getAlumnos = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, alumnos ] = await Promise.all([
            Alumnos.countDocuments(query),
            Alumnos.find(query)
                   .skip(Number(desde))
                   .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            alumnos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener al alumno",
            error: err.message
        })
    }
}

export const deleteAlumnos = async (req, res) => {
    try{
        const { uid } = req.params

        const alumnos = await Alumnos.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Alumno eliminado",
            alumnos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar al alumno",
            error: err.message
        })
    }
}

export const updatePassword = async (req,res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const alumno = await Alumnos.findById(uid)

        const matchOldAndNewPassword = await verify(alumno.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Alumnos.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

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

export const updateAlumnos = async (req, res) => {
    try{
        const { uid } = req.params;

        const alumnos = await Alumnos.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            uccess: true,
            msg: 'Alumno Actualizado Exitosamente',
            alumnos,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar alumno',
            error: err.message
        })
    }
}