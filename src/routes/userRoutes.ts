/*	La clase Router nos permitira trabajar con el enrutador del back-end
	Request permitira que el servidor reciba peticiones.
	Response permitira que el servidor devuelva una respuesta.
	*/
    import { Router, Request, Response } from 'express';
    import userController from "../controller/userController"; 
    import {TokenValidation} from "../lib/verifyToken";
    
    class UserRoutes {
        //Instanciamos el enrutador.
        public router: Router = Router();
    
        /*El constructor llama a config para que este al tanto de las rutas existentes y que hacer con ellas.*/
        constructor() {
            this.config();
        }
        /*Aqui se declaran las rutas que entiende nuestra aplicacion y las acciones a llevar
        a cabo. Generalmente se hara una llamada al metodo de un controlador existente.*/
        config(): void {
            this.router.get('/', (req: Request, res: Response) => {
                res.send('Main!!!');
            });
            /*this.router.get('/list',(req:Request,res:Response)=> {
                res.send('Listed In!!!');
            });*/
            
    
            //CRUD
            this.router.get('/list',TokenValidation,userController.list);
            //this.router.get('/list',userController.list);		
            this.router.post('/add',userController.addUser);		
            this.router.get('/find/:id',userController.find);
            this.router.put('/update/:id',userController.update);
            this.router.delete('/delete/:id',userController.delete);
            this.router.post('/signin',userController.login);
    
            //SIGN UP
            this.router.post('/signup',userController.addUser);
        
        }
    }
    
    //Exportamos el enrutador del objeto usuarios con 
    
    const userRoutes = new UserRoutes();
    export default userRoutes.router;
        