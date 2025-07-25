import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    originalURL:{
        type: String,
        required: true
    },
    visistHis:[ { timestamp: {
        type : Number
    }}],
    },{
        timestamps : true
    }
);

const URL = mongoose.model('URL', urlSchema);
export default URL;