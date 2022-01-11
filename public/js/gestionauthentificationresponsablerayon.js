 
 //function authentification
function authentification(){

    axios
    .post('http://localhost:3000/authresponsablerayon',{
        email:document.getElementById("login").value,
        password:document.getElementById("password").value
    })
    .then(res => 
        {
            document.cookie = "token=" + res.data.accessToken,
            window.location.href = "validerpromotions"
        }
         
    )
      

    .catch(err=>  {console.log(err)
        document.getElementById("msgerr").innerHTML="login ou password invalide!!",
        document.getElementById("login").value="",
        document.getElementById("password").value=""}
      
    )
      
 
}

document.getElementById("authentification").addEventListener("click",authentification);