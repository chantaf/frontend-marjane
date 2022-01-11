 

 //function refrech

 function refrech(){
    window.location.reload();
 }
 //function afficher tout les categories
 function getcategorie(){
    axios
    .get('http://localhost:3000/view/categorie')
    .then(res => res.data.categorie.forEach(element => {
       document.getElementById("tablecategorie").innerHTML+= ` 
       <tr>
       <td>${element.nom}</td>     
       <td class="d-flex" >  <input type="button"  class="supprimer   btn btn-danger text-white btn-sm" id="${element.id}" value="Supprimer"> &nbsp; &nbsp;
       <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
       
   </td>
        
      
   </tr>
  
       ` 
    }))
    .catch(err => console.error(err));
}


window.addEventListener('load',getcategorie)

//function ajouter categorie
function ajoutercategorie(){
    axios
    .post('http://localhost:3000/view/addcategorie',{
        nom: document.getElementById('nom').value,
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="categorie à été ajouter";  
  refrech();
}

document.getElementById("ajoutercategorie").addEventListener('click',ajoutercategorie);


//function edit categorie
function getcategorieid(id){
    axios
    .get('http://localhost:3000/view/editcategorie/'+id)
    .then(res =>
         res.data.categorie.forEach(element => {
        document.getElementById('nom').value=element.nom
        document.getElementById('id').value=element.id
    }))
    .catch(err => console.error(err));
}



document.getElementById("tablecategorie").addEventListener("click",e=>{
    if (e.target.classList.contains('modifier')) {
        getcategorieid(e.target.id)
    }
})

//function update categorie

function updatecategorie(){
    axios
    .put('http://localhost:3000/view/updatecategorie',{
        nom: document.getElementById('nom').value,
        id:document.getElementById('id').value
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="categorie à été Modifier";  
  refrech();
}

document.getElementById("updatecategorie").addEventListener('click',updatecategorie);


//supprimer categorie
function supprimercategorie(id){
    axios
    .delete('http://localhost:3000/view/deletecategorie/'+id)
    .then(res =>console.log(res))
    .catch(err => console.error(err));
    document.getElementById('message').innerHTML="categorie à été supprimer";  
    refrech();
}


document.getElementById("tablecategorie").addEventListener("click",e=>{
    if (e.target.classList.contains('supprimer')) {
         confirmation( e.target.id) 
    }
})

//confiremation la suppression
function confirmation(id){
document.getElementById("msg").innerHTML=` <span>vous avez supprime cette enregistrement ? <button  class="btn btn-danger text-white btn-sm" onclick=supprimer(${id})>Ok</button> </span> <span><button class="btn btn-primary text-white btn-sm" onclick=refrech()>Annuler</button></span>`

}

function supprimer(id){
    supprimercategorie(id);
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