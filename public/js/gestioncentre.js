 

 //function refrech

 function refrech(){
    window.location.reload();
 }
 //function afficher tout les centres
 function getcentre(){
    axios
    .get('http://localhost:3000/view/centre')
    .then(res => res.data.centres.forEach(element => {
       document.getElementById("tablecentre").innerHTML+= ` 
       <tr>
       <td>${element.nom}</td>
       <td>${element.ville}</td>
      
       <td class="d-flex" >  <input type="button"  class="supprimer   btn btn-danger text-white btn-sm" id="${element.id}" value="Supprimer"> &nbsp; &nbsp;
       <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
       
   </td>
        
      
   </tr>
  
       ` 

    }))
    .catch(err => console.error(err));
}


window.addEventListener('load',getcentre)

//function ajouter centre
function ajoutercentre(){
    axios
    .post('http://localhost:3000/view/addcentre',{
        nom: document.getElementById('nom').value,
        ville: document.getElementById('ville').value,
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="centre à été ajouter";  
  refrech();
}

document.getElementById("ajoutecentre").addEventListener('click',ajoutercentre);


//function edit centre
function getcentreid(id){
    axios
    .get('http://localhost:3000/view/centre/'+id)
    .then(res =>
         res.data.centre.forEach(element => {
        document.getElementById('nom').value=element.nom
        document.getElementById('ville').value=element.ville
        document.getElementById('id').value=element.id
    }))
    .catch(err => console.error(err));
}


document.getElementById("tablecentre").addEventListener("click",e=>{
    if (e.target.classList.contains('modifier')) {
        getcentreid(e.target.id)
    }
})

//function update centre

function updatecentre(){
    axios
    .put('http://localhost:3000/view/updatecentre',{
        nom: document.getElementById('nom').value,
        ville: document.getElementById('ville').value,
        id:document.getElementById('id').value
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="centre à été Modifier";  
  refrech();
}

document.getElementById("updatecentre").addEventListener('click',updatecentre);


//supprimer centre
function supprimercentre(id){
    axios
    .delete('http://localhost:3000/view/deletecentre/'+id)
    .then(res =>console.log(res))
    .catch(err => console.error(err));
    document.getElementById('message').innerHTML="centre à été supprimer";  
    refrech();
}


document.getElementById("tablecentre").addEventListener("click",e=>{
    if (e.target.classList.contains('supprimer')) {
         confirmation( e.target.id) 
    }
})

//confiremation la suppression
function confirmation(id){
document.getElementById("msg").innerHTML=` <span>vous avez supprime cette enregistrement ? <button  class="btn btn-danger text-white btn-sm" onclick=supprimer(${id})>Ok</button> </span> <span><button class="btn btn-primary text-white btn-sm" onclick=refrech()>Annuler</button></span>`

}

function supprimer(id){
    supprimercentre(id);
}
     


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