import { body, param } from "express-validator";
import { emailExists, usernameExists, alumnosExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";