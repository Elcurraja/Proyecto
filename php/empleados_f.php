<?php
include("mysqlConexion.php");

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
function insert_Employee(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idEmployee = $_POST['idEmployee'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $fecha_nacimiento = $_POST['fecha_nacimiento'];
    $fecha_contratacion = $_POST['inicio_contrato'];
    $fecha_fin_contrato = $_POST['fin_contrato'];
    $puesto = $_POST['puesto'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $numero = $_POST['numero'];
    $poblacion = $_POST['poblacion'];
    try {
        $query = "  INSERT INTO empleados (nombre,apellidos,dni,fecha_nacimiento,fecha_contratacion,fecha_fin_contrato,puesto,telefono,direccion,numero,poblacion)
                    VALUES('$nombre','$apellidos','$dni','$fecha_nacimiento','$fecha_contratacion','$fecha_fin_contrato','$puesto','$telefono','$direccion','$numero','$poblacion')";
                    echo $query;
        $resultQuery = $conn->query($query);
        if (!$resultQuery) {
            throw new Exception($conn->error);
        }
        else{
            $response['errorUpdate'] = 0;
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
function edit_Employee(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idEmployee = $_POST['idEmployee'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $fecha_nacimiento = $_POST['fecha_nacimiento'];
    $fecha_contratacion = $_POST['inicio_contrato'];
    $fecha_fin_contrato = $_POST['fin_contrato'];
    $puesto = $_POST['puesto'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $numero = $_POST['numero'];
    $poblacion = $_POST['poblacion'];
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