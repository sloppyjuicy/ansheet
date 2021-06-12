var respuestas;

function leer(){
	var fileInput = document.getElementById('fileInput');
		//var file = fileInput.files[0];
		var file = new File([""], "file.txt");

		var textType = /text.*/;

		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				respuestas = reader.result;
			}

			alert("archivo leido");
			alert(respuestas);
			//go to new window
			//window.open('https://www.codexworld.com', '_self');

			reader.readAsText(file);	
		} else {
			alert("Este archivo no es soportado");
		}
}
