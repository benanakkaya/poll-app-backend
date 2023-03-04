import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const registerController = async (req,res) => {

    const {username,password,email,gender,birthday} = req.body;

    const emailControl = await User.findOne({email});

    if(emailControl){
        return res.status(400).json({message:"E-mail zaten kayıtlı!"})
    }

    const usernameControl = await User.findOne({username});

    if(usernameControl){
        return res.status(400).json({message:"Kullanıcı adı zaten kayıtlı"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const createdUser = await User.create({
        username,
        password: hashedPassword,
        email,
        gender,
        birthday
    })

    return res.status(201).json({message:"Kayıt işleminiz başarıyla gerçekleşti!", createdUser})

}

export const loginController = async (req,res) => {
    const {username,password} = req.body;

    const user = await User.findOne({username});

    if(!user){
        return res.status(400).json({message:"Kayıtlı kullanıcı bulunamadı!"});
    }

    const passwordControl = await bcrypt.compare(password,user.password);

    if(!passwordControl){
        return res.status(400).json({message:"Lütfen parolanızı kontrol edin!"})
    }

    const token = await createToken(user.id);

    return res.status(200).json({message:"Giriş işlemi başarılı!", token, user})

}

export const fetchUserDataController = async (req,res) => {

    const {id} = req.body;

    const userData = await User.findById(id);

    return res.status(200).json({userData})
}



const createToken = async (userID) => {
    return jwt.sign({userID},"SECRET_KEY",{expiresIn:"2h"})
}



