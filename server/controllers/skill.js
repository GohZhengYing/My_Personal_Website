const Skills = require('../models/skill')

async function getSkills(req,res){
    try {
        const response = await Skills.find({})
        console.log("get skill")
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

async function postSkills(req,res){
    try {
        const response = await Skills.create(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function updateSkills(req,res){
    try {
        const {_id,photo,title} = req.body
        const response = await Skills.findOneAndUpdate({_id:_id},{photo,title})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

async function deleteSkills(req,res){
    try {
        const {_id} = req.body
        const response = await Skills.findOneAndDelete({_id:_id})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

module.exports ={
    getSkills,
    postSkills,
    updateSkills,
    deleteSkills
}