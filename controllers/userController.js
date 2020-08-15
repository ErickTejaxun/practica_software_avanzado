var userService = require('../services/userService');
const { PreconditionFailed } = require('http-errors');

exports.listUsers = function(req, res)
{
    //console.log('Iniciando petición');
    userService.cargarUsuarios(function(users, err)
    {
        if(err)
        {
            console.error('Error al recuperar los usuarios');
            res.render('error', {
                message: 'Se ha producido un error',
                error: null
            });
        }
        else
        {
            //console.log('Usuarios recuperados: ', users['_embedded']['item']);
            //console.log('Renderizando página\t' + JSON.stringify(users));
            res.render('user',{users: users['_embedded']['item']});            
        }
    });
};


exports.registrarUsers = function(req, res)
{
    //console.log('Iniciando petición');
    userService.registrarUsuario(function(users, err)
    {
        if(err)
        {
            console.error('Error al almacenar nuevo');
            res.render('error', {
                message: 'Se ha producido un error',
                error: null
            });
        }
        else
        {
            res.render('index');            
        }
    });
};