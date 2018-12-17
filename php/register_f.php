<?php
include("mysqlConexion.php");

$conn=mysql_proyecto();
$conn->begin_transaction();
/*RECIBIMOS LOS DATOS DEL FORMULARIO Y GENERAMOS UNA CONTRASEÑA ENCRIPTANDOLA CON PASSWORD_HASH() */
$usuario = $_POST['user'];
$email = $_POST['email'];
$password = password_hash($_POST['pass'], PASSWORD_DEFAULT);

/*PRIMERO COMPROBAMOS QUE NO EXISTAN YA */
$query= "SELECT user,email from usuarios";
$resultQuery =$conn->query($query);
if (!$resultQuery) {
    $response['error'] = 1;
    $response['mensaje'] = "Error en la consulta: " + $conexion->error;
} else {
    $status = 'False';
    /*RECORREMOS LOS DATOS DE LA TABLA USUARIO PARA COMPROBAR UNO A UNO */
    while ($fila = $resultQuery->fetch_assoc()){
        if($usuario==$fila['user'] || $email==$fila['email']){
            $response['error'] = 'Usuario o email ya en uso';
            break;
        }
        else{
            $status = 'TRUE';
        }
    }
    /*AL NO EXISTIR INSERTAMOS EL USUARIO, SU CLAVE Y EL CORREO EN LA TABLA DE USUARIOS */
    if ($status == 'TRUE'){
        try {
            $queryInsert = "INSERT INTO usuarios (user,pass,email) VALUE ('$usuario','$password','$email')";
            $resultQuery = $conn->query($queryInsert);
            if (!$resultQuery) {
                throw new Exception($conn->error);
            }
            else{
                $response['errorRegister'] = 0;
                 header("Location: ../index.php");
            }
            $conn->commit();
        } 
        catch (Exception $e) {
            $conn->rollback();
            $response['errorRegister'] = 1;
            $response['mensajeRegister'] = $e->getMessage();
        }
    }
}
echo json_encode($response);
$conn->close();
?>