"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    /*public list(req:Request,res:Response){
        console.log(req.body);
        res.send('Listed In!!!');
    } */
    //CRUD	
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization")); //Observamos el valor del token
            //res.send('Listado de usuarios!!!');
            console.log(req.body);
            const usuarios = yield userModel_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');		
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body); //Body lleva los datos de la peticion POST
            //res.send('Usuario agregado!!!');
            const usuario = req.body;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModel_1.default.buscarNombre((String)(usuario.nombre));
            if (!busqueda) {
                const result = yield userModel_1.default.crear(usuario);
                return res.json({ mensaje: 'User saved!!' });
            }
            return res.json({ mensaje: 'User exists!!' });
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*console.log(req.params.id); //params lleva los datos que se pasan por URL o URI
            res.send('Usuario '+ req.params.id +' encontrado!!!'); */
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*console.log("Actualizando ",req.params.id," ",req.body);
            res.send('Usuario '+ req.params.id +' actualizado!!!'); */
            console.log(req.body);
            const { id } = req.params;
            const result = yield userModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating a user ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //   res.send('Usuario '+ req.params.id +' Eliminado!!!');
            console.log(req.body);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.eliminar(id);
            return res.json({ text: 'deleting a user ' + id });
        });
    }
    //FIN CRUD	
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Datos: ", req.body); //podemos pasar objetos separados por comas para inmprimir.
            //res.send('Datos recibidos!!!');//Si los concatemamos console.log los toma como un solo objeto.
            //res.json({"Recibido":req.body});
            /*if (req.body.usuario == "Pepe" && req.body.password == "123456")
                res.json({ "login": "ok", "mensaje": "Bienvenido!!" });
            else//Falta enviar el resultado estilizado a traves de una vista
                res.status(403).json({ "login": "incorrecto", "mensaje": "Usuario y/o contraseña incorrectos!!" }); */
            const { nombre, password } = req.body; /* hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.*/
            const result = yield userModel_1.default.buscarNombre(nombre);
            console.log(nombre);
            console.log(password);
            console.log(result);
            if (result != null) {
                if (result.nombre == nombre && result.password == password) {
                    const token = jsonwebtoken_1.default.sign({ _id: result.id }, "secretKey");
                    //res.json({ "login": "ok", "mensaje": "Bienvenido!!" });
                    res.json({ "login": "ok", "mensaje": "Bienvenido " + result.nombre, token: token });
                    return;
                }
            }
            res.status(403).json({ "login": "incorrecto", "mensaje": "Usuario y/o contraseña incorrectos!!" });
            console.log("Usuario: ", req.body.usuario);
            console.log("Password: ", req.body.password);
        });
    }
}
//Instanciamos el objeto controlador y lo exportamos
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map