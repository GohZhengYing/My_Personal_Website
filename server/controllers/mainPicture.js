const MainPicture = require('../models/mainPicture')


const getMainPicture = async (req,res)=>{
    try {
        const response = await MainPicture.find({})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}



const updateMainPicture = async (req,res)=>{
    try {
        const {_id,personal,education,experience,photo} = req.body
        const post = await MainPicture.findOneAndUpdate({_id:_id},{personal,education,experience,photo})
        res.status(200).json({post})
    } catch (error) {
        res.status(400).json(error)
    }

}




module.exports = {
    getMainPicture,
    updateMainPicture,
}