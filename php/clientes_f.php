<?php
include("mysqlConexion.php");

if(isset($_POST['op'])){
    switch($_POST['op']){
        case 'getCliente':
            getClient();
            break;
        case 'getClientes':
            getClients();
            break;
        case 'insertClient':
            insert_Client();
            break;
        case 'editClient':
            edit_client();
            break;
        case 'deleteCliente': 
            delete_Client();
            break;
    }
}
function getClient(){
    $conn=mysql_proyecto();
    session_start();
    $user = $_SESSION['user'];
    $response = array();
    if($user!="admin"){
        $query= "SELECT id,denominacionSocial from clientes WHERE user='$user'";
        $resultQuery =$conn->query($query);
        if (!$resultQuery) {
            $response['error'] = 1;
            $response['mensaje'] = "Error en la consulta: " + $conn->error;
        } else {
            $response['error'] = 0;
            $response['datosCliente'] = array();
            while ($fila = $resultQuery->fetch_assoc()){
                $datos = array(
                    'id' => $fila['id'],
                    'denominacion' => $fila['denominacionSocial'],
                );
                array_push($response['datosCliente'], $datos);
            }
        }
    }   
    echo json_encode($response);
    $conn->close();
}
function getClients(){

    $conn=mysql_proyecto();
    $query= "SELECT * from clientes";
    $response = array();

    $resultQuery =$conn->query($query);
    if (!$resultQuery) {
        $response['error'] = 1;
        $response['mensaje'] = "Error en la consulta: " + $conn->error;
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
function insert_Client(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idCliente = $_POST['idCliente'];
    $denominacion = $_POST['denominacion'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $poblacion = $_POST['poblacion'];
    try {
        $query = "  INSERT INTO clientes (denominacionSocial,nombre,apellidos,direccion,telefono,poblacion)
                    VALUES('$denominacion','$nombre','$apellidos','$direccion',$telefono,'$poblacion')";
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
function edit_client(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idCliente = $_POST['idCliente'];
    $denominacion = $_POST['denominacion'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $poblacion = $_POST['poblacion'];
    try {
        $query = "  UPDATE clientes 
                    SET denominacionSocial='$denominacion',nombre='$nombre',apellidos='$apellidos',direccion='$direccion',telefono='$telefono',poblacion='$poblacion' 
                    WHERE id=$idCliente";
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
function delete_client(){
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $idCliente = $_POST['idCliente'];
    try {
        $query= "DELETE FROM clientes where id=$idCliente";
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