
const express =require('express');
const router =express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User =require('./models/user')

const validateLoginInput = require('./validation/loginv');

    router.route('/login').post( (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body.credentials);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.credentials.email;
    const password = req.body.credentials.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                email: user.email,
                                password:user.password
                                
                            }
                            jwt.sign(payload, 'secret', 
                            {
                                expiresIn: 3600
                            }, 
                            (err, token) => 
                            {
                            if(err) console.error('There is some error in token', err);
                            else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        
                                    });
                                }
                            });
                            }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});


module.exports=router;