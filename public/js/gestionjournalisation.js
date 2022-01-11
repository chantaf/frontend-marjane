 

 //function refrech

 function refrech(){
    window.location.reload();
 }
 //function afficher les journalisations
 function getjournalisation(){
    axios
    .get('http://localhost:3000/view/journalisation')
    .then(res => res.data.journalisations.forEach(element => {
   
       document.getElementById("tablejournalisation").innerHTML+= ` 
       <tr>
       <td>${element.idpromotion}</td>
       <td>${element.idresponsable}</td>
       <td>${element.date}</td>
       <td>${element.heures}</td>
       <td>${element.statusnouveau}</td>
       <td>${element.commentairenouveau}</td>
       <td>${element.action}</td>
   </tr>
  
       ` }))
    }

window.addEventListener('load',getjournalisation)



//logout
function logout() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    refrech();
}


document.getElementById("logout").addEventListener("click",logout);