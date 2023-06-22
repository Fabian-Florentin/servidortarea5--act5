import { Request, Response } from 'express';
import userModel from '../models/userModel';
import { Usuario } from '../models/usuarioModel';
import jwt from 'jsonwebtoken';

class UserController {

	/*public list(req:Request,res:Response){
		console.log(req.body);
		res.send('Listed In!!!');
	} */

	//CRUD	
	public async list(req: Request, res: Response) {
		console.log(req.header("Authorization"));//Observamos el valor del token
		//res.send('Listado de usuarios!!!');

		console.log(req.body);
		const usuarios: Usuario[] = await userModel.listar();
		console.log(usuarios);
		return res.json(usuarios);
		//res.send('Listado de usuarios!!!');		
	}

	public async addUser(req: Request, res: Response) {
		console.log(req.body);//Body lleva los datos de la peticion POST
		//res.send('Usuario agregado!!!');
		const usuario: Usuario = req.body;
		console.log(req.body);
		//res.send('Usuario agregado!!!');
		const busqueda = await userModel.buscarNombre((String)(usuario.nombre));
		if (!busqueda) {
			const result = await userModel.crear(usuario);
			return res.json({ mensaje: 'User saved!!' });
		}
		return res.json({ mensaje: 'User exists!!' });
	}

	public async find(req: Request, res: Response) {
		/*console.log(req.params.id); //params lleva los datos que se pasan por URL o URI
		res.send('Usuario '+ req.params.id +' encontrado!!!'); */

		console.log(req.params.id);
		const { id } = req.params;
		const usuario: Usuario = await userModel.buscarId(id);
		if (usuario)
			return res.json(usuario);
		res.status(404).json({ text: "User doesn't exists" });
	}

	public async update(req: Request, res: Response) {//params lleva los datos que se pasan por URL o URI
		/*console.log("Actualizando ",req.params.id," ",req.body);
		res.send('Usuario '+ req.params.id +' actualizado!!!'); */

		console.log(req.body);
		const { id } = req.params;
		const result = await userModel.actualizar(req.body, id);
		//res.send('Usuario '+ req.params.id +' actualizado!!!');
		return res.json({ text: 'updating a user ' + id });
	}

	public async delete(req: Request, res: Response) {//params lleva los datos que se pasan por URL o URI
		//   res.send('Usuario '+ req.params.id +' Eliminado!!!');

		console.log(req.body);
		//res.send('Usuario '+ req.params.id +' Eliminado!!!');
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		const result = await userModel.eliminar(id);
		return res.json({ text: 'deleting a user ' + id });
	}
	//FIN CRUD	

	public async login(req: Request, res: Response) {
		console.log("Datos: ", req.body); //podemos pasar objetos separados por comas para inmprimir.
		//res.send('Datos recibidos!!!');//Si los concatemamos console.log los toma como un solo objeto.
		//res.json({"Recibido":req.body});

		/*if (req.body.usuario == "Pepe" && req.body.password == "123456")
			res.json({ "login": "ok", "mensaje": "Bienvenido!!" });
		else//Falta enviar el resultado estilizado a traves de una vista
			res.status(403).json({ "login": "incorrecto", "mensaje": "Usuario y/o contraseña incorrectos!!" }); */

		const { nombre, password } = req.body; /* hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.*/
		const result: Usuario = await userModel.buscarNombre(nombre);
		console.log(nombre);
		console.log(password);
		console.log(result);
		if (result != null) {
			if (result.nombre == nombre && result.password == password) {
				const token:string=jwt.sign({_id: result.id},"secretKey");
				//res.json({ "login": "ok", "mensaje": "Bienvenido!!" });
				res.json({ "login":"ok","mensaje":"Bienvenido "+result.nombre,token:token});
				return;
			}
		}
		res.status(403).json({ "login": "incorrecto", "mensaje": "Usuario y/o contraseña incorrectos!!" });


		console.log("Usuario: ", req.body.usuario);
		console.log("Password: ", req.body.password);
	}


}

//Instanciamos el objeto controlador y lo exportamos
const userController = new UserController();
export default userController;