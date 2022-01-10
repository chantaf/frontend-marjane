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
                  res.cookie("role","admingeneral");
                success();
            }else if(verifiedJwt.role=="admincentre"){
                res.cookie("role","admincentre");
                success();
            }

            }
        })       
    }else{

        res.redirect('/authentificationadmincentre')
    }
}