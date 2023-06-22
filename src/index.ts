import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import provinciaRoutes from './routes/provinciaRoutes';
import userRoutes from './routes/userRoutes';

class Server {
    public app: Application;
    constructor() {
        this.app = express();

        //El constructor ejecuta metodos que indicaran configuracion inicial del servidor
        this.config();
        this.routes();

    }
    config(): void {
        //Configuraciones
        this.app.set('port', process.env.PORT || 3000);

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(cors()); //iniciamos cors
        this.app.use(express.json()); //habilitamos el intercambio de objetos json entre aplicaciones
        this.app.use(express.urlencoded({ extended: false }));//habilitamos para recibir datos a traves de formularios html.

        //Variables globales
    }
    routes(): void {
        this.app.use(indexRoutes);
        this.app.use("/provincia", provinciaRoutes);
        this.app.use("/user",userRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Sever escuchando en puerto: " + this.app.get('port'));
        }
        );
    }
}

const server = new Server();
server.start(); //Ejecutamos el metodo start en inica el server