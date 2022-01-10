
 //function refrech

 function refrech(){
    window.location.reload();
 }
 //function afficher tout les responsables
 function getproduit(){
    axios
    .get('http://localhost:3000/view/responsablerayon')
    .then(res => 
                res.data.Dataresponsablerayon.forEach(element => {
                
                    document.getElementById("tableresponsable").innerHTML+= `*
                     
                    <tr>
                    <td>${element.nom}</td>
                    <td>${element.prenom}</td>
                    <td>${element.email}</td>
                    <td>${element.idcategorie}</td>
                    <td class="d-flex" >  <input type="button"  class="supprimer   btn btn-danger text-white btn-sm" id="${element.id}" value="Supprimer"> &nbsp; &nbsp;
                            <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
                            
                        </td>
                        
                    
                </tr>
                
                    ` }))

       axios
       axios
       .get('http://localhost:3000/view/categorie')
       .then(res => res.data.categorie.forEach(element => {
          document.getElementById("categorie").innerHTML+= ` 
         <option value="${element.id}">${element.nom}</option>
          `

            }))
  
    .catch(err => console.error(err));
}


window.addEventListener('load',getproduit)



//function ajouter responsable
function ajouterresponsable(){
    axios
    .post('http://localhost:3000/view/addresponsablerayon',{
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        idcategorie: document.getElementById('categorie').value,
    })
  .then(res => console.log(res))
  .catch(err => console.error(err));
  document.getElementById('message').innerHTML="responsable rayon  à été ajouter";  
  refrech();
}

document.getElementById("ajouteresponsablerayon").addEventListener('click',ajouterresponsable);


//function edit responsable
function getresponsableid(id){
    axios
    .get('http://localhost:3000/view/editresponsablerayon/'+id)
    .then(res =>  
         res.data.Dataresponsablerayon.forEach(element => {
        document.getElementById('nom').value=element.nom
        document.getElementById('prenom').value=element.prenom
        document.getElementById('email').value=element.email
        document.getElementById('categorie').value=element.idcategorie
        document.getElementById('id').value=element.id
    })
    )
    .catch(err => console.error(err));
}

  document.getElementById("tableresponsable").addEventListener("click",e=>{
    if (e.target.classList.contains('modifier')) {
        getresponsableid(e.target.id)
    }
})

 //function update responsable
 function updateresponsable(){
    axios
    .put('http://localhost:3000/view/updateresponsablerayon',{
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        idcategorie: document.getElementById('categorie').value,
        id: document.getElementById('id').value,
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="responsable rayon  à été Modifier";  
  refrech();
}

document.getElementById("updateresponsablerayon").addEventListener('click',updateresponsable);




//supprimer responsable
function supprimerresponsable(id){
    axios
    .delete('http://localhost:3000/view/deleteresponsablerayon/'+id)
    .then(res =>console.log(res))
    .catch(err => console.error(err));
    document.getElementById('message').innerHTML="responsable rayon à été supprimer";  
    refrech();
}

document.getElementById("tableresponsable").addEventListener("click",e=>{
    if (e.target.classList.contains('supprimer')) {
         confirmation( e.target.id) 
    }
})

//confiremation la suppression
function confirmation(id){
document.getElementById("msg").innerHTML=` <span>vous avez supprime cette enregistrement ? <button  class="btn btn-danger text-white btn-sm" onclick=supprimer(${id})>Ok</button> </span> <span><button class="btn btn-primary text-white btn-sm" onclick=refrech()>Annuler</button></span>`

}

function supprimer(id){
    supprimerresponsable(id);
}
     
