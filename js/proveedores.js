$(document).ready(function() {
    //Llamamos al a funcion get_client() para cargar la tabla con todos los registros
    get_provider()

    //Recogemos el evento click de los botones, insertar, editar y borrar
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
   
        let  data = {
            'id':fila.find('> input').val(),
            'denominacion':fila.find('td:nth-child(2) > span').text(),
            'nombre':fila.find('td:nth-child(3) > span').text(),
            'direccion':fila.find('td:nth-child(4) > span').text(),
            'telefono':fila.find('td:nth-child(5) > span').text(),
        }
       //Si el ID del boton es edit
        if($(this).attr('id')=='edit'){
            //Asignamos los valores del modal con los datos de la fila correspondiente de la tabla
            $("#modalProvider #idProvider").val(data.id)
            $("#modalProvider #denominacion").val(data.denominacion)
            $("#modalProvider #nombre").val(data.nombre)
            $("#modalProvider #direccion").val(data.direccion)
            $("#modalProvider #telefono").val(data.telefono)
            //Ocultamos el voton de insertar y mostramos el de editar, luego mostramos el model
            $("button#edit").css("display","block")
            $("button#add").css("display","none")
            $('#modalProvider').modal('show')
        }
        //Si el ID del boton es delete, mostramos un mensaje de confirmacion  de borrado para el empleado data.id
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html(  "<span>Nombre: "+ data.nombre +"</span>"+
                                        "<input type='hidden' class='form-control' name='idProviderD' id='idProviderD' value='"+ data.id +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        //Si el ID del boton es añadir ocultamos el boton de editar en el modal y mostramos el de insertar
        else if($(this).attr('id')=='addProvider'){
            $("button#edit").css("display","none")
            $("button#add").css("display","block")
            $('#modalProvider').modal('show')
        }
    });
    
})

function get_provider(){
    $.ajax({
        url:"php/proveedores_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op":"getProvider"
        },
        success:function(response){
            // console.log(response.datosCliente)
            $("#table_provider tbody").empty();
                for (let index = 0; index < response.datosProvider.length; index++){
                    $("#table_provider tbody").append(
                        "<tr class='fila'>"+
                        "<input type='hidden' class='form-control' name='idProvider' id='idProvider' value='"+ response.datosProvider[index].id +"'>"+
                        "<td><span>"+ response.datosProvider[index].denominacion +"</span></td>"+
                        "<td><span>"+ response.datosProvider[index].nombre +"</span></td>"+
                        "<td><span>"+ response.datosProvider[index].direccion +"</span></td>"+
                        "<td><span>"+ response.datosProvider[index].telefono +"</span></td>"+
                        "<td><button class='btn' id='edit'><i class='fas fa-edit'></i></button><button class='btn' type='submit' id='delete'><i class='fas fa-trash'></i></button></td>");
                }
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    }).done(function(){
        /* CREACION DE LA DATATABLE UNA VEZ LA TABLA ESTA FORMADA. SE INICIA CON LAS OPCIONES DE NO ORDENAR POR
           DEFECTO POR LA PRIMERA COLUMNA (SOLO CONTIENE CHECKBOXES) SINO LA TERCERA (APELLIDOS), CABECERA FIJA
           CON OFFSET A LA ANCHURA DEL MENU (PARA QUE NO SE OCULTE POR DEBAJO), LENGUAJE EN CASTELLANO, Y
           QUE NO HAGA ORDENABLE LA PRIMERA COLUMNA NI USE SU CONTENIDO EN LAS BUSQUEDAS DE LA DATATABLE */
        tabla = $('#table_provider').DataTable({
            // https://datatables.net/reference/option/order
            order: [[0, "asc"]],
            language: {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
        });
    });

}
function insert_provider(){
    var datos = {
        "op": "insertProvider",
        "idProvider":$("#idProvider").val(),
        "denominacion":$("#denominacion").val(),
        "nombre":$("#nombre").val(),
        "direccion":$("#direccion").val(),
        "telefono":$("#telefono").val()
    }
    console.log(datos)
    $.ajax({
        url:"php/proveedores_f.php",
        type:"POST",
        data: datos,
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + json.mensaje);
            }
        },
        error: function(response,jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    }).done(function(){
        // location.href ="proveedores.php";
    });
}
function edit_provider(){
    var datos = {
        "op": "editProvider",
        "idProvider":$("#idProvider").val(),
        "denominacion":$("#denominacion").val(),
        "nombre":$("#nombre").val(),
        "direccion":$("#direccion").val(),
        "telefono":$("#telefono").val()
    }
    // console.log(datos)
    $.ajax({
        url:"php/proveedores_f.php",
        type:"POST",
        data: datos,
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + json.mensaje);
            }
        },
        error: function(response,jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    }).done(function(){
        // location.href ="proveedores.php";
    });

}

//Funcion en la que recogemos el campo de id del model de borrar,
//Realizamos una peticion AJAX en la que le pasamos el id y la operacion a realizar
function delete_provider(){
    var datos = {
        "op": "deleteProvider",
        "idProvider":$("#idProviderD").val()
    }
    $.ajax({
        url:"php/proveedores_f.php",
        type:"POST",
        data: datos,
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + json.mensaje);
            }
        },
        error: function(response,jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    }).done(function(){
        // location.href ="proveedores.php";
    });
}
