const express = require('express')
const productSchema = require('../model/product.Schema')

// get all product
const getAllProduct = async(req,res,next)=>{
    const {userId}=req.user
     try {
        const getProducts = await productSchema.find({'seller.id': userId})
        if(getProducts.length === 0){
         return res.status(200).json({success:true, message:"no available product for this user"})
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
      return  res.status(401).json({success:false, message:"provide product infomation"})
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
        const getAProduct = await productSchema.findOne({_id:productId, 'seller.id':userId })
        if(!getAProduct){
           return res.status(404).json({success:false, message:'product not found'})
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
     const {userId} = req.user
    try {
        const updateProduct = await productSchema.findOneAndUpdate({_id:productId,'seller.id':userId},req.body, {new: true, runValidators: true})
        if(!updateProduct){
          return res.status(404).json({success:false, message:'product not found'})
        }
        res.status(200).json(
            {success:true,message:'updated',
            updatedData:req.body
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
       const deleteProduct =  await productSchema.findOneAndDelete({ _id: productId, 'seller.id': userId })
        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: 'product not found'
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