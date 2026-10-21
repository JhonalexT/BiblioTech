# BiblioTech

Creado por: Samir Santiago Jimenez, Jhon Alexander Torres y Daniel Camilo Borrero.

1- ¿Que se debe tener? - Node.js, MongoDB, Hoppscotch o Postman

2- Cómo ponerlo a funcionar - Abra una terminal dentro de la carpeta del proyecto

3- Instalacion de dependencias - npm install

4- Crear el archivo .env 

5- Abra el .env y pegue estos valores - PORT=3000
MONGO_URL=mongodb://localhost:27017/bibliotech
JWT_SECRET=escriba_aqui_una_clave_larga_cualquiera
JWT_EXPIRES_IN=4h

6- Encender el servidor - npm run start:dev

7- En la consola debe aparecer esto - Base de datos online
Servidor escuchando en el puerto 3700

8- Para crear un usuario se debe cambiar el link por defecto y pegar el sgte - http://localhost:3700/api/auth/register y cambiar el cuerpo a post y pegar { "name": "Admin Uno", "email": "admin@test.com", "password": "123456" } para crear el usuario y deberia responder con un codigo de estado 201 y ademas se genera un token