<?php
include("mysqlConexion.php");

/**RECIBIMOS MEDIANTE $_POST LOS PARAMETROS PARA REALIZAR UNA U OTRA FUNCION */
if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getProductos':
            get_Productos();
            break;
        case 'insertProducto':
            insert_Productos();
            break;
        case 'editProducto':
            edit_Productos();
            break;
        case 'deleteProducto': 
            delete_Productos();
            break;
    }
}
/*CONSULTA PARA SELECCIONAR TODOS LOS PRODUCTOS, SE DEVUELVE MEDIANTE UN OBJETO JSON */
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
    /*COGEMOS MEDIANTE $_SESSION['user'] EL USUARIO QUE ESTA LOGEADO ACTUALMENTE
    PARA LUEGO AL MOSTRARLO EN LOS PEDIDOS DETERMINAR QUE USUARIO LO HA REALIZADO */
    session_start();
    $response['cliente'] = $_SESSION['user'];
    echo json_encode($response);
    $conn->close();
}

/*CONSULTA PARA INSERTAR EL PRODUCTO, SE DEVUELVE UN OBJETO JSON CON EL ERROR SI HUBIESE Y EL MENSAJE */
function insert_Productos(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $disponible = $_POST['disponible'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    try {
        $query = "  INSERT INTO productos (nombre,tipo,disponible,descripcion,precio)
                    VALUES('$nombre','$tipo','$disponible','$descripcion','$precio')";
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


/*CONSULTA PARA EDITAR EL PRODUCTO, SE DEVUELVE UN OBJETO JSON CON EL ERROR SI HUBIESE Y EL MENSAJE */
function edit_Productos(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProductos = $_POST['idProducto'];
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

/*CONSULTA PARA BORRAR EL PRODUCTO, SE DEVUELVE UN OBJETO JSON CON EL ERROR SI HUBIESE Y EL MENSAJE */
function delete_Productos(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idProducto = $_POST['idProducto'];
    try {
        $query= "DELETE FROM productos where id=$idProducto";
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