const express = require('express')
const router = express.Router()
const {getAllProduct,
        getSingleProduct,
        createProduct,
        deleteProduct,
        updateProduct}= require('../controller/product.controller')

router.route('/').get(getAllProduct).post(createProduct)
router.route('/:productId').get(getSingleProduct)
.patch(updateProduct)
.delete(deleteProduct)

module.exports = router