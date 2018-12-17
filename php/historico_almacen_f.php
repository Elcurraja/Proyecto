<?php
include("mysqlConexion.php");

/**RECIBIMOS MEDIANTE $_POST LOS PARAMETROS PARA REALIZAR UNA U OTRA FUNCION */
if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getHistorico':
            get_historico();
            break;
        // case 'getDataGraph':
        //     get_DataGraph();
        //     break;
    }
}

/*CONSULTAMOS LOS DATOS MEDIANTE MYSQL PARA EL HISTORICO_ALMACEN, DEVOLVEMOS LOS DATOS EN UN OBJETO JSON */
function get_historico(){

    $conn=mysql_proyecto();
    $query= "SELECT h.id_historico,h.id_item,p.nombre,h.fecha,h.cantidad 
                FROM `historico_almacen` as h, productos as p 
                WHERE h.id_item = p.id";
    $response = array();

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conn->error;
    } else {
        $response['error'] = 0;
        $response['datosHistorico'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'idHistorico' => $fila['id_historico'],
                'idItem' => $fila['id_item'],
                'nombre' => $fila['nombre'],
                'fecha' => $fila['fecha'],
                'cantidad' => $fila['cantidad'],
            );
            array_push($response['datosHistorico'], $datos);
        }
    }
    echo json_encode($response);
    $conn->close();
}
// function get_DataGraph(){
//     $conn=mysql_proyecto();
//     $query= "SELECT h.id_item, h.fecha, sum(h.cantidad) as cantidad,p.nombre 
//                 FROM `historico_almacen` as h, productos as p 
//                 WHERE h.id_item = p.id
//                 GROUP BY h.id_item";
//     $response = array();

//     $resultQuery =$conn->query($query);
//     if (!$resultQuery) {
//         $response['error'] = 1;
//         $response['mensaje'] = "Error en la consulta: " + $conn->error;
//     } else {
//         $response['datosGraph'] = array();
//         while ($fila = $resultQuery->fetch_assoc()){
//             $datos = array(
//                 'idItem' => $fila['id_item'],
//                 'nombre' => $fila['nombre'],
//                 'fecha' => $fila['fecha'],
//                 'cantidad' => $fila['cantidad'],
//             );
//             array_push($response['datosGraph'], $datos);
//         }
//     }
//     echo json_encode($response);
//     $conn->close();
// }

?>