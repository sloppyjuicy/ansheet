function mostrarDatos() {
	
	var output=
	'<div class="row text-center-2">'+
		'<h2>Hoja de respuestas digital '+ tipo_exa + '</h2>'+
		'<h3>'+area+'</h3>'+
	'</div>';
	
	output+=
	'<form action="" name="formulario" id="formulario">'+
	'<div class="row datosAlu">'+
		'<div class="col-lg-6 col-md-12 col-sm-12 col-12">'+
	    	'<input id="nombre" type="text" class="form-control" placeholder="Nombre">'+
	    '</div>'+
	    '<div class="col-lg-6 col-md-12 col-sm-12 col-12">'+
	    	'<input id="apellidos" type="text" class="form-control" placeholder="Apellidos">'+
	    '</div>'+
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
				i+']" value="'+opciones[j]+'"/> ';
		}
		output+='</li>';
	}
	output+=
		'</ol>'+
	'</div>'+

	'<div class="row text-center-2">'+
		'<div class="col">'+
			'<button class="btn btn-primary btn-lg" name="envio" id="envio"'+
			' value="Enviar" onclick="enviar()" >Enviar</button>'+
		'</div>'+
	'</div>'+
	'</form>';

	document.getElementById("lista_preg").innerHTML=output;
}