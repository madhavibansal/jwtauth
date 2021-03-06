//validation
const joi=require('@hapi/joi');
const registervalidation= data =>{
const schema= {
    name:joi.string().min(6).required(),
    email:joi.string().min(6).required().email(),
    password:joi.string().min(6).required()
};
return joi.validate(data,schema);
};
const loginvalidation= data =>{
    const schema= {
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    };
  return joi.validate(data,schema);
};
module.exports.registervalidation=registervalidation;
module.exports.loginvalidation=loginvalidation;