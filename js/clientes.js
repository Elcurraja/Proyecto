$(document).ready(function() {
    
    get_client()

    
})
$(function(){
    $('#editar').on('click',function(){
        console.log("hola")
        var fila = $(this).parent()[0].closest('tr')
        
            console.log($(this).parent()[0].closest('tr'))

  
        // let  data = {
        //     'id':fila.find('td:nth-child(0) > span').text(),
        //     'denominacion':fila.find('td:nth-child(1) > span').text(),
        //     'nombre':fila.find('td:nth-child(2) > span').text(),
        //     'apellidos':fila.find('td:nth-child(3) > span').text(),
        //     'direccion':fila.find('td:nth-child(4) > span').text(),
        //     'telefono':fila.find('td:nth-child(5) > span').text(),
        //     'poblacion':fila.find('td:nth-child(6) > span').text(),
        // }
    })
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
                        "<td><button class='btn btn-primary' id='editar' >Editar</button><button class='btn btn-primary' type='submit' onclick='delete_client()'>Borrar</button></td>");
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
            order: [[1, "asc"]],
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

function edit_client(){
    $('button').on('click',function(){
        var fila = $(this).parent()[0].closest('tr')
        
            console.log($(this).parent()[0].closest('tr'))

  
        // let  data = {
        //     'id':fila.find('td:nth-child(0) > span').text(),
        //     'denominacion':fila.find('td:nth-child(1) > span').text(),
        //     'nombre':fila.find('td:nth-child(2) > span').text(),
        //     'apellidos':fila.find('td:nth-child(3) > span').text(),
        //     'direccion':fila.find('td:nth-child(4) > span').text(),
        //     'telefono':fila.find('td:nth-child(5) > span').text(),
        //     'poblacion':fila.find('td:nth-child(6) > span').text(),
        // }
    })
    // let a = $(this).parent().find('td:nth-child(2) > span').text()
    // let a = $(this).parent().parent()
    // console.log(a)
    // $(".fila").each(function(){
    //     $('button').on()

    // })
}
