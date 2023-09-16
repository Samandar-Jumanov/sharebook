const {Users, ShareProblems} = require('../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()



const Signup = async (request , response , next ) =>{
   
    try {
        const {username , password } = request.body 

        const user = await Users.findOne({
            where : {username}
        } )
        
        if(user){
            return response.json('User not found ')
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await Users.create({
            username : username ,
            password : hashedPassword,
            token : process.env.SECRETKEY
        } )
        
       

        const token = await jwt.sign({userId : newUser.id}, process.env.SECRETKEY)
        newUser.token = token
        await newUser.save()

        return response.json({
            user : newUser
        })
        } catch (error) {
            next(error)
    }
}



const Login = async (request , response , next ) =>{
    const {username , password } = request.body 

    try {

        const user = await Users.findOne({
            where : {username}
        })
        
        if(!user){
            return response.json({
                message :'User not  found  '
            })
        }

        const isTruePassword = await bcrypt.compare(password , user.password)

        if(isTruePassword){
            return response.json({
                message :'Invalid password '
            })
        }
        const newToken = await jwt.sign({userId : user.id}, process.env.SECRETKEY)
        user.token =  newToken
        await user.save()
        return response.json({
            user : user ,
            message :'Logged in succesfully'
        })

    } catch (error) {
            next(error)        
    }
}



const getUserAllProblems = async (request , response , next ) =>{
    const {userId} = request.params 
    try {
        
        const user = await Users.findByPk(userId , {
            include : [
                {model : ShareProblems , as :'problems'}
            ]
        })

        const userSharedProblems = user.problems 
        return response.json({
            userSharedProblems : userSharedProblems
        })
    } catch (error) {
        next(error)
        
    }
}

module.exports ={
    Signup,
    Login ,
    getUserAllProblems
}