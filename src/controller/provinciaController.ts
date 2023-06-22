import { Request, Response } from 'express';
import { Provincia } from 'models/provinciaModel';
import provinceModel from '../models/provinceModel';

class ProvinciaController {

	public signin(req: Request, res: Response) {
		console.log(req.body);
		res.send('Sign In!!!');
	}

	//CRUD	

	public async list(req: Request, res: Response) {
		console.log(req.body);
		const provincias: Provincia[] = await provinceModel.listar();
		console.log(provincias);
		return res.json(provincias);

	}

	public async add(req: Request, res: Response) {
		console.log(req.body);//Body lleva los datos de la peticion POST
		//res.send('Usuario agregado!!!');
		const provincia: Provincia = req.body;
		console.log(req.body);
		//res.send('Usuario agregado!!!');
		const busqueda = await provinceModel.buscarNombre((String)(provincia.nombre));
		if (!busqueda) {
			const result = await provinceModel.crear(provincia);
			return res.json({ mensaje: '¡Provincia guardada!' });
		}
		return res.json({ mensaje: '¡La provincia ya existe!' });
	}

	public async find(req: Request, res: Response) {
		console.log(req.params.id);
		const { id } = req.params;
		const provincia: Provincia = await provinceModel.buscarId(id);
		if (provincia)
			return res.json(provincia);
		res.status(404).json({ text: "Provincia no existe" });
	}

	public async update(req: Request, res: Response) {//params lleva los datos que se pasan por URL o URI
		console.log(req.body);
		const { id } = req.params;
		const result = await provinceModel.actualizar(req.body, id);
		//res.send('Usuario '+ req.params.id +' actualizado!!!');
		return res.json({ text: 'actualizando la provincia ' + id });
	}

	public async delete(req: Request, res: Response) {//params lleva los datos que se pasan por URL o URI
		console.log(req.body);
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		const result = await provinceModel.eliminar(id);
		return res.json({ text: 'borrando la provincia ' + id });
	}
	//FIN CRUD


}

//Instanciamos el objeto controlador y lo exportamos
const provinciaController = new ProvinciaController();
export default provinciaController;