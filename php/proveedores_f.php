<?php
include("mysqlConexion.php");

if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getProvider':
            get_Provider();
            break;
        case 'insertProvider':
            insert_Provider();
            break;
        case 'editProvider':
            edit_Provider();
            break;
        case 'deleteProvider': 
            delete_Provider();
            break;
    }
}
function get_Provider(){

    $conn=mysql_proyecto();
    $query= "SELECT * from proveedores";
    $response = array();

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosProvider'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'id' => $fila['id'],
                'denominacion' => $fila['denominacion_social'],
                'nombre' => $fila['nombre'],
                'direccion' => $fila['direccion'],
                'telefono' => $fila['telefono']
            );
            array_push($response['datosProvider'], $datos);
        }
    }
    echo json_encode($response);
    $conn->close();
}
function insert_Provider(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProvider = $_POST['idProvider'];
    $denominacion = $_POST['denominacion'];
    $nombre = $_POST['nombre'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    try {
        $query = "  INSERT INTO proveedores (denominacion_social,nombre,direccion,telefono)
                    VALUES('$denominacion','$nombre','$direccion','$telefono')";
                    echo $query;
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
function edit_Provider(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProvider = $_POST['idProvider'];
    $denominacion = $_POST['denominacion'];
    $nombre = $_POST['nombre'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];

    try {
        $query = "  UPDATE proveedores 
                    SET denominacion_social='$denominacion',nombre='$nombre',direccion='$direccion',telefono='$telefono' WHERE id=$idProvider";
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
function delete_Provider(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProvider = $_POST['idProvider'];
    try {
        $query= "DELETE FROM proveedores where id=$idProvider";
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