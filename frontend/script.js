

/* eslint-disable no-console */

const request = new XMLHttpRequest();
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ';



request.open('GET','http://localhost:8080/api/clients',true);
request.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ')
request.send();


request.onload = () => {


if (request.status === 200){


console.log(JSON.parse(request.response));
var htmltext = '';
for (let i = 0; i < JSON.parse(request.response).length; i++) {

var data = JSON.parse(request.response);
/*
console.log(i);
console.log(JSON.parse(request.response)[i]);
var user_info = document.getElementById("user_info");
user_info.innerHTML = 'Account number :' +data[i].id+ '<br> Name : '+data[i].name + '<br> Surname : ' + data[i].surname + ' <br> Balance :' + data[i].balance + ' <br> Previous transactions :(à voir) '
*/

htmltext+= '<p> Account Number : '+data[i].id+'<br>' + 'Name : '+ data[i].name + ' <br> Surname : '+ data[i].surname + '<br> Balance : ' + data[i].balance + '<br> Previous transactions :' + JSON.stringify(data[i].transactions) + '<br></p>'
document.getElementById("user_info").innerHTML = htmltext;




}

}

else{

console.log('Error');

}






}


function createclient(){

/////////////////////////////// FETCH METHOD////////////////////////////////////


const customerid = document.getElementById("CustomerID").value;


const initialCredit = document.getElementById("InitialCredit").value;




fetch("http://localhost:8080/api/acounts", {

  // Adding method type
  method: 'POST',
  headers: new Headers({

    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ',
    "Content-type": "application/json; charset=UTF-8"

  }),

  // Adding body or contents to send
  body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/camelcase
      accountID: customerid,
      // eslint-disable-next-line object-shorthand
      credit: initialCredit,

  }),





})


// POST request using fetch()
fetch("http://localhost:8080/api/clients", {

  // Adding method type
  method: 'POST',
  headers: new Headers({

    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ',
    "Content-type": "application/json; charset=UTF-8"

  }),

  // Adding body or contents to send
  body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/camelcase
      customerID: customerid,
      // eslint-disable-next-line object-shorthand
      initialcredit: initialCredit,

  }),


})







}


function maketransaction(){
const requesttransaction = new XMLHttpRequest();
const requestrecipient = new XMLHttpRequest();
const post1 = new XMLHttpRequest();
const post2 = new XMLHttpRequest();
const sender = document.getElementById("sender").value;


const receiver = document.getElementById("receiver").value;
const value  = document.getElementById("value").value;






requesttransaction.open('GET','http://localhost:8080/api/clients/'+sender,true)

requesttransaction.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ')
requesttransaction.send();


requesttransaction.onload = () => {




const datatransaction = JSON.parse(requesttransaction.response);

requestrecipient.open('GET','http://localhost:8080/api/clients/'+receiver,true)
requestrecipient.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ')
requestrecipient.send();
requestrecipient.onload = () => {

  if (requestrecipient.status === 200){ // Recipient's InitialCredit

  if (JSON.parse(requesttransaction.response).initialcredit > value){

    const temp1 = JSON.parse(requesttransaction.response).initialcredit - value;

    fetch("http://localhost:8080/api/clients/"+receiver, {

      // Adding method type
      method: 'PATCH',

      headers: new Headers({

        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ',
        "Content-type": "application/json; charset=UTF-8"

      }),


      body: JSON.stringify({

        initialcredit: temp1,

      }),



  })



  const temp2 = JSON.parse(requesttransaction.response).initialcredit - value;
  fetch("http://localhost:8080/api/clients/"+sender, {

      // Adding method type
      method: 'PATCH',
      body: JSON.stringify({

        initialcredit: temp2,

      }),
      headers: new Headers({

        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ',
        "Content-type": "application/json; charset=UTF-8"

      }),






  })





  }

else{

console.error("You have not enough money to make this transaction")

}


}


}
}
}
