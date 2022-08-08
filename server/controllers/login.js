const jwt = require('jsonwebtoken')
const Account = require('../models/account')
const bcrypt = require('bcryptjs')


const login = async (req,res) =>{
    const {username,password} = req.body
    if(username===""){
        const user = await Account.findOne({username:"mainAccount"})
        async function comparePassword(enteredpPassword,password){
            const response = await bcrypt.compare(enteredpPassword,password)
            return response
        }
        const isPasswordCorrect = await comparePassword(password,user.password)
        if(isPasswordCorrect)
        {
            const id = new Date().getDate()
        const token = jwt.sign({id,password},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).json({loginSuccess:true,token:token,msg:"Login Successful"})
        }
        else
        res.status(200).json({loginSuccess:false,msg:"Login Failed!"})
    }
    else
    res.status(200).json({loginSuccess:false,msg:"Login Failed!"})

}

const authenticate = async (req,res) =>{
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer ')&&(req.headers.authorization.split(' ')[1]!=='null'))
    {const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    async function comparePassword(enteredpPassword,password){
        const response = bcrypt.compare(enteredpPassword,password)
        return response
    }
    
    try {
        const user = await Account.findOne({username:"mainAccount"})
    const isPasswordCorrect = await comparePassword(decoded.password,user.password)
    if(isPasswordCorrect)
    {res.status(200).json({msg:"Successful"})}
    else
    res.status(200).json({msg:"Expired"})
    } catch (error) {
        res.status(400).json(error)
        }
    }
    else
{
    res.status(200).json({msg:"Unsuccessful"})}
}

module.exports = {
    login,
    authenticate
}