import { Router } from "express"
import { getAlumnosById, getAlumnos, deleteAlumnos, updatePassword, updateAlumnos, } from "./alumnos.controller.js"
import { getAlumnosByIdValidator, deleteAlumnosValidator, updatePasswordValidator, updateAlumnosValidator } from "../middlewares/alumnos.validators.js"

const router = Router()

router.get("/findAlumnos/:uid", getAlumnosByIdValidator, getAlumnosById)

router.get("/", getAlumnos)

router.delete("/deleteAlumnos/:uid", deleteAlumnosValidator, deleteAlumnos)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateAlumnos/:uid", updateAlumnosValidator, updateAlumnos)

export default router