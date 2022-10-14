const { createUser, updateUser, getAllUser, getUser,deleteUser } = require("../controllers/user");
const {protect} = require('../middlewares/auth')
const express = require("express");


const router = express.Router();

router.post("/signup", protect, createUser);
router.get('/', protect, getAllUser);
router.get('/:id', protect, getUser)
router.put("/:id" , protect, updateUser);
router.delete("/:id" , protect, deleteUser);



module.exports = router;
