"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*	La clase Router nos permitira trabajar con el enrutador del back-end
    Request permitira que el servidor reciba peticiones.
    Response permitira que el servidor devuelva una respuesta.
    */
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const verifyToken_1 = require("../lib/verifyToken");
class UserRoutes {
    /*El constructor llama a config para que este al tanto de las rutas existentes y que hacer con ellas.*/
    constructor() {
        //Instanciamos el enrutador.
        this.router = (0, express_1.Router)();
        this.config();
    }
    /*Aqui se declaran las rutas que entiende nuestra aplicacion y las acciones a llevar
    a cabo. Generalmente se hara una llamada al metodo de un controlador existente.*/
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
        });
        /*this.router.get('/list',(req:Request,res:Response)=> {
            res.send('Listed In!!!');
        });*/
        //CRUD
        this.router.get('/list', verifyToken_1.TokenValidation, userController_1.default.list);
        //this.router.get('/list',userController.list);		
        this.router.post('/add', userController_1.default.addUser);
        this.router.get('/find/:id', userController_1.default.find);
        this.router.put('/update/:id', userController_1.default.update);
        this.router.delete('/delete/:id', userController_1.default.delete);
        this.router.post('/signin', userController_1.default.login);
        //SIGN UP
        this.router.post('/signup', userController_1.default.addUser);
    }
}
//Exportamos el enrutador del objeto usuarios con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map