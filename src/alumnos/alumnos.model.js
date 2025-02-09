import { Schema, model } from "mongoose";

const alumnosSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    emial:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Pasword is required"]
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE"]
    },
    course:{
        type: String,
        required: [true, "Course is required"],
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

alumnosSchema.methods.toJSON = function(){
    const {password, _id, ...alumnos} = this.toObject()
    alumnos.uid = _id
    return alumnos
}

export default model("Alumnos", alumnosSchema)