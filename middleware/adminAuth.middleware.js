const jwt = require('jsonwebtoken')

const AdminUser = (req,res,next)=>{

    const authHeader = req.headers['authorization']
    // checking for the token
    const token = authHeader && authHeader.split(' ')[1]

   try {
    if(!token){
        return res.status(401).json(
            {success:false,
            message: 'user is unauthorized: please provide user Token'})
    }


     const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decodeToken)
    req.adminUser = decodeToken

    if(req.adminUser.role !== 'admin'){
     return res.status(403).json(
        {success:false, 
        message:'Access denied: admin right required'})
    }
    
    next()
   } catch (error) {
     next(error)
   }
}
module.exports=AdminUser