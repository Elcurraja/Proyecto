<?php
include("mysqlConexion.php");

if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getOrders':
            get_Orders();
            break;
        case 'insertOrder':
            insert_Order();
            break;
        case 'editOrder':
            edit_Order();
            break;
        case 'deleteOrder': 
            delete_Order();
            break;
    }
}
function get_Orders(){

    $conn=mysql_proyecto();
    $response = array();

    $query= "SELECT * from pedidos_clientes";
    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosOrders'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'id' => $fila['id_pedido'],
                'id_cliente' => $fila['id_cliente'],
                'observaciones' => $fila['observaciones'],
                'fecha' => $fila['fecha'],
            );
            array_push($response['datosOrders'], $datos);
        }
    }

    $query= "SELECT id,denominacionSocial from clientes";
    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosClient'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'id' => $fila['id'],
                'denominacion' => $fila['denominacionSocial'],
            );
            array_push($response['datosClient'], $datos);
        }
    }

    echo json_encode($response);
    $conn->close();
}
function insert_Order(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $nombre = $_POST['nombre'];
    $id_cliente = $_POST['id_cliente'];
    $observaciones = $_POST['observaciones'];
    $fecha = $_POST['fecha'];
    try {
        $query = "  INSERT INTO pedidos (id_cliente,observaciones,fecha)
                    VALUES('$id_cliente','$observaciones','$fecha')";
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
function edit_Order(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idOrder = $_POST['idOrder'];
    $idCliente = $_POST['idCliente'];
    $observaciones = $_POST['observaciones'];
    $fecha = $_POST['fecha'];
    
    try {
        $query = "  UPDATE pedidos 
                    SET idCliente='$idCliente',observaciones='$observaciones',fecha='$fecha' WHERE id_pedido=$idOrder";
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
function delete_Order(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idOrder = $_POST['idOrder'];
    try {
        $query= "DELETE FROM pedidos where id=$idOrder";
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