
//function refrech
function refrech(){
    window.location.reload();
 }

 //function afficher tout les centres
 function getcountadmincentre(){
     //count admin centre
    axios
    .get('http://localhost:3000/view/countadmincentre')
     .then(res => 
        res.data.countadmincentre.forEach(element => {
        document.getElementById("cardadmin").innerHTML= ` ${element.countadmin} Personnes` 

         }))
    .catch(err => console.error(err));


         //count responsable
         axios
         .get('http://localhost:3000/view/countresponsable')
          .then(res => 
             res.data.countresponsable.forEach(element => {
             document.getElementById("cardresponsable").innerHTML= ` ${element.countresponsable} Personnes` 
     
              }))
         .catch(err => console.error(err));


          //count produit
          axios
          .get('http://localhost:3000/view/countproduit')
           .then(res => 
              res.data.countproduit.forEach(element => {
              document.getElementById("cardproduit").innerHTML= ` ${element.countproduit} Produits` 
      
               }))
          .catch(err => console.error(err));


            //count promotion
            axios
            .get('http://localhost:3000/view/countpromotion')
             .then(res => 
                res.data.countpromotion.forEach(element => {
                document.getElementById("cardpromotion").innerHTML= ` ${element.countpromotion} Prmotions` 
        
                 }))
            .catch(err => console.error(err));

            //count status promotions
            axios
            .get('http://localhost:3000/view/promotion')
             .then(res =>{
                let encoure=0;
                let valider=0;
                let refuser=0;
                let nontraite=0; 
        
                 res.data.promotions.forEach(element => {
               if(element.status=="valider"){
                    valider++;
               }else if(element.status=="encoure"){
                    encoure++;
               }else if(element.status=="refuser"){
                     refuser++;
        
               }else{
                    nontraite++;
               }
            }
            )

                    //statistique par status
                    const data = {
                        labels: [
                            'Valider',
                            'Refuser',
                            'Encoure',
                            'Nontraité'
                        ],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [valider,refuser,encoure,nontraite],
                            backgroundColor: [
                            '#006400',
                            '#DC143C',
                            '#1E90FF',
                            '#800000',
                            ],
                            hoverOffset: 4
                        }]
                    };
                    const config = {
                        type: 'doughnut',
                        data: data,
                    };
        
                    const myChart = new Chart(
                        document.getElementById('myChart'),
                        config
                    );
        
        })
    

                //statistique par mois

                axios
                .get('http://localhost:3000/view/promotion')
                 .then(res =>{
                    let encoure1=0, encoure2=0,encoure3=0,encoure4=0,encoure5=0,encoure6=0,encoure7=0,encoure8=0,encoure9=0,encoure10=0,encoure11=0,encoure12=0;
                    let valider1=0,valider2=0,valider3=0,valider4=0,valider5=0,valider6=0,valider7=0,valider8=0,valider9=0,valider10=0,valider11=0,valider12=0;
                    let refuser1=0,refuser2=0,refuser3=0,refuser4=0,refuser5=0,refuser6=0,refuser7=0,refuser8=0,refuser9=0,refuser10,refuser11=0,refuser12=0;
                    let nontraite1=0,nontraite2=0,nontraite3=0,nontraite4=0,nontraite5=0,nontraite6=0,nontraite7=0,nontraite8=0,nontraite9=0,nontraite10=0,nontraite11=0,nontraite12=0;
            
                     res.data.promotions.forEach(element => {
                   if(element.status=="encoure"){
                      
                        switch(new Date(element.datedebutpromo).getMonth()+1){
                           case 1:encoure1++;break;
                           case 2:encoure2++;break;
                           case 3:encoure3++;break;
                           case 4:encoure4++;break;
                           case 5:encoure5++;break;
                           case 6:encoure6++;break;
                           case 7:encoure7++;break;
                           case 8:encoure8++;break;
                           case 9:encoure9++;break;
                           case 10:encoure10++;break;
                           case 11:encoure11++;break;
                           case 12:encoure12++;break;
                        }
                }else if(element.status=="valider"){
                    switch(new Date(element.datedebutpromo).getMonth()+1){
                        case 1:valider1++;break;
                        case 2:valider2++;break;
                        case 3:valider3++;break;
                        case 4:valider4++;break;
                        case 5:valider5++;break;
                        case 6:valider6++;break;
                        case 7:valider7++;break;
                        case 8:valider8++;break;
                        case 9:valider9++;break;
                        case 10:valider10++;break;
                        case 11:valider11++;break;
                        case 12:valider12++;break;
                     }
                }else if(element.status=="refuser"){
                    switch(new Date(element.datedebutpromo).getMonth()+1){
                        case 1:refuser1++;break;
                        case 2:refuser2++;break;
                        case 3:refuser3++;break;
                        case 4:refuser4++;break;
                        case 5:refuser5++;break;
                        case 6:refuser6++;break;
                        case 7:refuser7++;break;
                        case 8:refuser8++;break;
                        case 9:refuser9++;break;
                        case 10:refuser10++;break;
                        case 11:refuser11++;break;
                        case 12:refuser12++;break;
                     }
                }else{
                    switch(new Date(element.datedebutpromo).getMonth()+1){
                        case 1:nontraite1++;break;
                        case 2:nontraite2++;break;
                        case 3:nontraite3++;break;
                        case 4:nontraite4++;break;
                        case 5:nontraite5++;break;
                        case 6:nontraite6++;break;
                        case 7:nontraite7++;break;
                        case 8:nontraite8++;break;
                        case 9:nontraite9++;break;
                        case 10:nontraite10++;break;
                        case 11:nontraite11++;break;
                        case 12:nontraite12++;break;
                     }
                }
               
            }
          
                )
        const data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
            datasets: [{
                              label: 'Nontraite',
                              backgroundColor: 'black',
                              borderColor: 'black',
                              data: [nontraite1,nontraite2,nontraite3,nontraite4,nontraite5,nontraite6,nontraite7,nontraite8,nontraite9,nontraite10,nontraite11,nontraite12],
                          },
                          {
                              label: 'Encours',
                              backgroundColor: '#3c91e6',
                              borderColor: '#3c91e6',
                              data: [encoure1,encoure2,encoure3,encoure4,encoure5,encoure6,encoure7,encoure8,encoure9,encoure10,encoure11,encoure12],
                          },
                          {
                              label: 'Refuser',
                              backgroundColor: 'red',
                              borderColor: 'red',
                              data: [refuser1,refuser2,refuser3,refuser4,refuser5,refuser6,refuser7,refuser8,refuser9,refuser10,refuser11,refuser12],
                          },

                          {
                            label: 'Valider',
                            backgroundColor: 'aqua',
                            borderColor: 'aqua',
                            data: [valider1,valider2,valider3,valider4,valider5,valider6,valider7,valider8,valider9,valider10,valider11,valider12],
                        }
                      ]
          };
          
          const config = {
            type: 'line',
            data: data,
            options: {
              responsive: true,
              interaction: {
                intersect: false,
                axis: 'x'
              },
              plugins: {
                title: {
                  display: true,
                
                }
              }
            }
          };
          
          const myChart = new Chart(
                                  document.getElementById('myChart1'),
                                  config
                              );
                           
                            }) 
}

window.addEventListener('load',getcountadmincentre)


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