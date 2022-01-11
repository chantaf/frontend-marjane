//data responsable rayon connecter
  let data= document.cookie
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

 
 //function refrech
 function refrech(){
    window.location.reload();
 }


 //function afficher tout les promotios
 function getpromotion(){
     let date=new Date();
     let time=new Date().getHours();
 
    axios
    .get('http://localhost:3000/view/promotion')
     .then(res =>
                res.data.promotions.forEach(element => {
                  
                                if(element.status=="encoure"){
                                                if(new Date(element.datedebutpromo).toLocaleDateString()==date.toLocaleDateString() || new Date(element.datefinpromo).toLocaleDateString()<=date.toLocaleDateString()){
                                                   if(time>=8 && time<=12){
                        
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
                                                   <td class="d-flex" > 
                                                   <input type="button" class="modifier   btn btn-info btn-sm ml-2 text-white" id="${element.id}" value="Edit"/>
                                                   
                                               </td>
                                                   
                                               
                                               </tr>
                                           
                                                   ` 
                                             }
                                         }
                                       }         
                                        
                                  
    }))

}


window.addEventListener('load',getpromotion)


// //function edit promotion
function getpromotionid(id){
    axios
    .get('http://localhost:3000/view/editpromotion/'+id)
    .then(res => 
        res.data.Promotion.forEach(element => {
            document.getElementById('commentaire').value=element.commentaire,
            document.getElementById('status').value=element.status,
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

//  //function update status promotion
function updatepromotion(){
    let time=new Date().getHours();

        if(time>=8 && time<=12){
            axios
            .put('http://localhost:3000/view/updatestatuspromotion',{
                commentaire: document.getElementById('commentaire').value,
                status: document.getElementById('status').value,
                id: document.getElementById('id').value,
                idresponsable:data.id
            })
        
        .then(res => console.log(res))
        .catch(err => console.error(err));

        document.getElementById('message').innerHTML="promotion à été Modifier";  
        refrech();
        }else{
            document.getElementById('message').innerHTML="imposible de modifier le status de cette promotions"; 
        }

   
}

document.getElementById("updatepromotion").addEventListener('click',updatepromotion);





//logout
    function logout() {
  
        let date=new Date();
        let time=new Date().getHours();
 
        axios
        .get('http://localhost:3000/view/promotion')
         .then(res =>
     res.data.promotions.forEach(element => {
                   if(element.status=="encoure"){
                         if(new Date(element.datedebutpromo).toLocaleDateString()==date.toLocaleDateString() || new Date(element.datefinpromo).toLocaleDateString()<=date.toLocaleDateString()){
                            if(time>=8 && time<=12){
                              axios
                                   .put('http://localhost:3000/view/updatestatuspromotion',{
                                       commentaire: "nontraite",
                                       status: "nontraite",
                                        id: element.id,
                                        idresponsable:data.id
                                         })
                                        
                                  }
                    }}

                  
                                      
        }))
    
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