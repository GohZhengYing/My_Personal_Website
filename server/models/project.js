const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title must be provided"]
    },
    desc:{
        type:String,
        required:[true,"description must be provided"]
    },
    photo:{
        type:String,
        required:[true,"photo must be provided"]
    },
    skills:{
        type:Array,
        required:[false]
    }

})

module.exports = mongoose.model('Projects',projectSchema)