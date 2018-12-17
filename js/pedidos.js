$(document).ready(function() {
    //CARGAMOS TODOS LOS PEDIDOS
    get_orders()
    //RECOGEMOS EL EVENTO CLICK DE LOS BOTONES
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
        let  data = {
            'idOrder':fila.find('.idOrder').val(),
            'idCliente':fila.find('.idClient').val(),
            'cliente':fila.find('td:nth-child(3) > span').text(),
            'fecha':fila.find('td:nth-child(4) > span').text(),
            'direccion':fila.find('td:nth-child(5) > span').text(),
            'telefono':fila.find('td:nth-child(6) > span').text(),
            'poblacion':fila.find('td:nth-child(7) > span').text(),
            'observaciones':fila.find('td:nth-child(8) > span').text(),
            'estado':fila.find('td:nth-child(9) > span').text(),
        }
       //SI EL ID ES EDIT
        if($(this).attr('id')=='edit'){
            //Asignamos los valores del modal con los datos de la fila correspondiente de la tabla
            $("#modalEditPedidos #mIdOrder").val(data.idOrder)
            $("#modalEditPedidos #mIdClient").val(data.idCliente)
            $("#modalEditPedidos #cliente").val(data.cliente)
            $("#modalEditPedidos #direccion").val(data.direccion)
            $("#modalEditPedidos #telefono").val(data.telefono)
            $("#modalEditPedidos #poblacion").val(data.poblacion)
            $("#modalEditPedidos #obs").val(data.observaciones)
            $("#modalEditPedidos #estado").val(data.estado)
            $('#modalEditPedidos #fecha_pedido').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
                date: data.fecha
            });
    
            //OCULTAMOS EL BOTON DE INSERTAR Y MOSTRAMOS EL DE EDITAR, LUEGO MOSTRAMOS EL MODAL
            $("button#editModal").css("display","block")
            $("button#addModal").css("display","none")
            $('#modalEditPedidos').modal('show')
        }
        //SI EL ID ES DELETE, MOSTRAMOS EL MENSAJE DE CONFIRMACION DEL MODAL
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html(  "<span>Nombre: "+ data.nombre +"</span>"+
                                        "<span>Tipo: "+ data.tipo +"</span>"+
                                        "<input type='hidden' class='form-control' name='idProductoD' id='idProductoD' value='"+ data.id +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        //SI EL ID ES ADDORDER, REDIRECCIONAMOS A LA PAGINA PARA NUEVOPEDIDO
        else if($(this).attr('id')=='addOrder'){
            location.href ="nuevosPedidos.php";
        }
        //SI EL ID ES openDetails, LLAMAMOS A LA FUNCION PASANDOLE EL DATA.IDORDER
        else if ($(this).attr('id')=='openDetails'){
           openDetailsOrder(data.idOrder)
        }
        //SI EL ID ES generatePDF, LLAMAMOS A LA FUNCION PARA GENERAR PDF
        else if($(this).attr('id')=='generatePDF'){
            generatePdf()
        }
    });
    
})

/**FUNCION PARA SELECCIONAR TODOS LOS PEDIDOS */
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
           /**GENERAMOS EL THEAD DE LA TABLA */
            $("#table_orders").empty();
            $("#table_orders").append(
                "<thead class='thead-dark'>"+
                "<tr>"+
                    "<th scope='col'>Cliente</th>"+
                    "<th scope='col'>Fecha</th>"+
                    "<th scope='col'>Observaciones</th>"+
                    "<th scope='col'>Estado</th>"+
                    "<th scope='col'>Operacion</th>"+
                "</tr>"+
                "</thead>"+
                "<tbody>"
            )
            /**BUCLE PARA SACAR LOS NOMBRES DE LOS CLIENTES */
            for (let index = 0; index < response.datosOrders.length; index++){
                for (let i = 0; i < response.datosClient.length; i++){
                    if(response.datosOrders[index].id_cliente == response.datosClient[i].id){
                        var denominacion = response.datosClient[i].denominacion
                    }
                }
                /**GENERAMOS EL BODY DE LA TABLA */
                $("#table_orders tbody").append(
                        "<tr class='fila'>"+
                            "<input type='hidden' class='form-control idOrder' name='idOrder'  value='"+ response.datosOrders[index].id +"'>"+
                            "<input type='hidden' class='form-control idClient' name='idClient' value='"+ response.datosOrders[index].id_cliente +"'>"+
                            "<td><span>"+ denominacion +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].fecha +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].observaciones +"</span></td>"+
                            "<td><span>"+ response.datosOrders[index].estado +"</span></td>"+
                            "<td><button class='btn' type='submit' id='openDetails'><i class='fas fa-file-import' title='Abrir Detalle Factura'></i></button>"+
                                "<button class='btn' type='submit' id='delete'><i class='fas fa-trash' title='Borrar Pedido'></i></button>"+
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
/*RECOGEMOS EL CAMPO ID DEL MODAL PARA BORRAR
REALIZAMOS LA PETICION AJAX, PASANDOLE EL ID Y LA OPERACION A REALIZAR*/
function delete_product(){
    var datos = {
        "op": "deleteOrder",
        "idOrder":$("#idOrderD").val()
    }
    $.ajax({
        url:"php/pedidos_f.php",
        type:"POST",
        dataType: "json",
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

/*REALIZAMOS UNA PETICION PARA TRAERNOS TODOS LOS DATOS CORRESPONDIENTES AL ID_ORDER QUE LE ENVIAMOS POR PARAMETRO*/
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
                    /**DIBUJAMOS LA TABLA CON LOS DATOS RECIBIDOS */
                    $("#table_Details_Order tbody, .info").empty()
                    var total = 0
                    for (let index = 0; index < response.datosDetailsOrder.length; index++){
                         total= total + parseInt(response.datosDetailsOrder[index].total)
                        $("#table_Details_Order tbody").append(
                            "<tr class='filaOrder'>" +
                                "<td><span>" + response.datosDetailsOrder[index].producto + "</span></td>"+
                                "<td><span>" + response.datosDetailsOrder[index].cantidad + "</span></td>"+
                                "<td><span>" + response.datosDetailsOrder[index].precio + "</span></td>"+
                                "<td><span>" + response.datosDetailsOrder[index].total + "</span></td>"+
                                "<input type='hidden' class='form-control' name='idDetallePedido' id='idDetallePedido'/>"+
                            "</tr>");
                    }
                    $(".info").append("<label for='pedido' id='labelpedido'><strong>Numero pedido:</strong> " + response.datosDetailsOrder[0].idPedido + "</label></br>"+ 
                                         "<label for='cliente' id='labelCliente'><strong>Cliente:</strong> " + response.datosDetailsOrder[0].denominacionSocial+"</label>"+ 
                                         "<label for='telefono' id='labeltelefono'><strong>Telefono:</strong> " + response.datosDetailsOrder[0].telefono+ "</label></br>"+
                                         "<label for='direccion' id='labeldireccion'><strong>Direccion:</strong> " + response.datosDetailsOrder[0].direccion+ "</label>"+ 
                                         "<label for='poblacion' id='labelpoblacion'><strong>Poblacion:</strong> " + response.datosDetailsOrder[0].poblacion + "</label></br>")
                    $("#total h2").text("Total Factura: " + total + " euros")
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

/* GENERAMOS EL PDF RECOGIENDO LOS DATOS QUE TENEMOS EN EL MODAL DE DETAILS ORDER*/
function generatePdf(){
    /* https://rawgit.com/MrRio/jsPDF/master/docs/index.html
       https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html */
    var doc = new jsPDF()
    doc.setLanguage("en-ES")
    doc.setFontSize(20)
    doc.text($("#labelpedido").text(), 15, 30)
    doc.text($("#labelCliente").text(), 15, 45)
    doc.text($("#labeltelefono").text(), 110, 45)
    doc.text($("#labeldireccion").text(), 15, 60)
    doc.text($("#labelpoblacion").text(), 110, 60)

    doc.setFontStyle("bold")
    doc.setFontSize(20)
    doc.text(15, 85, "Producto")
    doc.text(70, 85, "Cantidad")
    doc.text(120, 85, "Precio")
    doc.text(160, 85, "Total")

    doc.setFontStyle("")
    var y = 100
    $(".filaOrder").each(function(){ 
            doc.text(15, y, $(this).find("td:nth-child(1) span").text())
            doc.text(70, y, $(this).find("td:nth-child(2) span").text())
            doc.text(120, y, $(this).find("td:nth-child(3) span").text() + " euros")
            doc.text(160, y, $(this).find("td:nth-child(4) span").text() + " euros")
            y=y+15
    })
    doc.setFontSize(30)
    doc.setFontStyle("bold")
    doc.text($("#total h2").text(), 15, y+20)

    doc.setProperties({
        title: 'Factura',		
        author: 'Julio Gomez'
    });
    doc.save('factura.pdf');
}