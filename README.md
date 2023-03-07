<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Quitar errores de prettier

```
npm remove prettier
```

cmd + shift + P -> buscar Developer:Reload Window

## Modulos

Es un archivo que agrupa y desacopla un conjunto de funcionalidades especificas por dominio.
Ej: `auth.module.ts`, encargado de todo los relacionado a la autenticacion.
Modulos que agrupen funcionalidades como peticiones, servicios, decoradores, etc, todo los relacionado a una funcionalidad especifica.
Es una clase con decorador que indica cuales son sus importaciones, controladores, proveedores, exportaciones.

```
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

```

### Crear un modulo

```
nest g mo cars
```

Este comando crea los siguientes archivos en el root.

```
CREATE src/cars/cars.module.ts (81 bytes)
UPDATE src/app.module.ts (206 bytes)
```

Crea un archivo y actualiza la importacion en el module del root.

## Main

Es la primera funcion que se ejecuta y el punto de entrada a la aplicacion.
Cuando se ejecuta el comando de inicio se ejecuta esta funcion.
El puerto por defecto es el `3000`.
Esta funcion sirve lo que esta definido en el `AppModule`.

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```

Para levantar el servidor se escribe el comando `nest run start:dev`

## Controladores

Son funciones que controlan rutas, son los encargados de escuchar las solicitud y emitir la respuesta.
Ej: Rutas CRUD.
Generar controlador:

```
nest g co <path/nombre>
```

### Crear controlador

Usamos el siguiente comando:

```
nest g co cars
```

que nos genera lo siguiente:

```
CREATE src/cars/cars.controller.ts (97 bytes)
CREATE src/cars/cars.controller.spec.ts (478 bytes)
UPDATE src/cars/cars.module.ts (166 bytes)
```

Crea un controlador, un archivos de pruebas y actualiza el modulo mas cercano.
El controlador que creamos le podemos agregar con el decorador `@Get()` una respuesta:

```
import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return ['Toyota', 'Honda', 'Ford'];
  }
}


```

Nos habilita un `endpoint` que se encuentra en el siguiente path:

```
http://localhost:3000/cars

Responde:

[
  "Toyota",
  "Honda",
  "Ford"
]
```

que aun no tiene nada.

### Extraer informacion de la solicitud (Request)

Hay varias maneras de obtener la info de la request:

```
# Obtener parametros/segmentos
@Param('id')

# Obtener el bidy de la peticion
@Body()

# Obtener los parametros de query(siempre opcionales)
@Query()

#Obtener respose(Express/Fastify)
#Importar desde express/fastify
@Res()
```

Lo podemos usar de la siguiente forma:

```
import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Honda', 'Ford'];

  @Get()
  getAllCars() {
    return this.cars;
  }
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id') id) {  <-- Aca obtenemos el id por params
    console.log(id);
    return {
      id,
    };
  }
}

```

Por defecto cualquier segmento del url, query que venga por url es un `string`.

#### CRUD

Usar decoradors `@Get()`, `@Patch()`, `@Post()`, `@Delete()`

```
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    // throw new Error('Auxilio');
    return this.carsService.findOneById(Number(id));
  }
  @Post()
  createCar(@Body() body: any) {
    return {
      ok: true,
      method: 'Post',
      body,
    };
  }
  @Patch(':id')
  updateCar(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return {
      id,
      ok: true,
      method: 'Patch',
      body,
    };
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      ok: true,
      method: 'Delete',
    };
  }

  constructor(private readonly carsService: CarsService) {}
}

```

## Servicios

Los servicios alojan la logica de negocio de tal manera que sea reutilizable mediante inyeccion de dependencias.
Ej: PeliculasService para todo lo relacionado a obtener, grabar, actualizar o eliminar informacion de peliculas.

Todos los servicios son `providers`, no todos los providers son servicios.

### Crear servicio

```
nest g s cars --no-spec
```

Este comando genera lo siguiente:

```
CREATE src/cars/cars.service.ts (88 bytes)
UPDATE src/cars/cars.module.ts (241 bytes)
```

Crea un archivo y actualiza el modulo mas cercano.

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {}
```

Es una clase que tiene el decorador `@Injectable()` que permite ser usado en componentes cuando se lo registra.
Para inyecta el servicio en el controlador debemos declararlo en el constructor:

```
constructor(private readonly carsService: CarsService) {}
```

## Pipes

Transforma la data recibida en requests, para asegurar un tipo, valor o instancia de un objeto.
Ej: Transforma a numero, validacions, etc.

### Pipes integrados por defecto

```
ValidationPipe
ParseBoolPipe
ParseFloatPipe
ParseIntPipe
ParseArrayPipe
ParseUUIDPipe
```

Lo parse transforma alguna informacion.
Para usar el `pipe` simplement lo enviamos como otro parametro:

```
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.carsService.findOneById(Number(id));
  }
```

En este caso aplicamos el `ParseIntPipe` y este pipe nos devulve un error sino es un `id` de tipo `number`:

```
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

Este error se puede personalizar. El `pipe` ayuda a verificar si no es un numero y envia error automaticamente.

## Excepcion Zone

Nest controlla la excepciones automaticamente para que no se rompa.
Si podemos el siguiente codigo:

```
  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    throw new Error('Auxilio');
  }
```

Nest maneja la excepcion de la siguiente forma:

```
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

Evitando que la app se rompa.

## Exception Filters

Maneja los errores de codigo en mensajes de respuesta http. Usualmente Nest ya incluye todos los casos de uso comunes, pero se pueden expandir basado en las necesidades.
Estos son los mas usados pero hay más.

```
BadRequestException
NotFoundException
RequestTimeoutException
PayloadTooLargeException
UnauthorizedException
ForbiddenException
GoneException
InternalServerErrorException
```

Para usarlo en el servicio agregamos la siguiente validacion:

```
  public findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} no found`);
    }
    return car;
  }
```

Podemos personalizar el mensaje enviadolo si lo enviamos como un parametro.
Si el `car` o existe Nest nos envia la siguiente excepcion:

```
{
  "statusCode": 404,
  "message": "Car with id 4 no found",
  "error": "Not Found"
}
```

## Comandos del CLI

| Name        | Alias | Description                                                                                         |
| ----------- | :---: | --------------------------------------------------------------------------------------------------- |
| app         |       | Generate a new application within a monorepo (converting to monorepo if it's a standard structure). |
| library     |  lib  | Generate a new library within a monorepo (converting to monorepo if it's a standard structure).     |
| class       |  cl   | Generate a new class.                                                                               |
| controller  |  co   | Generate a controller declaration.                                                                  |
| decorator   |   d   | Generate a custom decorator.                                                                        |
| filter      |   f   | Generate a filter declaration.                                                                      |
| gateway     |  ga   | Generate a gateway declaration.                                                                     |
| guard       |  gu   | Generate a guard declaration.                                                                       |
| interface   |  itf  | Generate an interface.                                                                              |
| interceptor |  itc  | Generate an interceptor declaration.                                                                |
| middleware  |  mi   | Generate a middleware declaration.                                                                  |
| module      |  mo   | Generate a module declaration.                                                                      |
| pipe        |  pi   | Generate a pipe declaration.                                                                        |
| provider    |  pr   | Generate a provider declaration.                                                                    |
| resolver    |   r   | Generate a resolver declaration.                                                                    |
| resource    |  res  | Generate a new CRUD resource. See the CRUD (resource) generator for more details.                   |
| service     |   s   | Generate a service declaration.                                                                     |

Options
| Option |Description|
|----------|-------|
| --dry-run | Reports changes that would be made, but does not change the filesystem. |
| | Alias: -d |
| --project | [project] Project that element should be added to. |
| | Alias: -p |
| --flat | Do not generate a folder for the element. |
| --collection [collectionName] | Specify schematics collection. Use package name of installed npm package containing schematic. |
| | Alias: -c |
| --spec | Enforce spec files generation (default) |
| --no-spec | Disable spec files generation |

## Estructura de modulo recomendada

```
/src
    |_/common
             |_ /decorators
             |_ /dtos
             |_ /filters
             |_ /guards
             |_ /interceptors
             |_ /middleware
             |_ /pipes
             |_ common.controller.ts
             |_ common.module.ts
             |_ common.service.ts

```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
