const express = require('express')
const cors= require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app= express(); 
        this.port=process.env.PORT;
        this.paths ={
            auth:'/api/auth',
            buscar:'/api/buscar',
            usuarios:'/api/usuarios',
            buses:'/api/buses',
            choferes:'/api/chofer',
            itinerario:'/api/itinerario'

        }
        
        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        //Lectura y parseo del codigo
        this.app.use(express.json());
    }
    

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.buses, require('../routes/bus'));
        this.app.use(this.paths.choferes,require('../routes/chofer'));
        this.app.use(this.paths.itinerario, require('../routes/itinerario'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports= Server;