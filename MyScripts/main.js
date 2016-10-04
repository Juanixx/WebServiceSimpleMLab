$(document).ready(function() {
	sessionStorage.removeItem('IDlibroActual');
	$('#agregarLibro').on('submit', function(e){
		e.preventDefault();

		//console.log('Subido');
		var titulo = $('#titulo').val();
		var categoria = $('#categoria').val();
		var resumen = $('#resumen').val();

		if (sessionStorage.getItem('IDlibroActual') != null) {
			var id = sessionStorage.getItem('IDlibroActual');
			var url = 'https://api.mlab.com/api/1/databases/wstopicos/collections/libros/'+id+'?apiKey=JZc6-qitXH-d49R5nRzYF6aXJfYZOtCd';
			var tipo='PUT';
		}else{
			var url = 'https://api.mlab.com/api/1/databases/wstopicos/collections/libros?apiKey=JZc6-qitXH-d49R5nRzYF6aXJfYZOtCd';
			var tipo='POST';
		}
//return;
		

		$.ajax({ 
			url: url,
		  	data: JSON.stringify({ 
		  		"titulo":titulo,
		  		"categoria":categoria,
		  		"resumen": resumen
		  	}),
		  	type: tipo,
		 	contentType: "application/json",
		 	success: function(data){
		 		//console.log('Hola mundo: subido XD');
		 		window.location.href="index.html"
		 	},
		 	error: function(xhr, status, err) {
		 		console.log(err);
		 	}
		 });
	});
	$('body').on('click', '#editarLibro', function(e){
		e.preventDefault();
		sessionStorage.setItem('IDlibroActual', $(this).data('id')); 
		//console.log('editarLibro');
		//console.log($(this).data('id'));
		$('#titulo').val($(this).data('titulo'));
		$('#categoria').val($(this).data('categoria'));
		$('#resumen').val($(this).data('resumen'));

	});

	$('body').on('click', '#eliminarLibro', function(e){
		e.preventDefault();
		//console.log($(this).data('id'));
		var id = $(this).data('id');
		var url = 'https://api.mlab.com/api/1/databases/wstopicos/collections/libros/'+id+'?apiKey=JZc6-qitXH-d49R5nRzYF6aXJfYZOtCd';

		$.ajax({ 
			url: url,
		  	type: 'DELETE',
		  	async: true,
		  	timeout: 300000,
		 	contentType: "application/json",
		 	success: function(data){
		 		//console.log('Hola mundo: subido XD');
		 		window.location.href="index.html"
		 	},
		 	error: function(xhr, status, err) {
		 		console.log(err);
		 	}
		 });

	});
});

function getLibros(){
	$.ajax({
		url: 'https://api.mlab.com/api/1/databases/wstopicos/collections/libros?apiKey=JZc6-qitXH-d49R5nRzYF6aXJfYZOtCd'
	}).done(function(data){
		//console.log(data);
		var salida='<div>';
		$.each(data, function(key, data){
			salida += '<div class="topicos">';
			salida += '<h3>'+data.titulo+'</h3>';
			salida += '<p>Categoria: '+data.categoria+'</p>';
			salida += '<p>'+data.resumen+'</p>';
			//Con $oid se obtiene el objeto con el id que se necesita
			salida += '<a id="editarLibro" href="" data-id="'+data._id.$oid
			+'" data-titulo="'+data.titulo+'" data-categoria="'
			+data.categoria+'" data-resumen="'
			+data.resumen+'">Editar</a> | <a href="" id="eliminarLibro" data-id="'+data._id.$oid+'">Eliminar</a>' ;
			salida += '</div>';
		});
		salida += '</div>';
		$('#libros').html(salida);
	});
}