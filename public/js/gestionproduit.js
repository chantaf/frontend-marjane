 

 //function refrech

 function refrech(){
    window.location.reload();
 }
 //function afficher tout les produits
 function getproduit(){
    axios
    .get('http://localhost:3000/view/produit')
    .then(res => res.data.produits.forEach(element => {
   
       document.getElementById("tableproduit").innerHTML+= ` 
       <tr>
       <td>${element.nom}</td>
       <td>${element.quantitestk}</td>
       <td>${element.prix}</td>
       <td>${element.idcategorie}</td>
       <td class="d-flex" >  <input type="button"  class="supprimer   btn btn-danger text-white btn-sm" id="${element.id}" value="Supprimer"> &nbsp; &nbsp;
       <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
       
   </td>
        
      
   </tr>
  
       ` }))

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

//function ajouter produit
function ajouterproduit(){
    axios
    .post('http://localhost:3000/view/addproduit',{
        nom: document.getElementById('nom').value,
        quantitestk: document.getElementById('quantite').value,
        prix: document.getElementById('prix').value,
        idcategorie: document.getElementById('categorie').value,
    })
  .then(res => console.log(res))
  .catch(err => console.error(err));
  document.getElementById('message').innerHTML="produit à été ajouter";  
  refrech();
}

document.getElementById("ajouteproduit").addEventListener('click',ajouterproduit);


//function edit produit
function getproduitid(id){
    axios
    .get('http://localhost:3000/view/editproduit/'+id)
    .then(res => 
         res.data.produit.forEach(element => {
        document.getElementById('nom').value=element.nom
        document.getElementById('quantite').value=element.quantitestk
        document.getElementById('prix').value=element.prix
        document.getElementById('categorie').value=element.idcategorie
        document.getElementById('id').value=element.id
    })
    )
    .catch(err => console.error(err));
}

document.getElementById("tableproduit").addEventListener("click",e=>{
    if (e.target.classList.contains('modifier')) {
        getproduitid(e.target.id)
    }
})

 //function update produit
function updateproduit(){
    axios
    .put('http://localhost:3000/view/updateproduit',{
        nom: document.getElementById('nom').value,
        quantitestk: document.getElementById('quantite').value,
        prix: document.getElementById('prix').value,
        idcategorie: document.getElementById('categorie').value,
        id: document.getElementById('id').value,
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="produit à été Modifier";  
  refrech();
}

document.getElementById("updateproduit").addEventListener('click',updateproduit);


//supprimer produit
function supprimerproduit(id){
    axios
    .delete('http://localhost:3000/view/deleteproduit/'+id)
    .then(res =>console.log(res))
    .catch(err => console.error(err));
    document.getElementById('message').innerHTML="produit à été supprimer";  
    refrech();
}



document.getElementById("tableproduit").addEventListener("click",e=>{
    if (e.target.classList.contains('supprimer')) {
         confirmation( e.target.id) 
    }
})

//confiremation la suppression
function confirmation(id){
document.getElementById("msg").innerHTML=` <span>vous avez supprime cette enregistrement ? <button  class="btn btn-danger text-white btn-sm" onclick=supprimer(${id})>Ok</button> </span> <span><button class="btn btn-primary text-white btn-sm" onclick=refrech()>Annuler</button></span>`

}

function supprimer(id){
    supprimerproduit(id);
}
     
