const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    url:{
        type:String,
        required:[true,"please provide url"]
    },
    desc:{
        type:String,
        required:[true,"please provide desc"]
    },
    icon:{
        type:String,
        required:[true,"please provide icon"]
    }
})

module.exports = mongoose.model('Contacts',contactSchema)