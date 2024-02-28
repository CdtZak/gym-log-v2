const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signUp = async(req,res,next) =>{
try{
   //PASSWORD HASH
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    //CREATING NEW USER
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword
    }) 
    //CREATING JWEB
    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{
        expiresIn:'2h'})
   
    res.status(201).json({
        
        status:'sucesss',
        data:{
            user:newUser,
            token:token,
        }
    }
    
    )
    

}catch(err){
    
    res.status(404).json({
    error:err,
        message:'user was not registered ! '
    })
}
}
exports.login = async(req,res,next)=>{
    try{
        //1-check if user entred email and passowrd
        const email = req.body.email;
        const password = req.body.password
        if(!email|| !password){
            return res.status(404).json({
                message:'provide email and password'
            })
            
        }
    //2-check email  in db
    const existingUser = await User.findOne({email})
    //3-verify passowrd
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
        return res.status(401).json(
            { message: 'Invalid email or password' });
    }
    //4-generate token
    const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{
        expiresIn:'2h'})
      res.status(200).json({
            status: 'success',
            data: {
                user: existingUser,
                token: token,
            },
        }); 
    }
    catch(err){
        res.status(404).json({
            error:err,
            message:'login failed !'
        })
    }
}
exports.protect = async (req,res,next)=>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json(
            { message: 'Unauthorized: Missing token' });
    }
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
 
}
exports.getUser = async (req,res,next) =>{
    try{
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    console.log(user)
    if(user){
        /*res.status(200).json({
            status:'sucess',
            data:user
        })*/
        res.render('exercice',{data:user})
    }}
    catch(err){
        res.status(404).json({
            message:'user not found '
        })
    }
}
exports.updateUser = async (req,res,next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
            $push: { // Use $push to add a new exercise to the array
                exercices: {
                    exname: req.body.exercices[0].exname,
                        weight: req.body.exercices[0].weight,
                        date: req.body.exercices[0].date
                }
            }
        },
        {
            new: true,
            runValidators:true
            
        })
        res.status(200).json({
            status:'sucess',
            data:{user}
        })

    }catch(err){
res.status(404).json({
    error:err,
    message:'exercices were not added!'
})
    }

}