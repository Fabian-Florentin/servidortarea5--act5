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
const provinceModel_1 = __importDefault(require("../models/provinceModel"));
class ProvinciaController {
    signin(req, res) {
        console.log(req.body);
        res.send('Sign In!!!');
    }
    //CRUD	
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const provincias = yield provinceModel_1.default.listar();
            console.log(provincias);
            return res.json(provincias);
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body); //Body lleva los datos de la peticion POST
            //res.send('Usuario agregado!!!');
            const provincia = req.body;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield provinceModel_1.default.buscarNombre((String)(provincia.nombre));
            if (!busqueda) {
                const result = yield provinceModel_1.default.crear(provincia);
                return res.json({ mensaje: '¡Provincia guardada!' });
            }
            return res.json({ mensaje: '¡La provincia ya existe!' });
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const provincia = yield provinceModel_1.default.buscarId(id);
            if (provincia)
                return res.json(provincia);
            res.status(404).json({ text: "Provincia no existe" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield provinceModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'actualizando la provincia ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield provinceModel_1.default.eliminar(id);
            return res.json({ text: 'borrando la provincia ' + id });
        });
    }
}
//Instanciamos el objeto controlador y lo exportamos
const provinciaController = new ProvinciaController();
exports.default = provinciaController;
//# sourceMappingURL=provinciaController.js.map