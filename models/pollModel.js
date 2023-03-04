import mongoose from "mongoose";


const pollSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    choices: [{
        text: {
            type: String,
            required: true
        },
        voteCount: {
            type: Number,
            default: 0
        }
    }],
    category: {
        type: String,
        required: true,
        enum: ["Spor","Müzik","Sanat","Sinema","Sosyal","İş Dünyası","Siyaset","Diğer"],
        default: null
    },
    expiresDate: {
        type: Date,
        required: false,
        default: null
    }
    }, {timestamps: true }
)

export default mongoose.model("Poll",pollSchema);