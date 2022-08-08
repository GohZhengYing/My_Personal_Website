const Projects = require('../models/project')

const getProjects = async (req,res)=>{
    try {
        const response = await Projects.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

const postProjects = async (req,res)=>{
    try {
        const response = await Projects.create({...req.body})
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json({msg:error})
    }

}

const updateProjects = async (req,res)=>{
    try {
        const {_id,title,desc,photo,skills} = req.body
        const response = await Projects.findOneAndUpdate({_id:_id},{title,desc,photo,skills})
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json(error)
    }

}

const deleteProjects = async (req,res)=>{
    try {
        const response = await Projects.findOneAndDelete({_id:req.body._id})
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json(error)
    }

}



module.exports = {
    getProjects,
    postProjects,
    updateProjects,
    deleteProjects
}