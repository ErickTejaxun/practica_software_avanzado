# Laboratorio Software Avanzado
## Práctica 2

Como continuación de la práctica #2 se ha agregado una capa de seguridad a la aplicación web.

1. Para la primera parte, se toma como base el proyecto nodejs anterior, el de la práctica 1, y se le agrega el uso de credenciales tipo client_credentials y token de tipo Bearer.

2. Para la segunda parte, se ha creado una nueva aplicación web, que consume la api provista, pero ahora utilizando el protocolo SOAP y haciendo uso de autenticación básica. 

## Uso
Este cliente ha sido desarrollado a través de nodejs y utilizando yarm como gestor de paquetes. 
-Nodejs v8.10.0
-yarn 1.22.4

Para instalar las librerías necesarias:
```bash
yarn install package.json
```

Para ejecutar la aplicación:
```bash
yarn start
```
### Operaciones

1. Obtención y muestra de los contactos registrados. 
```bash
http://localhost/users
```
2. Registro de nuevos contactos
```bash
http://localhost/users/registrar
```



# Autor
  Erick Tejaxún
  erickteja@gmail.com
  201213050


## Licencia
[MIT](https://choosealicense.com/licenses/mit/)