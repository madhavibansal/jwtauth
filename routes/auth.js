const router=require('express').Router();
const User= require('../models/User');
const bcrypt=require('bcryptjs');
const {registervalidation,loginvalidation} = require('../validation');
const jwt=require('jsonwebtoken');

router.post('/register', async (req,res) =>{
    const {error}=registervalidation(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      //check already user
      const emailexist=await User.findOne({email:req.body.email});
      if(emailexist) return res.status(400).send('Email already exist');

      //crypt password
      const salt=await bcrypt.genSalt(10);
      const hashpass=await bcrypt.hash(req.body.password,salt);


    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpass

    });
    try{
        const saveduser=await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    };

});


//Login
router.post('/login',async (req,res) =>{
    const {error}=loginvalidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check user
const user=await User.findOne({email:req.body.email});
if(!user) return res.status(400).send('Email or Password is wrong');

// password check
const validpass=await bcrypt.compare(req.body.password,user.password);
if(!validpass) return res.status(400).send('Invalid password');

//create a token
const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
res.header('auth-token',token);


res.send("Sucess!Logged In");




});




module.exports=router;