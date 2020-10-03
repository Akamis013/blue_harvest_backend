

/* eslint-disable no-console */
const request = new XMLHttpRequest();
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ';



request.open('GET','http://localhost:8080/api/clients',true);
request.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ')
request.send();


request.onload = () => {


if (request.status === 200){

console.log(JSON.parse(request.response));
console.log(JSON.parse(request.response).length);

var htmltext = '';
for (let i = 0; i < JSON.parse(request.response).length; i++) {

  var data = JSON.parse(request.response);
  /*
  console.log(i);
  console.log(JSON.parse(request.response)[i]);
  var user_info = document.getElementById("user_info");
  user_info.innerHTML = 'Account number :' +data[i].id+ '<br> Name : '+data[i].name + '<br> Surname : ' + data[i].surname + ' <br> Balance :' + data[i].balance + ' <br> Previous transactions :(à voir) '
*/

htmltext+= '<p> Account Number : '+data[i].id+'<br>' + 'Name : '+ data[i].name + ' <br> Surname : '+ data[i].surname + '<br> Balance : ' + data[i].balance + '<br> Previous transactions :(à voir)' + '<br></p>'
document.getElementById("user_info").innerHTML = htmltext;






}

}

else{

console.log('Error');

}






}


function createclient(){
/*
  const request = new XMLHttpRequest();
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ';
  let customerid = document.getElementById("CustomerID").value;


  let initialCredit = document.getElementById("InitialCredit").value;



  request.open('POST','http://localhost:8080/api/clients',true);
  request.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ')
  //request.send(JSON.stringify("customer_id:" + customerid + "name : " +"surname"+"balance" + "InitialCredit"+ initialCredit));
  const data = {element : customerid}
  request.send(JSON.stringify(data));


  //alert(JSON.stringify("CustomerID:" + customerid + " InitialCredit"+ initialCredit));
*/
/////////////////////////////// FETCH METHOD////////////////////////////////////


const customerid = document.getElementById("CustomerID").value;


  const initialCredit = document.getElementById("InitialCredit").value;

alert ("Client numéro " + customerid + "Credit de " + initialCredit )

// POST request using fetch()
fetch("http://localhost:8080/api/clients", {

    // Adding method type
    method: "POST",
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

// Converting to JSON
.then(response => response.json())

// Displaying results to console
.then(json => console.log(json));




}


function sameID(){



}
