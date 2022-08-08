const mongoose = require('mongoose')

function connectDB (url) {
    try {
        return(
            mongoose.connect(url,{
            }
            )
        )
    } catch (error) {
        return error
    }

}

module.exports = connectDB