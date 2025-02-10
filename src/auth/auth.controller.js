import { hash, verify } from "argon2"
import Alumnos from "../alumnos/alumnos.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try{
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const alumnos = await Alumnos.create(data);

        return res.status(201).json({
            message: "Alumno has been created",
            name: alumnos.name,
            email: alumnos.email
        })
    }catch(err){
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const alumnos = await Alumnos.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!alumnos){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
         }

         const token = await generateJWT(alumnos.id)

         return res.status(200).json({
            message: "Login successful",
            alumnosDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
         })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}