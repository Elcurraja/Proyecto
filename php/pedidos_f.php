<?php
include("mysqlConexion.php");

/**RECIBIMOS MEDIANTE $_POST LOS PARAMETROS PARA REALIZAR UNA U OTRA FUNCION */
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

/*CONSULTA PARA SELECCIONAR TODOS LOS PEDIDOS, SE DEVUELVE MEDIANTE UN OBJETO JSON */
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


/*FUNCION PARA INSERTAR LOS PEDIDOS, RECIBIMOS EL IDCLIENTE,OBSERVACIONES Y GENERAMOS LA FECHA ACTUAL PARA POSTERIORMENTE INSERTARLA
EN LA TABLA DE PEDIDOS, SI SE HA REALIZADO CORRECTAMENTE SACAMOS EL ID DEL ULTIMO REGISTRO QUE SERA EL ID DEL PEDIDO PARA USARLO
MAS ABAJO CUANDO INSERTEMOS CADA PRODUCTO EN LA TABLA DETALES PEDIDOS CLIENTES*/
function insert_Order(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();

    $statusPedidos = false;
    $cliente = $_POST['idcliente'];
    $obs= $_POST['observaciones'];
    $fecha = date('Y/m/d');
    try {
        $sqlPedido = "INSERT INTO pedidos_clientes (id_cliente,observaciones,fecha) VALUES ($cliente,'$obs','$fecha')";
        $resultQuery = $conn->query($sqlPedido);
        if (!$resultQuery) {
            throw new Exception($conn->error);
        }
        else{
            $idPedido = mysqli_insert_id($conn);
            $statusPedidos = true;
        }
        $conn->commit();
        } 
    catch (Exception $e) {
        $conn->rollback();
        $response['errorInsert'] = 1;
        $response['mensajeInsert'] = $e->getMessage();
    }
    /*SI STATUSPEDIDOS SE HA INSERTADO CORRECTAMENTE VALDRA TRUE */
    if($statusPedidos){
        try {
            /*RECOGEMOS LOS DATOS DEL CARRITO Y LOS RECORREMOS CON UN FOREACH
            VALIENDO KEY EL IDPRODUCTO Y $FILA CONTIENE EL NOMBRE, CANTIDAD Y PRECIO  DEL MISMO*/
            $datosCart = $_POST['cart'];
            foreach($datosCart as $key=>$fila){
                $item = $fila['nombre'];
                $cantidad = $fila['quantity'];
                $precio =  $fila['priceu'];

                /*REALIZAMOS EL SQL PARA INSERTAR EN LA TABLA DE PEDIDOS_CLIENTE_DET, LUEGO HACEMOS UN UPDATE A PRODUCTOS PARA DISMINUIR LA CANTIDAD
                DE CADA PRODUCTO QUE TENEMOS DISPONIBLE Y POR ULTIMO CADA PRODUCTO QUE HEMOS VENDIDO ES UN REGISTRO NUEVO EN LA TABLA HISTORICO */
                $sqlInsertDetPedido = "INSERT INTO pedidos_clientes_det (id_pedido,id_item,cantidad,precio) VALUES ($idPedido,$key,$cantidad,$precio)";
                $resultQuery = $conn->query($sqlInsertDetPedido);

                $sqlUpdateCantidadItem = "UPDATE productos SET disponible= disponible-$cantidad WHERE id = $key";
                $resultQuery = $conn->query($sqlUpdateCantidadItem);

                $sqlInsertHistorial = "INSERT INTO historico_almacen (id_item,fecha,cantidad) VALUES($key,'$fecha',$cantidad)";
                $resultQuery = $conn->query($sqlInsertHistorial);
                
                if (!$resultQuery) {
                    throw new Exception($conn->error);
                }
                else{
                   $response['mensajeInsertDetallesPedidos']=0;
                }
                $conn->commit();
            }
        } 
        catch (Exception $e) {
            $conn->rollback();
            $response['mensajeInsertDetallesPedidos'] = 1;
            $response['mensajeInsertDetallesPedidos'] = $e->getMessage();
        }
     }
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($response);
}

/**FUNCION PARA BORRAR UN PEDIDO */
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

/**REALIZAMOS LA CONSULTA PARA ENVIAR LOS DATOS TENIENDO EN CUENTA EL IDORDER RECIBIDO */
function detailsOrder(){
    $conn=mysql_proyecto();
    $response = array();
    $idOrder = $_POST['idOrder'];
    $query = "SELECT pct.id_detPedido, pct.id_pedido, pct.id_item, pct.cantidad, pct.precio, ( pct.cantidad * pct.precio ) AS total, 
                    c.denominacionSocial,c.direccion,c.telefono,c.poblacion, p.nombre as producto
            FROM pedidos_clientes_det as pct, clientes as c , pedidos_clientes as pc, productos as p
            WHERE pc.id_cliente = c.id AND pct.id_pedido = pc.id_pedido AND pct.id_item = p.id AND pct.id_pedido = $idOrder";
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
                'producto' => $fila['producto'],
                'denominacionSocial' => $fila['denominacionSocial'],
                'direccion' => $fila['direccion'],
                'telefono' => $fila['telefono'],
                'poblacion' => $fila['poblacion'],
                'cantidad' => $fila['cantidad'],
                'precio' => $fila['precio'],
                'total' => $fila['total'],
            );
            array_push($response['datosDetailsOrder'], $datos);
        }
    }
    echo json_encode($response);
    $conn->close();
}
?>