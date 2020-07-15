const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');


//load user model here
const User =require('./Models/Usermodels');

//testing route
router.get('/test', (req, res,) => {
    res.status(200).json({
        message: 'User works'
    });
});
// route GET api/user/register
//@desc Register user 
//access public

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  
// route GET api/user/login
//@desc login user 
//access public

router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    //find user 

    User.findOne({email})
    .then(user =>{
        //check for email
        if(!user)
        {
            return res.status(404).json({email:'user not found'});
        }
        // check for password
        bcrypt.compare(password,user.password)
        .then(ismatch  => {
           if(ismatch)
           {
             
            //user matched 
            const payload = {id: user.id , name : user.name , avatar : user.avatar }

            //sign token
            const secretOrkey = 'secret';
            jwt.sign(payload, secretOrkey , { expiresIn : 3600 },(err, token) =>
             {
               res.json(
                 {success: true,
                  token: 'bearer'  +   token})});

           } else{
               res.status(400).json({msg: 'password incorrect'})
           }

        })

    })
})

// route GET api/user/current
//@desc current user details 
//access private

router.get('/current',
(req,res) =>
{
  res.status(200).json({
    msg: 'success'
  })
})


module.exports = router; 