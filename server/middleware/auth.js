const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Account = require('../models/account')

async function authenticateMiddleware(req,res,next){
    try {
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer '))
        {const token = req.headers.authorization.split(' ')[1] 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await Account.findOne({username:"mainAccount"})
        try {
            async function comparePassword(enteredpPassword,password){
                const response = bcrypt.compare(enteredpPassword,password)
                return response
            }
            const isPasswordCorrect = await comparePassword(decoded.password,user.password)
            if(isPasswordCorrect)
            {next()}
    
            
        } catch (error) {
            
        }
    }
    } catch (error) {
        console.log(error)
    }


}

module.exports =  authenticateMiddleware
