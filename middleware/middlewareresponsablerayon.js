const jwt=require("jsonwebtoken");

exports.middlewareresponsablerayon=(req,res,success)=>
{
    var token = req.cookies.token
    if (token) {
        jwt.verify(token,"bezkoder-rafik-badr", (err,verifiedJwt) => {
            if(err){
              console.log(err.message)
            }else{
                if(verifiedJwt.role=="responsablerayon"){
                    res.cookie('idcategorie',verifiedJwt.data[0].idcategorie);
                    res.cookie('id',verifiedJwt.data[0].id);
                    success();
                }
            }
        })       
    }else{
        res.redirect('/authentificationresponsablerayon')
    }
}