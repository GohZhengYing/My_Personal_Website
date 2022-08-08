const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide title"]
    },
    photo:{
        type:String,
        required:[false]
    },
})

module.exports = mongoose.model("Skills",skillSchema)