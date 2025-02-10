import { Router } from "express"
import { getProfesoresById, getProfesores, deleteProfesores, updatePassword, updateProfesores } from "./profersores.controller.js"
import { getProfesoresByIdValidator, deleteProfesoresValidator, updatePasswordValidator, updateProfesoresValidator } from "../middlewares/profesores-validators.js"

const router = Router()

router.get("/findProfesores/:uid", getProfesoresByIdValidator, getProfesoresById)

router.get("/", getProfesores)

router.delete("/deleteProfesores/:uid", deleteProfesoresValidator, deleteProfesores)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateProfesores/:uid", updateProfesoresValidator, updateProfesores)

export default router