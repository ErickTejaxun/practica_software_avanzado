var http = require('https');
const { json } = require('body-parser');


var host = 'api.softwareavanzado.world';
var port = 443;


//https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal

exports.cargarUsuarios = function(next)
{
    var path = '/index.php';

    var options =
    {
        host: host,
        port: null,
        path: '/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal',
        method: 'GET',
        encoding: null
    };

    invokeService(options, null, function(users, err)
    {
        if(err)
        {
            next(null,err);
        }
        else
        {
            next(users,null);
        }
    });

}



/**
 * 
 * @param {*} options estructura con los parametros para la petición http hacia la api rest
 * @param {*} jsonObject estructura para almacenar la data de los usuarios
 * @param {*} next funcion callback para el tratamiento de los datos
 */



function invokeService(options, jsonObject, next)
{
    var req = http.request(options, function(res)
    {
        var contentType = res.headers['content-type'];
        
        var data = '';
        /*Definición de eventos al tener respuesta */

        //Cada vez que se reciba data, se toma la porción de información y se concatena
        res.on('data', function(chunk)
        {            
            data+=chunk;            
        }).on('end', function()
        {
            var response = null;                    
            if(contentType.indexOf('application/hal+json') != -1)
            {
                response = JSON.parse(data);
            }
            else
            {
                console.log("Tipo de datos incorrectos");
            }

            /*Se llama a la función next para tratar los datos de los usuarios*/
            next(response, null);
        }).on('error', function(err)
        {
            console.error('Error al procesar el mensaje '+err);
        }).on('uncaughtException',function(err)
        {
            console.error(err);
        });
    }).on('error', function(err)
    {
        console.error('Peticion HTTP fallida.\t'+ err);
        /*Se llama a la función next para tratar los errores.  */
        next(null, err);
    });

    
    if(jsonObject)
    {
        req.write(jsonObject);
    }
    req.end();
};
