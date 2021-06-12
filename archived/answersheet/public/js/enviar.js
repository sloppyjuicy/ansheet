function enviar() {
	var respuestas_usuario=[undefined];
	for (var i = 1; i <= respuestas.length-1; i++){
		res = getRadioVal(document.getElementById('formulario'), 'pregunta['+i+']');
		if (res==undefined) 
			respuestas_usuario.push("NP");
		else
			respuestas_usuario.push(res);
	}
	nombre = document.getElementById('nombre').value;
	apellidos = document.getElementById('apellidos').value;
	revisar(respuestas_usuario, nombre, apellidos);
}