const mongoose = require('mongoose')

const mainPictureSchema = new mongoose.Schema({
    personal:{
        type:String,
        required:[true,"please provide description"]
    },
    education:{
        type:String,
        required:[true,"please provide description"]
    },
    experience:{
        type:String,
        required:[true,"please provide description"]
    },
    photo:{
        type:String,
        required:[true,"please provide photo"]
    }
})

module.exports = mongoose.model("MainPicture",mainPictureSchema)