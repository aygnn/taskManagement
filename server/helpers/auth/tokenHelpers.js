 const sendJwttoClient=(user,res)=>{
    const token=user.generateJwtfromUser()
    const{ JWT_COOKIE,NODE_ENV}=process.env

    return res.status(200).cookie("access_token",token ,{
        httpOnly:true,
        expire:new Date(Date.now()+parseInt(JWT_COOKIE)*1000*60),
        secure:NODE_ENV==="development"?false:true,

    }).json({
        success:true,
        access_token:token,
        data:{username:user.username,
        password:user.password,
        isAdmin:user.isAdmin,
        email:user.email
    },
        
    })

 }
 
 export default sendJwttoClient

