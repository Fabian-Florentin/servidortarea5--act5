"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provinciaController_1 = __importDefault(require("../controller/provinciaController"));
class ProvinciaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
        });
        //CRUD
        this.router.get('/list', provinciaController_1.default.list);
        this.router.post('/add', provinciaController_1.default.add);
        this.router.get('/find/:id', provinciaController_1.default.find);
        this.router.put('/update/:id', provinciaController_1.default.update);
        this.router.delete('/delete/:id', provinciaController_1.default.delete);
    }
}
const provinciaRoutes = new ProvinciaRoutes();
exports.default = provinciaRoutes.router;
//# sourceMappingURL=provinciaRoutes.js.map