const jwt=require("jsonwebtoken");

exports.middleware=(req,res,success)=>
{
    var token = req.cookies.token
    if (token) {
        jwt.verify(token,"bezkoder-rafik-badr", (err, verifiedJwt) => {
            if(err){
              console.log(err.message)
            }else{

              if(verifiedJwt.role=="admingeneral"){
                  res.cookies=("role","admingeneral");
                success();
            }else if(verifiedJwt.role=="admincentre"){
                res.cookies=("role","admincentre");
                success();
            }

            }
        })       
    }else{

        res.redirect('/authentificationadmingeneral')
    }
}