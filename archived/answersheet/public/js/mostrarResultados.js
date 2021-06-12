function mostrarResultados(
	nombre,
	apellidos, 
	respuestas_usuario, 
	contadorTotal,
	contadorPart,
	resultados_usu) {
	
	document.getElementById('lista_preg').innerHTML='';
	
	var output=
	'<div class="row test-head">'+
		'<div class="col-lg-8 text-center-2">'+
			'<h3>Hoja de respuestas digital '+ tipo_exa + '</h2>'+
			'<h4>'+area+'</h3>'+
		'</div>'+
		'<div class="col-lg-4 datos-alu-2">'+
			'<h5>'+nombre+' '+apellidos+'</h4>'+
			'<h6>Aciertos totales: '+contadorTotal+'</h5>'+
		 '</div>'+
	'</div>';



	/*##########################THE_HARDOCORE_PART###########################*/

	output+=

	'<div class="multicol">'+
		'<ol>';
	for (var i = 1; i <= respuestas.length-1; i++) {
		for (var j = 0; j < materias.length; j++) {
			if (i == materias[j][1]) {
				output+='<label class="materia">'+materias[j][0]+':'+
				contadorPart[j]+'/'+
				(materias[j][2]-materias[j][1]+1)+
				'</label>';
				break;
			}
		}		
		output+='<li>';
		
		for (var j = 0; j < opciones.length; j++){
			output+= 
			'<label for="test'+i+'">'+opciones[j]+'</label> '+ 
			'<input id="test'+i+'" type="radio" name="pregunta['+
				i+']" value="'+opciones[j]+'" disabled="true" ';
			
			if (opciones[j]==respuestas_usuario[i]) 
				output+='checked="'+respuestas_usuario[i]+'"';

			output+='/> ';
		}
		output += resultados_usu[i] + '</li>';
	}
	output+=
		'</ol>'+
	'</div>';

	document.getElementById('lista_preg').innerHTML=output;
}