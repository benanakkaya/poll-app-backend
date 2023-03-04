import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Kadın","Erkek","Belirtilmemiş"],
        default: "Belirtilmemiş"
    },
    birthday: {
        type: Date,
        required: true
    },
    userType: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER"
    }
})


export default mongoose.model("User",userSchema);