/* 
	Necesitamos que la calculadora responda a las operaciones basicas
	Suma, Resta, Multiplicacion y Division.
	Tambien vamos a tomar los operandos desde los argumentos de la terminal.
*/

//Traemos las operaciones del script 'calculadora.js'
const calculadora = require("./calculadora");

//Traemos el modulo de filesystem de nodejs
const fs = require("fs");
//Leemos el archivo (sincrónicamente)
const logsJSON = fs.readFileSync("logs.json", { encoding: "utf-8" });
//Parseamos el string de JSON a un array de logs.
const logs = JSON.parse(logsJSON);

/*
Los argumentos vienen de la siguiente manera:
	node app.js [operacion] [operandos]...
Es decir que en argv, vamos a tenerlo como un array asi:
	["node","app.js","operacion","operando1","operando2",... etc]
*/

//Tomamos la operacion y los operandos de argv.
//Notar que salteamos los primeros dos argumentos
const [, , operacion, ...operandos] = process.argv;

switch (operacion) {
	case "sumar":
		{
			//Ejecutamos la operacion con todos los operandos.
			let resultado = calculadora.sumar(...operandos);
			//Imprimimos el resultado en la terminal
			console.log(resultado);
			//Guardamos la nueva operacion en el array de logs.
			logs.push(
				//Con reduce concatenamos los operandos separados por
				//el signo de la operacion.
				operandos.reduce((res, elem) => {
					return res + "+" + elem;
				}) +
				//Y al final le agregamos un igual y el resultado
					"=" +
					resultado
			);
		}
		break;
	case "restar":
		{
			let resultado = calculadora.restar(...operandos);
			console.log(resultado);
			logs.push(
				operandos.reduce((res, elem) => {
					return res + "-" + elem;
				}) +
					"=" +
					resultado
			);
		}
		break;
	case "multiplicar":
		{
			let resultado = calculadora.multiplicar(...operandos);
			console.log(resultado);
			logs.push(
				operandos.reduce((res, elem) => {
					return res + "*" + elem;
				}) +
					"=" +
					resultado
			);
		}
		break;
	case "dividir":
		{
			let resultado = calculadora.dividir(...operandos);
			console.log(resultado);
			logs.push(
				operandos.reduce((res, elem) => {
					return res + "/" + elem;
				}) +
					"=" +
					resultado
			);
		}
		break;
	case "historial":
		{
			logs.forEach((elem, i) => {
				console.log("[" + i + "] " + elem);
			});
		}
		break;
	default:
		console.log("No reconozco la operacion!!");
}

//Convertimos el array de logs a un string de JSON
let strigified = JSON.stringify(logs, null, 4);

//Escribimos el string al archivo 'logs.json'
fs.writeFileSync("logs.json", strigified);
