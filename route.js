
    const express =require('express');
    const router =express.Router();
    const bcrypt = require('bcryptjs');
    const User=require('./models/user');
    
    const validateRegisterInput = require('./validation/register');
        
    router
        .route('/registeration')
        .post(function(req, res){
         console.log(req.body.credentials);
        const { errors, isValid } = validateRegisterInput(req.body.credentials);

        if(!isValid) {
            console.error(res.err)
            return res.status(400).json(errors);
            
            }
            User.findOne({email: req.body.credentials.email})
            .then(user => 
                {
                if(user) 
                {
                    return res.status(400).json({email: 'Email already exists'});
                }
            

            bcrypt.hash(req.body.credentials.password, 10, function(err, hash){
                if(err) 
                {
                   return res.status(500).json({ error: err});
                }
                else {
                    req.body.credentials.password = hash;
                    req.body.credentials.repeatPassword = hash; 

            
                

            const newUser = new User({
                name: req.body.credentials.name,
                email: req.body.credentials.email,
                password: req.body.credentials.password ,
                repeatPassword:req.body.credentials.repeatPassword,
                phone:req.body.credentials.phone,
                createdAt:new Date()
              });
              
                newUser.save()
                .then(user => 
                {
                 res.json(user)
                })
                .catch(err => 
                {
                res.status(500).json({error: err});
                 }); 
                }
                
                });
             });
        })



module.exports =  router ;
 /*const obj = {
                id:uuid(),
                email:req.body.credentials.email,
                password:req.body.credentials.password,
                repeatPassword:req.body.credentials.repeatPassword,
                createdAt:new Date()
            };
            
            const todo= new User(obj)
            todo.save(callback);
            function callback(error,data){
            if(error){
                res.send({error:error});
            }
            else{
                res.send({data:obj,
                message:"data send successfully on mlab"})
            }

        }*/
