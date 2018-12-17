$(document).ready(function() {
    load_historico()
})
function load_historico(){
    $.ajax({
        url:"php/historico_almacen_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op":"getHistorico"
        },
        success:function(response){
            /*GENERAMOS LA TABLA DINAMICAMENTE CON LOS DATOS DEVUELTOS DE LA CONSULTA */
            $("#tabla_historico_almacen tbody").empty();
                for (let index = 0; index < response.datosHistorico.length; index++){
                    $("#tabla_historico_almacen tbody").append(
                        "<tr class='fila'>"+
                        "<input type='hidden' class='form-control' name='idHistorico' value='"+ response.datosHistorico[index].idHistorico +"'>"+
                        "<td><span>"+ response.datosHistorico[index].nombre +"</span></td>"+
                        "<td><span>"+ response.datosHistorico[index].fecha +"</span></td>"+
                        "<td><span>"+ response.datosHistorico[index].cantidad +"</span></td>");
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
        tabla = $('#tabla_historico_almacen').DataTable({
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
