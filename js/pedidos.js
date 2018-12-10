$(document).ready(function() {
    //Llamamos al a funcion get_client() para cargar la tabla con todos los registros
    get_orders('aa')

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

function get_orders(name){
    console.log(name)
    if(name=='todos'){
        var datos= {
            "op": "getOrders",
            "cliente":"todos"
        }
    }
    else {
        var datos= {
            "op": "getOrders",
            "cliente":1
        }
    }
    $.ajax({
        url:"php/pedidos_f.php",
        type:"POST",
        dataType: "json",
        data:datos,
        success:function(response){
            if ($.fn.dataTable.isDataTable("#table_orders")) {
                tabla.destroy();
                $('#modalOrders').modal('hide')
            }
            // console.log(response.datosCliente)
            $("#table_orders").empty();
            $("#table_orders").append(
                "<thead class='thead-dark'>"+
                "<tr>"+
                    "<th scope='col'>Cliente</th>"+
                    "<th scope='col'>Observaciones</th>"+
                    "<th scope='col'>Fecha</th>"+
                    "<th scope='col'>Operacion</th>"+
                "</tr>"+
                "</thead>"+
                "<tbody>"
            )
            for (let index = 0; index < response.datosOrders.length; index++){
                for (let i = 0; i < response.datosClient.length; i++){
                    if(response.datosOrders[index].id_cliente == response.datosClient[i].id){
                        var denominacion = response.datosClient[i].denominacion
                        
                    }
                }

                $("#table_orders tbody").append(
                        "<tr class='fila'>"+
                            "<input type='hidden' class='form-control' name='idOrder' id='idOrder' value='"+ response.datosOrders[index].id +"'>"+
                            "<td><span>"+ denominacion +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].observaciones +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].fecha +"</span></td>"+
                            "<td><button class='btn' id='edit'><i class='fas fa-edit'></i></button><button class='btn' type='submit' id='delete'><i class='fas fa-trash'></i></button></td>"+
                        "</tr>"+    
                    "</tbody>");
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
function insert_product(){
    var datos = {
        "op": "insertProducto",
        "nombre":$("#nombre").val(),
        "tipo":$("#tipo").val(),
        "disponible":$("#cDisponible").val(),
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
        location.href ="productos.php";
    });
}
function edit_product(){
    var datos = {
        "op": "editProducto",
        "idProducto":$("#idProducto").val(),
        "nombre":$("#nombre").val(),
        "tipo":$("#tipo").val(),
        "disponible":$("#cDisponible").val(),
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
        get_product()
    });

}

//Funcion en la que recogemos el campo de id del model de borrar,
//Realizamos una peticion AJAX en la que le pasamos el id y la operacion a realizar
function delete_product(){
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
        get_product()
    });
}
