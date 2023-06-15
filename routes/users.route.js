const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      const newUser = new userModel({name,email,password:hash});
      await newUser.save();
      res.status(200).send("user registered successfully");
    });
  } catch (error) {
    res.status(400).send("registration failed");
  }
});


userRouter.post("/login", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.findOne({email})
        bcrypt.compare(password, user.password, function(err, result) {
           if(result){
            let token = jwt.sign({userId:user._id},`${process.env.secretKey}`)
            res.status(200).send({"msg":"user loggedin successfully",token});
           }else{
            res.status(400).send("wrong credentials");
           }
        });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



module.exports = userRouter;
