# blue_harvest_backend

Hello and welcome to my application . This application is based on several technologies and languages who will be explained across this file .

## What do you need to compile this project ?

Actually , you only need to download WAMPSERVER on this link:

https://www.wampserver.com/en/download-wampserver-64bits/

WAMPSERVER will install a developpement Mysql server on your computer and also phpmyadmin to facilitiate your interaction with your database.

## How does it work ?

This project is composed on two major parts :

### The front-end

The front-end is based in the frontend folder , you will see an `index.html` which will display the necessary information and a `script.js` file which will contain the main algorithm to make direct calls to API .

### The Jhipster Application

Jhipster is an open source library to create modern web application and microservice architectures . Find below the architecture for Jhipster in the case of a society :

![Architecture](pictures\microservices_architecture_2.png)

In our case ,we will only consider the gateway part .

Before the compile of this project, you must install and configure the following dependencies on your machine through:

```
npm install
```

It will install the necessary library (with the package.json file) to compile our Jhipster program

Then run these command below to compile it

```
./mvnw (in case you are on Linux/Mac device)
mvnw (in case you are on a windows device)
```

If you have some errors with this , just make those two commands :

```
mvnw clean
mvnw
```

It will reset the necessary files to compile correctly this project

If that's the case , you will access to this view on your browser (http://localhost:8080/)

![Exemple](pictures\screenshot_1.png)

Sign in with the necessary information (login = "admin" password = "admin") and you will get an access to a lot of data such as performance data and also entities who are in your database
</br>
</br>
</br>

## Future Improvements ?

</br>
Unfortunatly for some reasons , some functionnalities could not be implemented in this project , here are the main ones :

<ol>
<li> Concerning the transaction service , this could not be done because the PATCH request is not yet implemented in Jhipster . But I saw (https://github.com/jhipster/generator-jhipster/pull/12507) this is a futur improvement who could be implement in the next few days</li>
<li>Maybe it would be better to implement the relationships between entities by myself. Indeed , some validation rules may not be correctly implemented</li>
<li>Make more improvements about the front end</li>

</ol>
</br>
</br>

## Technology used

<ul>
<li>JAVA  </li>
<li>HTML</li>
<li>Javascript</li>
<li>Maven</li>

</ul>
