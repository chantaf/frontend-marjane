const jwt=require("jsonwebtoken");

exports.middlewareadmincentre=(req,res,success)=>
{
    var token = req.cookies.token
    if (token) {
        jwt.verify(token,"bezkoder-rafik-badr", (err, verifiedJwt) => {
            if(err){
              console.log(err.message)
            }else{
            //   console.log(verifiedJwt.role)
            // //   success();
            if(verifiedJwt.role=="admincentre"){
                success();
            }
            }
        })       
    }else{
        res.redirect('/authentificationadmincentre')
    }
}