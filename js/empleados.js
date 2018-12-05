$(document).ready(function() {
    //Llamamos al a funcion get_client() para cargar la tabla con todos los registros
    get_employee()

    // $('button#addClient').on("click",function(){
    //     console.log("holi")
    // })
    //Recogemos el evento click de los botones, insertar, editar y borrar
    $(document).on ("click", "button", function () {
        var fila = $(this).closest('tr')
   
        let  data = {
            'id':fila.find('> input').val(),
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
            'poblacion':fila.find('td:nth-child(12) > span').text(),
        }
       //Si el ID del boton es edit
        if($(this).attr('id')=='edit'){
            //Asignamos los valores del modal con los datos de la fila correspondiente de la tabla
            $("#modalEmployee #idEmployee").val(data.id)
            $("#modalEmployee #nombre").val(data.nombre)
            $("#modalEmployee #apellidos").val(data.apellidos)
            $("#modalEmployee #dni").val(data.dni)
            $("#modalEmployee #fecha_nacimiento").val(data.fecha_nacimiento)
            $("#modalEmployee #inicio_contrato").val(data.inicio_contrato)
            $("#modalEmployee #fin_contrato").val(data.fin_contrato)
            $("#modalEmployee #puesto").val(data.puesto)
            $("#modalEmployee #telefono").val(data.telefono)
            $("#modalEmployee #direccion").val(data.direccion)
            $("#modalEmployee #numero").val(data.numero)
            $("#modalEmployee #poblacion").val(data.poblacion)
            //Ocultamos el voton de insertar y mostramos el de editar, luego mostramos el model
            $("button#edit").css("display","block")
            $("button#add").css("display","none")
            $('#modalEmployee').modal('show')
        }
        //Si el ID del boton es delete, mostramos un mensaje de confirmacion  de borrado para el empleado data.id
        else if($(this).attr('id')=='delete'){
            $('#cuerpo_mensaje').html(  "<span>Nombre: "+ data.nombre + " " + data.apellidos + "</span>"+
                                        "<input type='hidden' class='form-control' name='idEmployeeD' id='idEmployeeD' value='"+ data.id +"'>")
            $('#modal_confirm_borrar').modal('show')
        }
        //Si el ID del boton es añadir ocultamos el boton de editar en el modal y mostramos el de insertar
        else if($(this).attr('id')=='addEmploye'){
            $("button#edit").css("display","none")
            $("button#add").css("display","block")
            $('#modalEmployee').modal('show')
        }
    });
    
})

function get_employee(){
    $.ajax({
        url:"php/empleados_f.php",
        type:"POST",
        dataType: "json",
        data:{
            "op":"getEmployee"
        },
        success:function(response){
            // console.log(response.datosCliente)
            $("#table_employee tbody").empty();
                for (let index = 0; index < response.datosEmployee.length; index++){
                    $("#table_employee tbody").append(
                        "<tr class='fila'>"+
                        "<input type='hidden' class='form-control' name='idEmployee' id='idEmployee' value='"+ response.datosEmployee[index].id +"'>"+
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
function insert_employee(){
    var datos = {
        "op": "insertEmployee",
        "idEmployee":$("#idEmployee").val(),
        "nombre":$("#nombre").val(),
        "apellidos":$("#apellidos").val(),
        "dni":$("#dni").val(),
        "fecha_nacimiento":$("#fecha_nacimiento").val(),
        "inicio_contrato":$("#inicio_contrato").val(),
        "fin_contrato":$("#fin_contrato").val(),
        "puesto":$("#puesto").val(),
        "telefono":$("#telefono").val(),
        "direccion":$("#direccion").val(),
        "numero":$("#numero").val(),
        "poblacion":$("#poblacion").val(),
    }
    // console.log(datos)
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
        location.href ="empleados.php";
    });
}
function edit_employee(){
    var datos = {
        "op": "editEmployee",
        "idEmployee":$("#idEmployee").val(),
        "nombre":$("#nombre").val(),
        "apellidos":$("#apellidos").val(),
        "dni":$("#dni").val(),
        "fecha_nacimiento":$("#fecha_nacimiento").val(),
        "inicio_contrato":$("#inicio_contrato").val(),
        "fin_contrato":$("#fin_contrato").val(),
        "puesto":$("#puesto").val(),
        "telefono":$("#telefono").val(),
        "direccion":$("#direccion").val(),
        "numero":$("#numero").val(),
        "poblacion":$("#poblacion").val(),
    }
    // console.log(datos)
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
        location.href ="empleados.php";
    });

}

//Funcion en la que recogemos el campo de id del model de borrar,
//Realizamos una peticion AJAX en la que le pasamos el id y la operacion a realizar
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
        location.href ="empleados.php";
    });
}
