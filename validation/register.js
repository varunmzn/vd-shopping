const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : '';
    
    data.password = !isEmpty( data.password) ? data.password : '';
    data.repeatPassword = !isEmpty( data.repeatPassword) ?   data.repeatPassword : '';

    

    if(!Validator.isEmail(  data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty( data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(  data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(  data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(  data.repeatPassword, {min: 6, max: 30})) {
        errors.repeatPassword = 'Password must have 6 chars';
    }

    if(!Validator.equals(  data.password,   data.repeatPassword)) {
        errors.repeatPassword = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(  data.repeatPassword)) {
        errors.repeatPassword = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}