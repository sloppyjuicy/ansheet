function revisar(respuestas_usuario, nombre, apellidos) {
	var contadorTotal=0;
	var resultados_usu=[];
	var contadorPart=[];

	// los contadores siempre se inician en cero duh!
	resultados_usu.push("0");
	for (var i = 0; i < materias.length; i++) {
		contadorPart.push(0);
	}

	for (var i = 1; i <respuestas_usuario.length; i++) {
		if(respuestas_usuario[i]==respuestas[i]){
			contadorTotal++;
			resultados_usu.push("&#10004");
			for (var j = 0; j < materias.length; j++) {
				if(i>=materias[j][1] && i<=materias[j][2]){contadorPart[j]++;}
			}
		}else resultados_usu.push("&#x2718");
	}
	mostrarResultados(nombre, 
		apellidos, 
		respuestas_usuario,
		contadorTotal,
		contadorPart,
		resultados_usu );
}
