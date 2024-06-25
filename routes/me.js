const express = require('express');
const { JWT_SECRET } = require("../config");
const jwt=require('jsonwebtoken');
const {Account,User}=require('../db')

const router = express.Router();
router.get("/",async(req,res)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({"data":false});
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = await jwt.verify(token, JWT_SECRET);

        const AccountData= await Account.findOne({userId : decoded.userId});
        const userData =await User.findOne({_id:decoded.userId})

        res.json({"valid":true,
            "balance":AccountData.balance,
            "name":userData.firstName,
            "email":userData.username
        })
    }
    catch(e){
        res.json({"data":false});
    }
    

})



module.exports = router;