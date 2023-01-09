const express = require("express")

const router = express.Router()





router.get("/functionup/college",(req,res)=>{
    res.send("hello")
})


router.all("/*", (req,res)=>{
    res.status(400).send({msg:"plz send correct url"})
})



module.exports=router