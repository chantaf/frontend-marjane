
 
 //
 function verifie(){
     let statusrole= document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
       
        if(statusrole.role=="admincentre"){
            var visible=document.getElementsByName("centre");
            for (let i = 0; i < visible.length; i++) {
                visible[i].style.display="none"
                
            }
        }
 }
 window.addEventListener('load',verifie)

 //function refrech
 function refrech(){
    window.location.reload();
 }
 //function afficher tout les promotios
 function getpromotion(){
    axios
    .get('http://localhost:3000/view/promotion')
     .then(res =>
                res.data.promotions.forEach(element => {
   
       document.getElementById("tablepromotion").innerHTML+= ` 
       <tr>
       <td>${element.nom}</td>
       <td>${element.pourcentage} %</td>
       <td>${element.pointfidelite} DH</td>
       <td>${element.datedebutpromo}</td>
       <td>${element.datefinpromo}</td>
       <td>${element.heure}</td>
       <td>${element.commentaire}</td>
       <td>${element.status}</td>
       <td>${element.idproduit}</td>
       <td class="d-flex" >  <input type="button"  class="supprimer   btn btn-danger text-white btn-sm" id="${element.id}" value="Supprimer"> &nbsp; &nbsp;
       <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
       
   </td>
        
      
   </tr>
  
       ` 
    }))

       axios
          .get('http://localhost:3000/view/produit')
          .then(res => res.data.produits.forEach(element => {
             document.getElementById("produit").innerHTML+= ` 
            <option value="${element.id}">${element.nom}</option>
             `
            }))
  
    .catch(err => console.error(err));
}


window.addEventListener('load',getpromotion)


//function quantite-stk produit
function quantite(id){
    axios
    .get('http://localhost:3000/view/editproduit/'+id)
    .then(res =>
        res.data.produit.forEach(element => {
       document.getElementById("quantite").innerHTML= ` 
      <option value="${element.id}">${element.quantitestk}</option>
       `
      }))

.catch(err => console.error(err));

}

document.getElementById("produit").addEventListener("change",e=>{
    id=document.getElementById("produit").value;
        quantite(id)
})


//function ajouter promotion
function ajouterpromotion(){
    axios
    .post('http://localhost:3000/view/addpromotion',{
        nom: document.getElementById('nom').value,
        pourcentage: document.getElementById('pourcentage').value,
        datedebutpromo:document.getElementById('datedebut').value,
        datefinpromo:document.getElementById('datefin').value,
        heure: document.getElementById('heure').value,
        commentaire: document.getElementById('commentaire').value,
        status: document.getElementById('status').value,
        idproduit: document.getElementById('produit').value,
    })
  .then(res => console.log(res))
  .catch(err => console.error(err));
  document.getElementById('message').innerHTML="promotion à été ajouter";  
  refrech();
}

document.getElementById("ajoutepromotion").addEventListener('click',ajouterpromotion);


// //function edit promotion
function getpromotionid(id){
    axios
    .get('http://localhost:3000/view/editpromotion/'+id)
    .then(res => 
        res.data.Promotion.forEach(element => {

            document.getElementById('nom').value=element.nom,
            document.getElementById('pourcentage').value=element.pourcentage,
            document.getElementById('datedebut').value=element.datedebutpromo,
            document.getElementById('datefin').value=element.datefinpromo,
            document.getElementById('heure').value=element.heure,
            document.getElementById('commentaire').value=element.commentaire,
            document.getElementById('status').value=element.status,
            document.getElementById('produit').value=element.idproduit
            document.getElementById('id').value=element.id
    })
    
    )
    .catch(err => console.error(err));
}

document.getElementById("tablepromotion").addEventListener("click",e=>{
    if (e.target.classList.contains('modifier')) {
        getpromotionid(e.target.id)
    }
})

//  //function update promotion
function updatepromotion(){
    axios
    .put('http://localhost:3000/view/updatepromotion',{
       nom: document.getElementById('nom').value,
        pourcentage: document.getElementById('pourcentage').value,
        datedebutpromo: new Date(document.getElementById('datedebut').value).toLocaleDateString(),
        datefinpromo: new Date(document.getElementById('datefin').value).toLocaleDateString(),
        heure: document.getElementById('heure').value,
        commentaire: document.getElementById('commentaire').value,
        status: document.getElementById('status').value,
        idproduit: document.getElementById('produit').value,
        id: document.getElementById('id').value,
    })
 
  .then(res => console.log(res))
  .catch(err => console.error(err));

  document.getElementById('message').innerHTML="promotion à été Modifier";  
  refrech();
}

document.getElementById("updatepromotion").addEventListener('click',updatepromotion);


// //supprimer promotion
function supprimerpromotion(id){
    axios
    .delete('http://localhost:3000/view/deletepromotion/'+id)
    .then(res =>console.log(res))
    .catch(err => console.error(err));
    document.getElementById('message').innerHTML="promotion à été supprimer";  
    refrech();
}



document.getElementById("tablepromotion").addEventListener("click",e=>{
    if (e.target.classList.contains('supprimer')) {
         confirmation( e.target.id) 
    }
})

//confiremation la suppression
function confirmation(id){
document.getElementById("msg").innerHTML=` <span>vous avez supprime cette enregistrement ? <button  class="btn btn-danger text-white btn-sm" onclick=supprimer(${id})>Ok</button> </span> <span><button class="btn btn-primary text-white btn-sm" onclick=refrech()>Annuler</button></span>`

}

function supprimer(id){
    supprimerpromotion(id);
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