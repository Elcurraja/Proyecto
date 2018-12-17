<?php
include("mysqlConexion.php");

/**RECIBIMOS MEDIANTE $_POST LOS PARAMETROS PARA REALIZAR UNA U OTRA FUNCION */
if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getEmployee':
            get_Employee();
            break;
        case 'insertEmployee':
            insert_Employee();
            break;
        case 'editEmployee':
            edit_Employee();
            break;
        case 'deleteEmployee': 
            delete_Employee();
            break;
    }
}

/*CONSULTA PARA SELECCIONAR TODOS LOS PRODUCTOS, SE DEVUELVE MEDIANTE UN OBJETO JSON */
function get_Employee(){
    $conn=mysql_proyecto();
    $query= "SELECT * from empleados";
    $response = array();
    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosEmployee'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'id' => $fila['id'],
                'nombre' => $fila['nombre'],
                'apellidos' => $fila['apellidos'],
                'dni' => $fila['dni'],
                'fecha_nacimiento' => $fila['fecha_nacimiento'],
                'fecha_contratacion' => $fila['fecha_contratacion'],
                'fecha_fin_contrato' => $fila['fecha_fin_contrato'],
                'puesto' => $fila['puesto'],
                'telefono' => $fila['telefono'],
                'direccion' => $fila['direccion'],
                'numero' => $fila['numero'],
                'poblacion' => $fila['poblacion']
            );
            array_push($response['datosEmployee'], $datos);
        }
    }
    echo json_encode($response);
    $conn->close();
}
/**INSERTAMOS EL EMPLEADO  RECIBIENDO TODOS LOS DATOS DEL OBJETO JSON  */
function insert_Employee(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    /**RECOGEMOS TODOS LOS DATOS */
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $fecha_nacimiento_temp = explode("/",$_POST['fecha_nacimiento']);
    $fecha_nacimiento =$fecha_nacimiento_temp[2]."-".$fecha_nacimiento_temp[1]."-".$fecha_nacimiento_temp[0];
    $fecha_contratacion_temp = explode("/",$_POST['inicio_contrato']);
    $fecha_contratacion =$fecha_contratacion_temp[2]."-".$fecha_contratacion_temp[1]."-".$fecha_contratacion_temp[0];
    $fecha_fin_contrato_temp = explode("/",$_POST['fin_contrato']);
    $fecha_fin_contrato =$fecha_fin_contrato_temp[2]."-".$fecha_fin_contrato_temp[1]."-".$fecha_fin_contrato_temp[0];
    $puesto = $_POST['puesto'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $numero = $_POST['numero'];
    $poblacion = $_POST['poblacion'];

    /**REALIZAMOS LA CONSULTA */
    try {
        $query = "  INSERT INTO empleados (nombre,apellidos,dni,fecha_nacimiento,fecha_contratacion,fecha_fin_contrato,puesto,telefono,direccion,numero,poblacion)
                    VALUES('$nombre','$apellidos','$dni','$fecha_nacimiento','$fecha_contratacion','$fecha_fin_contrato','$puesto','$telefono','$direccion',$numero,'$poblacion')";
        $resultQuery = $conn->query($query);
        if (!$resultQuery) {
            throw new Exception($conn->error);
        }
        else{
            $response['errorInsert'] = 0;
        }
        $conn->commit();
    } 
    catch (Exception $e) {
        $conn->rollback();
        $response['errorInsert'] = 1;
        $response['mensajeInsert'] = $e->getMessage();
    }

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($response);
}

/**FUNCION PARA EDITAR EL EMPLEADO, RECIBIENDO LOS DATOS DEL JSON RECOGIDOS POR EL MODAL */
function edit_Employee(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    /**RECOGEMOS LOS DATOS */
    $idEmployee = $_POST['idEmployee'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $fecha_nacimiento_temp = explode("/",$_POST['fecha_nacimiento']);
    $fecha_nacimiento =$fecha_nacimiento_temp[2]."-".$fecha_nacimiento_temp[1]."-".$fecha_nacimiento_temp[0];
    $fecha_contratacion_temp = explode("/",$_POST['inicio_contrato']);
    $fecha_contratacion =$fecha_contratacion_temp[2]."-".$fecha_contratacion_temp[1]."-".$fecha_contratacion_temp[0];
    $fecha_fin_contrato_temp = explode("/",$_POST['fin_contrato']);
    $fecha_fin_contrato =$fecha_fin_contrato_temp[2]."-".$fecha_fin_contrato_temp[1]."-".$fecha_fin_contrato_temp[0];
    $puesto = $_POST['puesto'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $numero = $_POST['numero'];
    $poblacion = $_POST['poblacion'];
    /**REALIZAMOS EL UPDATE */
    try {
        $query = "  UPDATE empleados 
                    SET nombre='$nombre',apellidos='$apellidos',dni='$dni',fecha_nacimiento='$fecha_nacimiento',fecha_contratacion='$fecha_contratacion',
                        fecha_fin_contrato='$fecha_fin_contrato',puesto='$puesto',telefono='$telefono',direccion='$direccion',numero='$numero',poblacion='$poblacion' 
                    WHERE id=$idEmployee";
        $resultQuery = $conn->query($query);
        if (!$resultQuery) {
            throw new Exception($conn->error);
        }
        else{
            $response['errorUpdate'] = 0;
            $response['sql'] = $query;
        }
        
        $conn->commit();
    } 
    catch (Exception $e) {
        $conn->rollback();
        $response['errorUpdate'] = 1;
        $response['mensajeUpdate'] = $e->getMessage();
    }

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($response);
}

/**FUNCION PARA BORRAR EL EMPLEADO SELECCIONADO */
function delete_Employee(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idEmployee = $_POST['idEmployee'];
    try {
        $query= "DELETE FROM empleados where id=$idEmployee";
        $resultQuery = $conn->query($query);
        if (!$resultQuery) {
            throw new Exception($conn->error);
        }
        else{
            $response['errorDelete'] = 0;
        }
        
        $conn->commit();
    } 
    catch (Exception $e) {
        $conn->rollback();
        $response['errorDelete'] = 1;
        $response['mensajeDelete'] = $e->getMessage();
    }
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($response);
}
?>