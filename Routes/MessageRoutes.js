const express = require('express');
const router = express.Router();
const Message=require('./models/user');
const validateMessageInput = require('./validation/message');

router.route('/sendMessage')
.post(
  function (req, res) {
    console.log(req.body.messageObject);
        const { errors, isValid } = validateMessageInput(req.body.messageObject);

        if(!isValid) {
            console.error(res.err)
            return res.status(400).json(errors);
            
            }
        let newMessage = new Message();
        senderName = req.body.messageObject.name;
        senderContactNumber = req.body.messageObject.contactNumber;
        message = req.body.messageObject.message;
        newMessage.save()
          .then (res=>{
            res.send({ message: 'Error in sending your message, please make sure that you have filled the complete form.', error: error, savedMessage: null });
           }) 
            .catch(error =>{ 
                res,send(error.message)
        });
    }
);


      
    

























module.exports = router;