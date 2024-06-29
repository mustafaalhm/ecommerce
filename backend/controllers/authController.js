const adminModel = require ('../models/adminModel');
const { createToken } = require('../utilies/createToken');
const { response } = require('../utilies/response');
const bcrypt = require('bcrypt');

class authControllers {
    admin_login = async(req,res)=>{
     
       const {email,password,name} = req.body;

       try {
            const admin =await adminModel.findOne({email}).select('+password')
            if(admin){
              const matchPassword =await bcrypt.compare(password, admin.password)
              if(matchPassword) {
                const token =await createToken({
                    id:admin.id,
                    role:admin.role,
                })
                res.cookie('accessToken',token,{
                    expires :new Date(Date.now() + 7 *24 *60*60*1000)
                })
                
                response(res,200,{message:" Login successfully ",token:token})
              
              }else{
                response(res,400,{error:" Wrong Password"})
                   
              }
            }else{
                response(res,400,{error:"email not found"})
                
            }
            
       } catch (error) {
        response(res,500,{error:error.message})
        
       }
    }

}

module.exports =new  authControllers;