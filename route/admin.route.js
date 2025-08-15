const router = require('express').Router()
const { handleDeleteUser, handleGetAlluser } = require("../controller/admin.controller")

router.get("/allUsers", handleGetAlluser)
router.delete('/deleteUser/userId', handleDeleteUser)

module.exports = router