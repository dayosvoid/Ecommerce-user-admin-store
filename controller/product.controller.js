const express = require('express')
const productSchema = require('../model/product.Schema')
const { populate } = require('../model/user.Schema')

// get all product
const getAllProduct = async(req,res,next)=>{
    const {userId}=req.user
     try {
        const getProducts = await productSchema.find({userId})
        if(!getProducts){
         return res.status(400).json({success:false, message:"cannot get all users"})
        }
        res.status(200).json(
            {success:true,
            getProducts
        })
    } catch (error) {
        next(error)
        
    }
}
// create a product
const createProduct = async(req,res,next)=>{

    const { userId } = req.user;
    const {name} = req.user

    const {item,price,description,status} = req.body
    if(!item || !price || !description || !status){
        res.status(401).json({success:false, message:"provide product infomation"})
    }
    try {
        // const product = req.body;
         const newProduct = await productSchema.create({
            item,
            price,
            description,
            status,
            seller: {
                id:userId,
                name:name
            }
        });
        if(newProduct) {
            res.status(201).json(
                {success:true,
                 newProduct})
        }
    } catch (error) {
       next(error)
        
    }
}
// get Single product
const getSingleProduct = async(req,res,next)=>{
    const {productId} = req.params
    const {userId}=req.user
    try {
        const getAProduct = await productSchema.findById({_id:productId, 'seller.id':userId })
        if(!getAProduct){
            res.status(404).json({success:false, message:'product not found'})
        }
        res.status(200).json(
            {success:true,
            getAProduct
        })
    } catch (error) {
        next(error)
        
    }
}
// update product
const updateProduct = async(req,res,next)=>{
     const {productId} = req.params
     const {userId} = req.body
    try {
        const updateProduct = await productSchema.findByIdAndUpdate({_id:productId,'seller.id':userId},req.body, {new: true}, {runValidators: true})
        if(!updateProduct){
            res.status(404).json({success:false, message:'product not found'})
        }
        res.status(200).json(
            {success:[true,'updated'],
            updateProduct
            })
    } catch (error) {
        next(error)
        
    }
}
// delete product
const deleteProduct = async(req,res,next)=>{
    const {productId} = req.params
    const {userId}=req.user
    try { 
        const deleteProduct = await productSchema.findByIdAndDelete({_id:productId,'seller.id':userId})
        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json(
            {success:true,
             message:"product has been removed"
            })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}