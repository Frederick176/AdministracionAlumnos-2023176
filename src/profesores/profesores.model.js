import { Schema, model } from "mongoose";

const profesoresSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 charactersh"]
    },
    username:{
        type: String,
        required: true,
    }
})