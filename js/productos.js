$(document).ready(function() {
    //LLAMAMOS A LA FUNCION GET_CLIENTE() PARA CARGAR LA TABLA CON LOS REGISTROS DE NUESTRA BASE DE DATOS
    get_product()

    //RECOGEMOS EL EVENTO CLICK DE LOS BOTONES "INSERTAR, EDITAR Y BORRAR"r
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
        let  data = {
            'idProducto':fila.find('> input').val(),
            'nombre':fila.find('td:nth-child(2) > span').text(),
            'tipo':fila.find('td:nth-child(3) > span').text(),
            'disponible':fila.find('td:nth-child(4) > span').text(),
            'descripcion':fila.find('td:nth-child(5) > span').text(),
            'precio':fila.find('td:nth-child(6) > span').text(),
        }
        // console.log(data)

        //SI EL ID DEL BOTON ES "EDIT"
        if($(this).attr('id')=='edit'){
            //ASIGNAMOS LOS VALORES DEL MODAL CON LOS DATOS DE LA FILA CORRESPONDIENTES ALMACENADOS EN LA VARIABLE "DATA"
            $("#modalProductos #idProducto").val(data.idProducto)
            $("#modalProductos #nombre").val(data.nombre)
            $("#modalProductos #tipo").val(data.tipo)
            $("#modalProductos #cDisponible").val(data.disponible)
            $("#modalProductos #descripcion").val(data.descripcion)
            $("#modalProductos #precio").val(data.precio)

            //OCULTAMOS EL BOTON DE INSERTAR, MOSTRAMOS EL DE EDITAR, CABMIAMOS EL TITULO DEL MODAL Y MOSTRAMOS EL MODAL
            $("button#editModal").css("display","block")
            $("button#addModal").css("display","none")
            $(".modal-title").html("Editar Producto")
            $('#modalProductos').modal('show')
        }
        //SI EL ID DEL BOTON ES "DELETE", MOSTRAMOS EL MENSAJE DE CONFIRMACION DE BORRADO PARA EL PRODUCTO DATA.IDPRODUCTO
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html(  "<span>Nombre: "+ data.nombre +"</span>"+
                                        "<span>Tipo: "+ data.tipo +"</span>"+
                                        "<input type='hidden' class='form-control' name='idProductoD' id='idProductoD' value='"+ data.idProducto +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        
        //SI EL ID DEL BOTOON ES "ADDPRODUCT" OCULTAMOS EL BOTON DE EDITAR EN EL MODAL Y MOSTRAMOS EL DE INSERTAR, CAMBIAMOS EL TITULO DEL MODAL, LIMPIAMOS TODOS LOS CAMPOS Y LO MOSTRAMOS
        else if($(this).attr('id')=='addProduct'){
            $("button#editModal").css("display","none")
            $("button#addModal").css("display","block")

            $("#modalProductos input").val('')
            $(".modal-title").html("Añadir Producto")
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
            if ($.fn.dataTable.isDataTable("#table_productos")) {
                tabla.destroy();
                $('#modalProductos').modal('hide')
            }
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
                            "<td><button class='btn' id='edit'><i class='fas fa-edit'></i></button><button class='btn' type='submit' id='delete'><i class='fas fa-trash'></i></button></td>"+
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

/*FUNCION EN LA QUE RECOGEMOS EL CAMPO DE ID DEL MODEL DE BORRAR, REALIZAMOS UNA PETICION AJAX 
  EN LA QUE LE PASAMOS DICHO ID Y LA OPERACION, EN ESTE CASO "DELETE"*/
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
