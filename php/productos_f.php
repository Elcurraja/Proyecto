<?php
include("mysqlConexion.php");

if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getProductos':
            get_Productos();
            break;
        case 'insertProductos':
            insert_Productos();
            break;
        case 'editProductos':
            edit_Productos();
            break;
        case 'deleteProductos': 
            delete_Productos();
            break;
    }
}
function get_Productos(){

    $conn=mysql_proyecto();
    $query= "SELECT * from productos";
    $response = array();

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosProductos'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'id' => $fila['id'],
                'nombre' => $fila['nombre'],
                'tipo' => $fila['tipo'],
                'disponible' => $fila['disponible'],
                'descripcion' => $fila['descripcion'],
                'precio' => $fila['precio']
            );
            array_push($response['datosProductos'], $datos);
        }
    }
    echo json_encode($response);
    $conn->close();
}
function insert_Productos(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProductos = $_POST['idProductos'];
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $disponible = $_POST['disponible'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    try {
        $query = "  INSERT INTO productos (nombre,tipo,disponible,descripcion,precio)
                    VALUES('$nombre','$tipo','$disponible','$descripcion','$precio')";
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
function edit_Productos(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProductos = $_POST['idProductos'];
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $disponible = $_POST['disponible'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    try {
        $query = "  UPDATE productos 
                    SET nombre='$nombre',tipo='$tipo',disponible='$disponible',descripcion='$descripcion',precio='$precio' WHERE id=$idProductos";
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
function delete_Productos(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProductos = $_POST['idProductos'];
    try {
        $query= "DELETE FROM productos where id=$idProductos";
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