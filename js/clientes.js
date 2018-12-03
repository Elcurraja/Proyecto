$(document).ready(function() {
    //Llamamos al a funcion get_client() para cargar la tabla con todos los registros
    get_client()

    // $('button#addClient').on("click",function(){
    //     console.log("holi")
    // })
    //Recogemos el evento click de los botones, insertar, editar y borrar
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
        let  data = {
            'id':fila.find('td:nth-child(1) > span').text(),
            'denominacion':fila.find('td:nth-child(2) > span').text(),
            'nombre':fila.find('td:nth-child(3) > span').text(),
            'apellidos':fila.find('td:nth-child(4) > span').text(),
            'direccion':fila.find('td:nth-child(5) > span').text(),
            'telefono':fila.find('td:nth-child(6) > span').text(),
            'poblacion':fila.find('td:nth-child(7) > span').text(),
        }
       //Si el ID del boton es edit
        if($(this).attr('id')=='edit'){
            //Asignamos los valores del modal con los datos de la fila correspondiente de la tabla
            $("#modalEditCliente #idCliente").val(fila.find('td:nth-child(1) > span').text())
            $("#modalEditCliente #denominacion").val(fila.find('td:nth-child(2) > span').text())
            $("#modalEditCliente #nombre").val(fila.find('td:nth-child(3) > span').text())
            $("#modalEditCliente #apellido").val(fila.find('td:nth-child(4) > span').text())
            $("#modalEditCliente #direccion").val(fila.find('td:nth-child(5) > span').text())
            $("#modalEditCliente #telefono").val(fila.find('td:nth-child(6) > span').text())
            $("#modalEditCliente #poblacion").val(fila.find('td:nth-child(7) > span').text())
            $("button#edit").css("display","block")
            $("button#add").css("display","none")
            $('#modalEditCliente').modal('show')
        }
        //Si el ID del boton es delete
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html(  "<span>Cliente: " + data.denominacion + "</span></br>" + 
                                        "<span>Nombre: "+ data.nombre + " " + data.apellidos + "</span>"+
                                        "<input type='hidden' class='form-control' name='idClienteD' id='idClienteD' value='"+ data.id +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        //Si el ID del boton es añadir
        else if($(this).attr('id')=='addClient'){
            $("button#edit").css("display","none")
            $("button#add").css("display","block")
            $('#modalEditCliente').modal('show')
        }
    });
    
})

function get_client(){
    $.ajax({
        url:"php/clientes_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op":"getClientes"
        },
        success:function(response){
            // console.log(response.datosCliente)
            $("#tabla_clientes tbody").empty();
                for (let index = 0; index < response.datosCliente.length; index++){
                    $("#tabla_clientes tbody").append(
                        "<tr class='fila'>"+
                        "<td><span>"+ response.datosCliente[index].id +"</span></td>"+
                        "<td><span>"+ response.datosCliente[index].denominacion +"</span></td>"+
                        "<td><span>"+ response.datosCliente[index].nombre +"</span></td>"+
                        "<td><span>"+ response.datosCliente[index].apellidos +"</span></td>"+
                        "<td><span>"+ response.datosCliente[index].direccion +"</span></td>"+
                        "<td><span>"+ response.datosCliente[index].telefono +"</span></td>"+
                        "<td><span>"+ response.datosCliente[index].poblacion +"</span></td>"+
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
        tabla = $('#tabla_clientes').DataTable({
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
function insert_client(){
    var datos = {
        "op": "insertClient",
        "idCliente":$("#idCliente").val(),
        "denominacion":$("#denominacion").val(),
        "nombre":$("#nombre").val(),
        "apellidos":$("#apellido").val(),
        "direccion":$("#direccion").val(),
        "telefono":$("#telefono").val(),
        "poblacion":$("#poblacion").val(),
    }
    // console.log(datos)
    $.ajax({
        url:"php/clientes_f.php",
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
        location.href ="clientes.php";
    });
}
function edit_client(){
    var datos = {
        "op": "editClient",
        "idCliente":$("#idCliente").val(),
        "denominacion":$("#denominacion").val(),
        "nombre":$("#nombre").val(),
        "apellidos":$("#apellido").val(),
        "direccion":$("#direccion").val(),
        "telefono":$("#telefono").val(),
        "poblacion":$("#poblacion").val(),
    }
    // console.log(datos)
    $.ajax({
        url:"php/clientes_f.php",
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
        location.href ="clientes.php";
    });

}

//Funcion en la que recogemos el campo de id del model de borrar,
//Realizamos una peticion AJAX en la que le pasamos el id y la operacion a realizar
function delete_client(){
    var datos = {
        "op": "deleteCliente",
        "idCliente":$("#idClienteD").val()
    }
    $.ajax({
        url:"php/clientes_f.php",
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
        location.href ="clientes.php";
    });
}
