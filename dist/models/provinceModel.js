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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class ProvinceModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield (0, promise_1.createPool)({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'estacionamiento',
                connectionLimit: 10
            });
        });
    }
    /* Nota: Aqui cada uno tiene que setear los parametros de su propio servidor MySQL / MariaDB.*/
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const provincias = yield this.db.query('SELECT * FROM provincias');
            return provincias[0];
        });
    }
    //Devuelve un objeto cuya fila en la tabla provincias coincide con id.
    //Si no la encuentra devuelve null
    buscarId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM provincias WHERE id = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
    //Si no la encuentra devuelve null
    buscarNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM provincias WHERE nombre = ?', [nombre]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    crear(provincia) {
        return __awaiter(this, void 0, void 0, function* () {
            //const result = (await this.db.query('INSERT INTO provincias SET ?', [provincia]))[0].affectedRows;
            const result = (yield this.db.query('INSERT INTO provincias (nombre,capital,descripcion,imagen)VALUES(?,?,?,?)', [provincia.nombre,
                provincia.capital,
                provincia.descripcion,
                provincia.imagen,
            ]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro actualizar el usuario indicado por id
    actualizar(provincia, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE provincias SET ? WHERE ID = ?', [provincia, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM provincias WHERE ID = ?', [id]))[0].affectedRows;
            console.log(user);
            return user;
        });
    }
}
const provinceModel = new ProvinceModel();
exports.default = provinceModel;
//# sourceMappingURL=provinceModel.js.map