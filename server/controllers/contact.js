const Contacts = require('../models/contact')


const getContacts = async (req,res)=>{
    try {
        const response = await Contacts.find({})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

const postContacts = async (req,res)=>{
    try {
        const response = await Contacts.create(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

const updateContacts = async (req,res)=>{
    try {
        const {_id,url,icon,desc} = req.body
        const response = await Contacts.findOneAndUpdate({_id},{url,desc,icon})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}

const deleteContacts = async (req,res)=>{
    try {
        const {_id} = req.body
        const response = await Contacts.findOneAndDelete({_id})
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json(error)
    }

}


module.exports = {
    getContacts,
    postContacts,
    updateContacts,
    deleteContacts
}