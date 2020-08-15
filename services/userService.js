var http = require('https');
var soap = require('soap');
const EasySoap = require('easysoap');
const { json } = require('body-parser');
const querystring = require('querystring');
var request = require('request');
const { response } = require('../app');


var host = 'api.softwareavanzado.world';
var port = 443;
var contador = 10;

var url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap&wsdl';


/**
 * 
 * @param {*} next Funcion que se encarga del manejo de la respuesta del servidor
 * Esta función tiene como objetivo obtener la lista de contactos del servidor y listarlos en la vista correspondiente. 
 */

exports.cargarUsuarios = function(next)
{
    var username = 'sa';
    var password = 'usac';
    const params = 
    {
        host: 'https://api.softwareavanzado.world',
        path: '/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap&wsdl',
        wsdl: '/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap&wsdl',
        headers: [{
            'Authorization' : 'Basic ' + new Buffer('sa' + ':' + 'usac').toString('base64'),
            'user-agent'    : '201213050Cliente',
            'Content-Type'  : 'text/plain;charset=UTF-8'
        }]
    }
            
    /*
        * create the client
        */
    var soapClient = EasySoap(params);
    
    
    /*
    soapClient.getAllFunctions()
       .then((functionArray) => { console.log(functionArray); })
       .catch((err) => { throw new Error(err); });
    */
    
    
    soapClient.getMethodParamsByName('readList')
       .then((methodParams) => {
          //console.log(JSON.stringify(methodParams.request));
          console.log(JSON.stringify(methodParams.response));
        })
        .catch((err) => { throw new Error(err); });
    
    
    soapClient.call({
       method    : 'readList',
       attributes: {        
       },
       params: {        
       }
    })
    .then((callResponse) => {
        console.log(callResponse.data['definitions']/*['message']['schema']*/); // response data as json
        console.log(callResponse.body); // response body
        console.log(callResponse.header);  //response header
    })
    .catch((err) => { throw new Error(err); });
    
}

/**
 * 
 * @param {*} next Funcion que se encarga del manejo de la respuesta del servidor
  * Esta función tiene como objetivo enviar una petición de creación de contacto al servidor por medio del método POST.
 */
exports.registrarUsuario = function(next)
{
    var postData = JSON.stringify({name: "201213050 Usuario 1"});

    const data = JSON.stringify({
        name: '201213050-Usuario1'        
    });    
    
    var options =
    {
        uri: 'https://'+ host+'/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal',
        form: 
        {
            name: '201213050-Usuario'+contador++,            
        }               
        
    };

    invokeServiceReg(options, postData, function(users, err)
    {
        if(err)
        {
            next(null, "Error al registrar al usuario");            
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
        res.setEncoding('utf8');
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



/**
 * 
 * @param {*} options estructura con los parametros para la petición http hacia la api rest
 * @param {*} jsonObject estructura para almacenar la data de los usuarios
 * @param {*} next funcion callback para el tratamiento de los datos
 */
function invokeServiceReg(options, jsonObject, next)
{
    console.log("Realizando operación POST");
    var req = request.post(options, (err, res, body) => 
    {
        if (err) 
        {
            console.error('Peticion HTTP fallida.\t'+ err);
            /*Se llama a la función next para tratar los errores.  */
            next(null, err);
        }
        next(response, null);
    });
};