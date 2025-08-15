const express = require('express')
const User = require('../model/user.Schema')

// handleRegister user/admin
const handleRegister = async(req,res)=>{
    const {userName,email,password}=req.body
    // checking if any field was left empty
    if(!userName || !email || !password){
        return res.status(400).json({
            success:false,
            message:'provide necessary credential'
        })
    }
    try {
        // seaech through the db if user email exist
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:'email already exist'
            })    
        }else{
            // creating and storing new user info and removing the pssword from the response
            const newUser = await User.create(req.body)
            // const displayedInfo = newUser.toObject()
            // delete displayedInfo.password
            res.status(201).json({
                success:true,
                message:'user register successfully',
                newUser
            })
        }
        // res.send({message:'register'})
    }catch (error) {
       next(error)
    }
}



// handleLogin user/admin
const handleLogin = async(req,res)=>{
    const {email,password}=req.body
    // checking if any field was left empty
    if(!email || !password){
        return res.status(401).json({
            success:false,
            message:'enter user credentials'
        })
    }
    try {
        // seaech through the db if user email exist
        const existingUser = await User.findOne({email})
        if(!existingUser){
           return res.status(404).json('user not found')
        }
    //    comparing the harshed password with the one user is try to login with
        const isPasswordCorrect = await existingUser.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
        // if user exist (create token and grant access)
        if(isPasswordCorrect){
            const token = await existingUser.createJwt()
       return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: existingUser,
            token
        })}
        // res.send({message:'login'})
    }catch (error) {
       next(error)
    }
}

//Admin handle delete user
const handleDeleteUser = async (req,res)=>{
    const {userId} = req.params
    try {
        const deleteUser = await User.findOneAndDelete(userId)
        if (!deleteUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json(
            {success:true,
             message:"user has been removed"
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {handleRegister,handleLogin,handleDeleteUser}