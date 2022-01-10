 
 //function authentification
function authentification(){

    axios
    .post('http://localhost:3000/authresposablerayon',{
        email:document.getElementById("login").value,
        password:document.getElementById("password").value
    })
    .then(res => 
         res.data.data_user.forEach(element => {
            sessionStorage.setItem('email',element.email);
            sessionStorage.setItem('nom',element.nom);
            sessionStorage.setItem('token',res.data.accessToken);
            document.getElementById("login").value="";
            document.getElementById("password").value="";
            document.getElementById("msgerr").innerHTML="";
            
             window.location.href = "dashboard";
         })
        
        
    )
      

    .catch(err=>  {console.log(err)
        document.getElementById("msgerr").innerHTML="login ou password invalide!!",
        document.getElementById("login").value="",
        document.getElementById("password").value=""}
      
    )
      
 
}

document.getElementById("authentification").addEventListener("click",authentification);