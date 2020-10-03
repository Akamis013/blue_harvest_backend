# blue_harvest_backend

Hello and welcome to my application . This application is based on several technologies and languages who will be explained across this file .

## What do you need to compile this project ?

Actually , you only need to download WAMPSERVER on this link:

https://www.wampserver.com/en/download-wampserver-64bits/

WAMPSERVER will install a Mysql server on your computer and also phpmyadmin to facilitiate your interaction with your database.

## How does it work ?

This project is composed on two major parts :

### The front-end

The front-end is based in the frontend folder , they are actually an `index.html` which will display the necessary information and a `script.js` file which will contain the main algorithm to make direct calls to API.

### The Jhipster Application

Jhipster is an open source library to create modern web application and microservice architectures . Find below the architecture for Jhipster in the case of a society :

![Architecture](pictures\microservices_architecture_2.png)

In our case ,we will only consider the gateway part .

Before you can build this project, you must install and configure the following dependencies on your machine:

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

## Building for production

### Packaging as jar

To build the final jar and optimize the blue_harvest_backend application for production, run:

```

./mvnw -Pprod clean verify


```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```

java -jar target/*.jar


```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```

./mvnw -Pprod,war clean verify


```

## Testing

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:

```
docker-compose -f src/main/docker/mysql.yml up -d
```

To stop it and remove the container, run:

```
docker-compose -f src/main/docker/mysql.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
./mvnw -Pprod verify jib:dockerBuild
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d
```

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.10.3 archive]: https://www.jhipster.tech/documentation-archive/v6.10.3
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.10.3/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.10.3/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.10.3/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.10.3/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.10.3/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.10.3/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: https://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
[openapi-generator]: https://openapi-generator.tech
[swagger-editor]: https://editor.swagger.io
[doing api-first development]: https://www.jhipster.tech/documentation-archive/v6.10.3/doing-api-first-development/
