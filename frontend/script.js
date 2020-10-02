const request = new XMLHttpRequest();
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ';

request.open('GET','http://localhost:8080/api/clients',true);
request.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYwNDI0NTE1MX0.nEQaGyGl0hdsOtLIGcpzgueai-5W8ogxhmRL7lslaUpDp6M6KKg7Kgh2_RI4s7qoecPEsVZEpaCVTFKKE_5OFQ')
request.send();

request.onload = () => {

console.log(request);

if (request.status === 200){

console.log(JSON.parse(request.response));

}

else{

console.log('Error');

}

}
