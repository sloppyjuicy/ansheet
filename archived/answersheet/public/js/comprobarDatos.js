function comprobarDatos() {
	
	var output=
	'<div class="row text-center-2">'+
		'<h2>Clave '+ tipo_exa + '</h2>'+
		'<h3>'+area+'</h3>'+
	'</div>';

	output+=

	'<div class="multicol">'+
		'<ol>';
	for (var i = 1; i <= respuestas.length-1; i++) {
		for (var j = 0; j < materias.length; j++) {
			/*Si  el rango comienza otra seccion de pregunta de otra
			  materia entonces la condicion se hace valida y escribe el
			  nombre de la asigntura que corresponde*/
			if (i == materias[j][1]) {
				output+='<label class="materia">'+materias[j][0]+'</label>';
				break;
			}
		}		
		output+='<li>';

		/*	Todo el for es para conseguir lo siguiente: 
			1. A o B o C o D o
		*/
		for (var j = 0; j < opciones.length; j++){
			output+= 
			'<label for="test'+i+'">'+opciones[j]+'</label> '+ 
			'<input id="test'+i+'" type="radio" name="pregunta['+
				i+']" value="'+opciones[j]+'" disabled="true" ';
			
			if (opciones[j]==respuestas[i]) 
				output+='checked="'+respuestas[i]+'"';

			output+='/> ';
		}

		output+='</li>';
	}
	output+=
		'</ol>'+
	'</div>';

	document.getElementById("lista_preg").innerHTML=output;

}