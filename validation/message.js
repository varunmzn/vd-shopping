
const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
    let errors = {};
    
    data.name= !isEmpty(data.name) ? data.name: '';
    
    data.contactNumber = !isEmpty( data.contactNumber) ? data.contactNumber : '';
    data.message = !isEmpty( data.message) ?   data.message : '';

    

    

    if(Validator.isEmpty( data.name)) {
        errors.name = 'Please provide your name';
    }
    else if (data.name.length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }

    

    if(Validator.isEmpty(  data.contactNumber)) {
        errors.contactNumber = 'Please provide your contact number so that seller can contact you';
    }

   else if(!Validator.isNumeric(  data.contactNuumber)) {
        errors.contactNumber = 'Only digits are allowed in contact number';
    }

   else if(data.contactNumber.length < 10 || data.contactNumber.length > 15) {
        errors.repeatPassword = 'Please provide a valid phone number';
    }

    if (Validator.isEmpty(data.message)) {
        errors.message = "Please Enter your message";
        } 
    else if (contact.message.length < 25) {
        errors.message = "Message is too short, please describe your message breifly.";
        
      }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}