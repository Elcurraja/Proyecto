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
        case 'detailsOrder':
            detailsOrder();
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
                'estado' => $fila['estado'],
            );
            array_push($response['datosOrders'], $datos);
        }
    }

    $query= "SELECT id,denominacionSocial,direccion,telefono,poblacion from clientes";
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
                'direccion' => $fila['direccion'],
                'telefono' => $fila['telefono'],
                'poblacion' => $fila['poblacion'],

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
function detailsOrder(){
    $conn=mysql_proyecto();
    $response = array();
    $idOrder = $_POST['idOrder'];
    $query= "SELECT id_detPedido,id_pedido,id_item,cantidad,precio,(cantidad*precio) AS total FROM pedidos_clientes_det WHERE id_pedido=$idOrder";

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosDetailsOrder'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'idDetPedido' => $fila['id_detPedido'],
                'idPedido' => $fila['id_pedido'],
                'idItem' => $fila['id_item'],
                'cantidad' => $fila['cantidad'],
                'precio' => $fila['precio'],
                'total' => $fila['total'],
            );
            array_push($response['datosDetailsOrder'], $datos);
        }
    }

    $query= "SELECT id,nombre FROM productos";

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosProductos'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'idProducto' => $fila['id'],
                'nombre' => $fila['nombre']
            );
            array_push($response['datosProductos'], $datos);
        }
    }

    echo json_encode($response);
    $conn->close();
}
?>