const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    item:{
        type:String,
        trim:true,
        required: [true,'name is required']
    },
    price:{
        type:Number,
        required:[true,'price is required']

    },
    description: {
        type: String,
    },
    status:{
        type:String,
        required:[true, "status is required"],
        enum:['In Stock','out of stock'],
        default:'In Stock'
    },
    seller:{
        type:Schema.Types.Mixed,
        ref:'user',
        required:[true, "please provide user"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

},{Timestamps: true} )


// module.exports = mongoose.model('product', productSchema)
module.exports= mongoose.model('product', productSchema)
