### Instructions

To run the following project you will need to have [NodeJS][node.js] installed



Main libs used:
  - **[TypeScript][typescript]**
  - **[Express][express]**
  - **[Jest][jest]**
  - **[Joi][joi]**
  
  


#### Steps

##### Clone code from git
```
$  git clone https://github.com/felbarboza/PYYNE.git
```

##### Install Dependencies


```sh
# Instalando as dependências do challenge:
$ cd ./PYYNE
$ npm i
```

##### Run server
```sh
$ npm run start:dev
```

##### Check available routes

If you reach: http://localhost:3000/api-docs
You will find a swagger documentation of the project, enabling you to try it out

**The dates must be in ISO format**
*Example: 2022-11-27T15:57:00.000Z*

#### Testability

In order to run the tests, run the following command:

```sh
$ npm run test
```


#### Possible commands

The project also have other commands to facilitate it's use

Lint checking
```sh
$ npm run check:lint
```
Lint fixing
```sh
$ npm run fix:lint
```
Build
```sh
$ npm run build
```
Test with watch
```sh
$ npm run test:watch
```
Test with coverage
```sh
$ npm run test:cov
```
Generate new swagger doc for new routes
```sh
$ npm run fix:swagger-autogen
```





   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
  [typescript]: https://www.typescriptlang.org/
  [express]: https://expressjs.com/
  [cors]: https://expressjs.com/en/resources/middleware/cors.html
  [jest]: https://jestjs.io/pt-BR/
  [joi]: https://joi.dev/api/
