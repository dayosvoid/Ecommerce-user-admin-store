const User = require('../model/user.Schema')
const product = require('../model/product.Schema')
const mongoose = require('mongoose')


const handleGetAlluser = async(req,res,next)=>{
     try {
        // const  = req.body
        const AllUser = await User.find({})
        if(!AllUser){
           res.status(400).json(
            {success:false,
            message:'Bad request: cannot get all users'
        }) 
        }

        res.status(200).json(
            {success:true,
            AllUser
        })
    } catch (error) {
        next(error)
        
    }
}




//Admin handle delete user
const handleDeleteUser = async (req,res,next)=>{
    const {userId} = req.params
    const {name, role} = req.adminUser
    // const {role} = req.adminUser
    try {
        
        if(role !== "admin"){
         return res.status(403).json(
            {success:false,
             message:`${name} is not an admin user`
            })}

        const deleteUser = await User.findOne({_id:userId, })
        // const deleteProduct = await product.deleteMany({'seller.id':userId})
        

        if (!deleteUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if(deleteUser.role === "admin"){
            return res.status(403).json({
                success: false,
                message: 'failed: Cannot remove admin'
            })
        }

          await deleteUser.deleteOne()
          await product.deleteMany({'seller.id':userId})
            res.status(200).json(
            {success:true,
             message:`user has been removed by ${name} and product creaded by them`
            })
    } catch (error) {
        next(error)
    }
}
module.exports = {handleDeleteUser,handleGetAlluser}