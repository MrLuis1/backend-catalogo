import express, { Application } from 'express';
import userRouter from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios' 
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    // TODO: conexion a bbdd

    async dbConnection() {
        try {
            
            await db.authenticate();
            console.log('db online');

        } catch ( error: any ) {
            throw new Error( error );
        }

    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // BODY PARSE
        this.app.use( express.json() );
        
        // PUBLIC FOLDER
        this.app.use( express.static('public') );
    };

    routes() {
        this.app.use( this.apiPaths.usuarios, userRouter );
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log( `servidor online en el puerto ${this.port}` );
        });
    };
};

export default Server;