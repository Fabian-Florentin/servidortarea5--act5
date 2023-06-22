  import { Router, Request, Response } from 'express';
  import provinciaController from '../controller/provinciaController';

    class ProvinciaRoutes{
        public router: Router = Router();	


        constructor(){
            this.config();
        }

        
        config():void{
            this.router.get('/',(req:Request,res:Response)=> {
                res.send('Main!!!');
            });

            //CRUD
		this.router.get('/list',provinciaController.list);		
		this.router.post('/add',provinciaController.add);		
		this.router.get('/find/:id',provinciaController.find);
		this.router.put('/update/:id',provinciaController.update);
		this.router.delete('/delete/:id',provinciaController.delete);
        }
    }

    
    const provinciaRoutes = new ProvinciaRoutes();
    export default provinciaRoutes.router;