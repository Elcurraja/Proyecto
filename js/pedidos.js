$(document).ready(function() {
    //Llamamos al a funcion get_client() para cargar la tabla con todos los registros
    get_orders('todos')

    $('#busqueda_fecha').datetimepicker({
        locale: 'es',
        format: 'DD/MM/YYYY',
    });
    //Recogemos el evento click de los botones, insertar, editar y borrar
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
        let  data = {
            'idOrder':fila.find('#idOrder').val(),
            'idCliente':fila.find('#idClient').val(),
            'cliente':fila.find('td:nth-child(3) > span').text(),
            'fecha':fila.find('td:nth-child(4) > span').text(),
            'direccion':fila.find('td:nth-child(5) > span').text(),
            'telefono':fila.find('td:nth-child(6) > span').text(),
            'poblacion':fila.find('td:nth-child(7) > span').text(),
            'observaciones':fila.find('td:nth-child(8) > span').text(),
            'estado':fila.find('td:nth-child(9) > span').text(),
        }
        // console.log(data)
       //Si el ID del boton es edit
        if($(this).attr('id')=='edit'){
            //Asignamos los valores del modal con los datos de la fila correspondiente de la tabla
            $("#modalPedidos #mIdOrder").val(data.idOrder)
            $("#modalPedidos #mIdClient").val(data.idCliente)
            $("#modalPedidos #cliente").val(data.cliente)
            $("#modalPedidos #fecha").val(data.fecha)
            $("#modalPedidos #direccion").val(data.direccion)
            $("#modalPedidos #telefono").val(data.telefono)
            $("#modalPedidos #poblacion").val(data.poblacion)
            $("#modalPedidos #obs").val(data.observaciones)
            $("#modalPedidos #estado").val(data.estado)
    
            //Ocultamos el voton de insertar y mostramos el de editar, luego mostramos el model
            $("button#editModal").css("display","block")
            $("button#addModal").css("display","none")
            $('#modalPedidos').modal('show')
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
        else if ($(this).attr('id')=='openDetails'){
           openDetailsOrder(data.idCliente)
        }
        else if($(this).attr('id')=='generatePDF'){
            generatePdf()
        }
    });
    
})

function get_orders(){    
    $.ajax({
        url:"php/pedidos_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op": "getOrders",
        },
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
                    "<th scope='col'>Fecha</th>"+
                    "<th scope='col'>direccion</th>"+
                    "<th scope='col'>telefono</th>"+
                    "<th scope='col'>poblacion</th>"+
                    "<th scope='col'>Observaciones</th>"+
                    "<th scope='col'>Estado</th>"+
                    "<th scope='col'>Operacion</th>"+
                "</tr>"+
                "</thead>"+
                "<tbody>"
            )
            for (let index = 0; index < response.datosOrders.length; index++){
                for (let i = 0; i < response.datosClient.length; i++){
                    if(response.datosOrders[index].id_cliente == response.datosClient[i].id){
                        var denominacion = response.datosClient[i].denominacion
                        var direccion = response.datosClient[i].direccion 
                        var telefono = response.datosClient[i].telefono 
                        var poblacion= response.datosClient[i].poblacion  
                    }
                }

                $("#table_orders tbody").append(
                        "<tr class='fila'>"+
                            "<input type='hidden' class='form-control' name='idOrder' id='idOrder' value='"+ response.datosOrders[index].id +"'>"+
                            "<input type='hidden' class='form-control' name='idClient' id='idClient' value='"+ response.datosOrders[index].id_cliente +"'>"+
                            "<td><span>"+ denominacion +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].fecha +"</span></td>"+
                            "<td><span>"+ direccion +"</span></td>"+
                            "<td><span>"+ telefono +"</span></td>"+
                            "<td><span>"+ poblacion +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].observaciones +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].estado +"</span></td>"+
                            "<td><button class='btn' id='edit'><i class='fas fa-edit'></i></button>"+
                                "<button class='btn' type='submit' id='openDetails'><i class='fas fa-file-import'></i></button>"+
                                "<button class='btn' type='submit' id='delete'><i class='fas fa-trash'></i></button>"+
                            "</td>"+
                        "</tr>");
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
        tabla = $('#table_orders').DataTable({
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
        "op": "editOrder",
        "idCliente":$("#idCliente").val(),
        "observaciones":$("#observaciones").val(),
        "fecha":$("#fecha").val(),
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
        location.href ="pedidos.php";
    });
}
function edit_product(){
    var datos = {
        "op": "editOrder",
        "idOrder":$("#idOrder").val(),
        "idCliente":$("#idCliente").val(),
        "observaciones":$("#observaciones").val(),
        "fecha":$("#fecha").val(),
    }
    // console.log(datos)
    $.ajax({
        url:"php/pedidos_f.php",
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

//Funcion en la que recogemos el campo de id del model de borrar,
//Realizamos una peticion AJAX en la que le pasamos el id y la operacion a realizar
function delete_product(){
    var datos = {
        "op": "deleteOrder",
        "idOrder":$("#idOrderD").val()
    }
    $.ajax({
        url:"php/pedidos_f.php",
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

function openDetailsOrder(idOrder){
   
    $.ajax({
        url:"php/pedidos_f.php",
        type:"POST",
        dataType: "json",
        data: {
            op:"detailsOrder",
            idOrder:idOrder
        },
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + json.mensaje);
            }
            else{
                if(response.datosDetailsOrder.length==0){
                    $("#modal_NoProductos").modal("show")
                }
                else{
                    $("#table_Details_Order tbody").empty()
                    for (let index = 0; index < response.datosDetailsOrder.length; index++){
                        for (let i = 0; i < response.datosProductos.length; i++){
                            if(response.datosDetailsOrder[index].idItem == response.datosProductos[i].idProducto){
                                var nombreItem = response.datosProductos[i].nombre
                            }
                        }
                        $("#table_Details_Order tbody").append(
                            "<tr class='filaOrder'>" +
                                "<td><span>" + nombreItem + "</span></td>"+
                                "<td><span>" + response.datosDetailsOrder[index].cantidad + "</span></td>"+
                                "<td><span>" + response.datosDetailsOrder[index].precio + "</span></td>"+
                                "<td><span>" + response.datosDetailsOrder[index].total + "</span></td>"+
                                "<input type='hidden' class='form-control' name='idDetallePedido' id='idDetallePedido'/>"+
                            "</tr>");
                    }
                    $("#idOrder h2").text("Pedido Nº "+response.datosDetailsOrder[0].idPedido)
                    $('#modalOpenDetails').css({"margin-left":"30%","margin-top":"3%"})
                    $('#modalOpenDetails').modal('show')
                    
                }
            }
        },
        error: function(response,jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    })
}
function generatePdf(){
    /* https://rawgit.com/MrRio/jsPDF/master/docs/index.html
       https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html */
    var doc = new jsPDF()
    doc.setFontSize(40)
    doc.text($("#idOrder h2").text(), 30, 40)
    doc.setFontStyle("bold")
    doc.setFontSize(20)
    doc.text(15, 65, "Producto")
    doc.text(70, 65, "Cantidad")
    doc.text(120, 65, "Precio")
    doc.text(160, 65, "Total")

    doc.setFontStyle("")
    var y = 80
    $(".filaOrder").each(function(){
            // var producto = $(this).find("td:nth-child(1) span").text(),
            // var cantidad = $(this).find("td:nth-child(2) span").text(),
            // var precio   = $(this).find("td:nth-child(3) span").text(),
            // var total    = $(this).find("td:nth-child(4) span").text() 
            doc.text(15, y, $(this).find("td:nth-child(1) span").text())
            doc.text(70, y, $(this).find("td:nth-child(2) span").text())
            doc.text(120, y, $(this).find("td:nth-child(3) span").text() + " euros")
            doc.text(160, y, $(this).find("td:nth-child(4) span").text() + " euros")
            y=y+15
    })
    doc.setProperties({
        title: 'Factura',
        // subject: 'This is the subject',		
        author: 'Julio Gomez',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'Julio Gomez'
    });
    doc.save('factura.pdf');
    
    
    
}