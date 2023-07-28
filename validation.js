const joi=require('@hapi/joi')
const { schema } = require('./models/User')
//blueprint of javascript objects-- it is directly connected to schema


const registerValidation=(data)=>{
  const schema=  joi.object({
        userName:joi.string().min(2).max(20).required(),
        email:joi.string().email().min(6),
        password:joi.string().min(6).required()
        
        
        })
        
return schema.validate(data)
}
const loginValidation=(data)=>{
  const schema=  joi.object({
   
        email:joi.string().email().min(6),
        password:joi.string().min(6).required()
        
        
        })
        
return schema.validate(data)
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;