import { createPool } from 'mysql2/promise';
import { Provincia } from './provinciaModel';

class ProvinceModel {
	private db: any; //Manejador de la bd
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'estacionamiento',
			connectionLimit: 10
		});
	}
	/* Nota: Aqui cada uno tiene que setear los parametros de su propio servidor MySQL / MariaDB.*/

    async listar() {
		//const db=this.connection;
		const provincias = await this.db.query('SELECT * FROM provincias');
		
		return provincias[0];
	}

	//Devuelve un objeto cuya fila en la tabla provincias coincide con id.
	//Si no la encuentra devuelve null
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM provincias WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	//Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
	//Si no la encuentra devuelve null
	async buscarNombre(nombre: string) {
		const encontrado: any = await this.db.query('SELECT * FROM provincias WHERE nombre = ?', [nombre]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async crear(provincia: Provincia) {
		//const result = (await this.db.query('INSERT INTO provincias SET ?', [provincia]))[0].affectedRows;
		const result = (await this.db.query('INSERT INTO provincias (nombre,capital,descripcion,imagen)VALUES(?,?,?,?)',
			[provincia.nombre,
			provincia.capital,
			provincia.descripcion,
			provincia.imagen,
			]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(provincia: Provincia, id: string) {
		const result = (await this.db.query('UPDATE provincias SET ? WHERE ID = ?', [provincia, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminar(id: string) {
		const user = (await this.db.query('DELETE FROM provincias WHERE ID = ?', [id]))[0].affectedRows;
		console.log(user);
		return user;
	}
	
}

const provinceModel: ProvinceModel = new ProvinceModel();
export default provinceModel;