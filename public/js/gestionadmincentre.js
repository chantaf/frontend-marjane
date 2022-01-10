
 //function refrech

 function refrech(){
    window.location.reload();
 }
 //function afficher tout les responsable
 function getproduit(){

    axios
    .get('http://localhost:3000/view/admincentre')
    .then(res => 
                res.data.DataAdminCentre.forEach(element => {
                
                    document.getElementById("tableadmincentre").innerHTML+= ` 
                    <tr>
                    <td>${element.nom}</td>
                    <td>${element.prenom}</td>
                    <td>${element.email}</td>
                    <td>${element.idcenter}</td>
                    <td class="d-flex" >  <input type="button"  class="supprimer   btn btn-danger text-white btn-sm" id="${element.id}" value="Supprimer"> &nbsp; &nbsp;
                    <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
                    
                </td>
                        
                    
                </tr>
                
                    ` }))

       axios
          .get('http://localhost:3000/view/centre')
          .then(res => res.data.centres.forEach(element => {
             document.getElementById("centre").innerHTML+= ` 
            <option value="${element.id}">${element.nom}</option>
             `

            }))
  
    .catch(err => console.error(err));
}


window.addEventListener('load',getproduit)



//function ajouter admin-centre
function ajouteradmincentre(){
    axios
    .post('http://localhost:3000/view/addadmincentre',{
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        idcenter: document.getElementById('centre').value,
    })
  .then(res => console.log(res))
  .catch(err => console.error(err));
  document.getElementById('message').innerHTML="admin centre à été ajouter";  
  refrech();
}

document.getElementById("ajouteadmincentre").addEventListener('click',ajouteradmincentre);




//function edit admin centre
function getadmincentreid(id){
    axios
    .get('http://localhost:3000/view/editadmincentre/'+id)
    .then(res =>  
         res.data.DataAdminCentre.forEach(element => {
        document.getElementById('nom').value=element.nom
        document.getElementById('prenom').value=element.prenom
        document.getElementById('email').value=element.email
        document.getElementById('centre').value=element.idcenter
        document.getElementById('id').value=element.id
    })
    )
    .catch(err => console.error(err));
}

document.getElementById("tableadmincentre").addEventListener("click",e=>{
    if (e.target.classList.contains('modifier')) {
        getadmincentreid(e.target.id)
    }
})



 //function update admin centre
 function updateadmincentre(){
    axios
    .put('http://localhost:3000/view/updateadmincentre',{
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        idcenter: document.getElementById('centre').value,
        id: document.getElementById('id').value,
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="Admin centre à été Modifier";  
  refrech();
}

document.getElementById("updateadmincentre").addEventListener('click',updateadmincentre);

//supprimer admin centre
function supprimeradmincentre(id){
    axios
    .delete('http://localhost:3000/view/deleteadmincentre/'+id)
    .then(res =>console.log(res))
    .catch(err => console.error(err));
    document.getElementById('message').innerHTML="admin centre à été supprimer";  
    refrech();
}


document.getElementById("tableadmincentre").addEventListener("click",e=>{
    if (e.target.classList.contains('supprimer')) {
         confirmation( e.target.id)
      
    }
})


//confiremation la suppression
function confirmation(id){
    document.getElementById("msg").innerHTML=` <span>vous avez supprime cette enregistrement ? <button  class="btn btn-danger text-white btn-sm" onclick=supprimer(${id})>Ok</button> </span> <span><button class="btn btn-primary text-white btn-sm" onclick=refrech()>Annuler</button></span>`
    
    }
    
    function supprimer(id){
        supprimeradmincentre(id);
    }
         