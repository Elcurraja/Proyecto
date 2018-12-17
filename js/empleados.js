$(document).ready(function() {
    //LLAMAMOS A LA FUNCION PARA CARGAR LA TABLA CON TODOS LOS REGISTROS
    get_employee()

    //RECOGEMOS EL EVENTO CLICK DE LOS BOTONES 
    $(document).on ("click", "button", function () {

        var fila = $(this).closest('tr')
        let  data = {
            'idEmployee':fila.find('input').val(),
            'nombre':fila.find('td:nth-child(2) > span').text(),
            'apellidos':fila.find('td:nth-child(3) > span').text(),
            'dni':fila.find('td:nth-child(4) > span').text(),
            'fecha_nacimiento':fila.find('td:nth-child(5) > span').text(),
            'inicio_contrato':fila.find('td:nth-child(6) > span').text(),
            'fin_contrato':fila.find('td:nth-child(7) > span').text(),
            'puesto':fila.find('td:nth-child(8) > span').text(),
            'telefono':fila.find('td:nth-child(9) > span').text(),
            'direccion':fila.find('td:nth-child(10) > span').text(),
            'numero':fila.find('td:nth-child(11) > span').text(),
            'poblacion':fila.find('td:nth-child(12) > span').text()
        }
       //SI EL ID ES EDIT
        if($(this).attr('id')=='edit'){
            //ASIGNAMOS LOS VALORES DEL MODAL CON LOS DATOS DE LA FILA 
            $("#modalEmployee #idEmployee").val(data.idEmployee)
            $("#modalEmployee #nombre").val(data.nombre)
            $("#modalEmployee #apellidos").val(data.apellidos)
            $("#modalEmployee #dni").val(data.dni)
            /*INICIALIZAMOS LOS CAMPOS DEL DATETIMEPICKER DE FECHA CON LOS VALORES DE DATA */
            $('#modalEmployee #fecha_nacimiento').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
                date: data.fecha_nacimiento
            });
            $('#modalEmployee #inicio_contrato').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
                date: data.inicio_contrato
            });
            $('#modalEmployee #fin_contrato').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
                date: data.fin_contrato
            });
            $("#modalEmployee #puesto").val(data.puesto)
            $("#modalEmployee #telefono").val(data.telefono)
            $("#modalEmployee #direccion").val(data.direccion)
            $("#modalEmployee #numero").val(data.numero)
            $("#modalEmployee #poblacion").val(data.poblacion)

            /** MOSTRAMOS EL BOTON DE EDITAR Y OCULTAMOS EL DE AÑADIR, LUEGO MOSTRAMOS EL MODAL */
            $("button#editModal").css("display","block")
            $("button#addModal").css("display","none")
            $(".modal-title").html("Editar Empleado")

            $('#modalEmployee').modal('show')
        }
        //SI EL ID ES DELETE
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html("<span>Nombre: "+ data.nombre + " " + data.apellidos + "</span>"+
                                      "<input type='hidden' class='form-control' name='idEmployeeD' id='idEmployeeD' value='"+ data.idEmployee +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        //SI EL ID ES ADDEMPLOYE
        else if($(this).attr('id')=='addEmploye'){
            $("button#editModal").css("display","none")
            $("button#addModal").css("display","block")
            $(".modal-title").html("Añadir Empleado")

            $("#modalEmployee input").val('')
            $('#modalEmployee #fecha_nacimiento').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
            });
            $('#modalEmployee #inicio_contrato').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
            });
            $('#modalEmployee #fin_contrato').datetimepicker({
                locale: 'es',
                format: 'DD/MM/YYYY',
            });

            $('#modalEmployee').modal('show')
        }
    });
    
})

/**PETICION PARA MOSTRAR TODOS LOS EMPLEADOS */
function get_employee(){
    $.ajax({
        url:"php/empleados_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op":"getEmployee"
        },
        success:function(response){
            /*GENERAMOS LA TABLA DINAMICAMENTE CON LOS DATOS DEVUELTOS DE LA CONSULTA */
            $("#table_employee tbody").empty();
                for (let index = 0; index < response.datosEmployee.length; index++){
                    $("#table_employee tbody").append(
                        "<tr class='fila'>"+
                        "<input type='hidden' class='form-control' name='idEmployee' value='"+ response.datosEmployee[index].id +"'>"+
                        "<td><span>"+ response.datosEmployee[index].nombre +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].apellidos +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].dni +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].fecha_nacimiento +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].fecha_contratacion +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].fecha_fin_contrato +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].puesto +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].telefono +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].direccion +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].numero +"</span></td>"+
                        "<td><span>"+ response.datosEmployee[index].poblacion +"</span></td>"+
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
        tabla = $('#table_employee').DataTable({
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
/**RECOGEMOS LOS DATOS DEL MODAL EN UN OBJETO DATOS Y LOS ENVIAMOS MEDIANTE 
 * UNA PETICION AJAX AL SERVIDOR PARA INSERTARLOS */
function insert_employee(){
    var datos = {
        "op": "insertEmployee",
        "nombre":$("#nombre").val(),
        "apellidos":$("#apellidos").val(),
        "dni":$("#dni").val(),
        "fecha_nacimiento":$("#fecha_nacimiento").datetimepicker('date').format('L'),
        "inicio_contrato":$("#inicio_contrato").datetimepicker('date').format('L'),
        "fin_contrato":$("#fin_contrato").datetimepicker('date').format('L'),
        "puesto":$("#puesto").val(),
        "telefono":$("#telefono").val(),
        "direccion":$("#direccion").val(),
        "numero":$("#numero").val(),
        "poblacion":$("#poblacion").val(),   
    }
    $.ajax({
        url:"php/empleados_f.php",
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
        get_employee()
    });
}

/**RECOGEMOS LOS DATOS DEL MODAL EN UN OBJETO DATOS Y LOS ENVIAMOS MEDIANTE 
 * UNA PETICION AJAX AL SERVIDOR PARA EDITARLO */
function edit_employee(){
    var datos = {
        "op": "editEmployee",
        "idEmployee":$("#idEmployee").val(),
        "nombre":$("#nombre").val(),
        "apellidos":$("#apellidos").val(),
        "dni":$("#dni").val(),
        "fecha_nacimiento":$("#fecha_nacimiento").datetimepicker('date').format('L'),
        "inicio_contrato":$("#inicio_contrato").datetimepicker('date').format('L'),
        "fin_contrato":$("#fin_contrato").datetimepicker('date').format('L'),
        "puesto":$("#puesto").val(),
        "telefono":$("#telefono").val(),
        "direccion":$("#direccion").val(),
        "numero":$("#numero").val(),
        "poblacion":$("#poblacion").val(),   
    }
    $.ajax({
        url:"php/empleados_f.php",
        type:"POST",
        data: datos,
        success: function(response){
            console.log(response.sql)
            if (response.error == 1) {
                console.log("Error en php: " + response.errorUpdate);
            }
        },
        error: function(response,jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    }).done(function(){
        get_employee()
    });

}

/*FUNCION EN LA QUE RECOGEMOS EL CAMPO DE ID DEL MODEL DE BORRAR, LUEGO REALIZAMOS 
REALZIAMOS UNA PETICION AJAX EN LA QUE LE PASAMOS EL ID Y LA OPERACION*/
function delete_employee(){
    var datos = {
        "op": "deleteEmployee",
        "idEmployee":$("#idEmployeeD").val()
    }
    $.ajax({
        url:"php/empleados_f.php",
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
        get_employee()
    });
}
