import Alumnos from "../alumnos/alumnos.model.js"
import Profesores from "../profesores/profesores.model.js"

export const emailExists = async (email = "") => {
    const existe = await Alumnos.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await Alumnos.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const alumnosExists = async (uid = " ") => {
    const existe = await Alumnos.findById(uid)
    if(!existe){
        throw new Error("No existe el alumno con el ID proporcionado")
    }
}

export const profesoresExists = async (id = "") => {
    const existe = await Profesores.findById(id);
    if (!existe) {
        throw new Error("No existe el profesor con el ID proporcionado");
    }
};