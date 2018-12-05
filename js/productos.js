$(document).ready(function() {
    //Llamamos al a funcion get_client() para cargar la tabla con todos los registros
    get_product()

    //Recogemos el evento click de los botones, insertar, editar y borrar
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
   
        let  data = {
            'id':fila.find('> input').val(),
            'nombre':fila.find('td:nth-child(2) > span').text(),
            'tipo':fila.find('td:nth-child(3) > span').text(),
            'disponible':fila.find('td:nth-child(4) > span').text(),
            'descripcion':fila.find('td:nth-child(5) > span').text(),
            'precio':fila.find('td:nth-child(6) > span').text(),
        }
        console.log(data)
       //Si el ID del boton es edit
        if($(this).attr('id')=='edit'){
            //Asignamos los valores del modal con los datos de la fila correspondiente de la tabla
            $("#modalProductos #idProducto").val(data.id)
            $("#modalProductos #nombre").val(data.nombre)
            $("#modalProductos #tipo").val(data.tipo)
            $("#modalProductos #cDisponible").val(data.disponible)
            $("#modalProductos #descripcion").val(data.descripcion)
            $("#modalProductos #precio").val(data.precio)
            //Ocultamos el voton de insertar y mostramos el de editar, luego mostramos el model
            $("button#edit").css("display","block")
            $("button#add").css("display","none")
            $('#modalProductos').modal('show')
        }
        //Si el ID del boton es delete, mostramos un mensaje de confirmacion  de borrado para el empleado data.id
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html(  "<span>Nombre: "+ data.nombre +"</span>"+
                                        "<span>Tipo: "+ data.tipo +"</span>"+
                                        "<input type='hidden' class='form-control' name='idProductoD' id='idProductoD' value='"+ data.id +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        //Si el ID del boton es añadir ocultamos el boton de editar en el modal y mostramos el de insertar
        else if($(this).attr('id')=='addProduct'){
            $("button#edit").css("display","none")
            $("button#add").css("display","block")
            $('#modalProductos').modal('show')
        }
    });
    
})

function get_product(){
    $.ajax({
        url:"php/productos_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op":"getProductos"
        },
        success:function(response){
            // console.log(response.datosCliente)
            $("#table_productos tbody").empty();
                for (let index = 0; index < response.datosProductos.length; index++){
                    $("#table_productos tbody").append(
                        "<tr class='fila'>"+
                        "<input type='hidden' class='form-control' name='idProductos' id='idProductos' value='"+ response.datosProductos[index].id +"'>"+
                        "<td><span>"+ response.datosProductos[index].nombre +"</span></td>"+
                        "<td><span>"+ response.datosProductos[index].tipo +"</span></td>"+
                        "<td><span>"+ response.datosProductos[index].disponible +"</span></td>"+
                        "<td><span>"+ response.datosProductos[index].descripcion +"</span></td>"+
                        "<td><span>"+ response.datosProductos[index].precio +"</span></td>"+
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
        tabla = $('#table_productos').DataTable({
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
        "op": "insertProducto",
        "idProducto":$("#idProducto").val(),
        "nombre":$("#nombre").val(),
        "tipo":$("#tipo").val(),
        "disponible":$("#disponible").val(),
        "descripcion":$("#descripcion").val(),
        "precio":$("#precio").val()
    }
    console.log(datos)
    $.ajax({
        url:"php/productos_f.php",
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
        "op": "editProducto",
        "idProducto":$("#idProducto").val(),
        "nombre":$("#nombre").val(),
        "tipo":$("#tipo").val(),
        "disponible":$("#disponible").val(),
        "descripcion":$("#descripcion").val(),
        "precio":$("#precio").val()
    }
    // console.log(datos)
    $.ajax({
        url:"php/productos_f.php",
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
function delete_producto(){
    var datos = {
        "op": "deleteProducto",
        "idProducto":$("#idProductoD").val()
    }
    $.ajax({
        url:"php/productos_f.php",
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
