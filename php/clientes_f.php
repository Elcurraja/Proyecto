<?php
include("mysqlConexion.php");

if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getClientes':
            getClientes();
            break;
        // case 'add':
         
        //     break;
        // case 'update': 
        
        //     break;
        // case 'delete':
        
        //     break;
    }
}
function getClientes(){

    $conn=mysql_clientes();
    $query= "SELECT * from clientes";
    $response = array();

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conexion->error;
    } else {
        $response['error'] = 0;
        $response['datosCliente'] = array();
        while ($fila = $resultQuery->fetch_assoc()){
            $datos = array(
                'id' => $fila['id'],
                'denominacion' => $fila['denominacionSocial'],
                'nombre' => $fila['nombre'],
                'apellidos' => $fila['apellidos'],
                'direccion' => $fila['direccion'],
                'telefono' => $fila['telefono'],
                'poblacion' => $fila['poblacion']
            );
            array_push($response['datosCliente'], $datos);
        }
    }
    echo json_encode($response);
    $conn->close();
}

// function editarNaves(){
//     $conn=mysql_manipuladores();
//     $conn->begin_transaction();
//     foreach($_POST['datos'] as $fila){
//         $id=$fila['idnave'];
//         $designacion= $fila['designacion'];
//         $sql= "UPDATE naves SET designacion='$designacion' where idnave=$id";
//         $resultQuery = $conn->query($sql);
//         $conn->commit();
//     }
// }
// function borrarNaves(){
//     $conn=mysql_manipuladores();
//     $conn->begin_transaction();
//     foreach($_POST['datos'] as $fila){
//         $id=$fila['idnave'];
//         $sql= "DELETE FROM naves where idnave=$id";
//         $resultQuery = $conn->query($sql);
//         $conn->commit();
//     }
// }
// function addNave(){
//     $conn=mysql_manipuladores();
//     $conn->begin_transaction();
//     $designacion=$_POST['designacion'];
//     $sql="INSERT INTO naves (designacion) 
//             VALUES ('$designacion')";
//     $resultQuery = $conn->query($sql);
//     $conn->commit();
// }
?>