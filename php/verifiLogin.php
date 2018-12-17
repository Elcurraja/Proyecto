<?php
// COMPROBAMOS SI HEMOS ENVIADO EL PARAMETRO PARA DESTRUIR LA SESION
// DESTRUIMOS LA SESION
if (isset($_POST['destroy'])&& $_POST['destroy']=="si"){
        session_destroy();
}
//COMPROBAMOS SI LA SESION EXISTE Y TIENE EL PARAMETRO DE VERIFI A TRUE
if(isset($_SESSION['verifi']) && $_SESSION['verifi']==TRUE){
    if($_SESSION['user']=="admin"){
        include('./html/menuAdmin.php');
    }
    else{
        include('./html/menuUsers.php');
    }
}
else{
    /*RECIBIMOS LOS PARAMETROS DE USUARIO Y PASSWORD, REALIZAMOS UNA CONSULTA A LA BASE DE DATOS PARA EXTRAER TODOS
    LOS USUARIOS Y SUS PASSWORDS */
    include("mysqlConexion.php");
    $conn=mysql_proyecto();
    $conn->begin_transaction();
    $statusLogin = 'FALSE';
    if(isset($_POST['user'])&& isset($_POST['pass'])){
        $query= "SELECT user,pass from usuarios";
        $resultQuery =$conn->query($query);
    
        if (!$resultQuery) {
            $response['error'] = 1;
            $response['mensaje'] = "Error en la consulta: " + $conexion->error;
        } else {
            /*COMPROBAMOS SI LOS DATOS INTRODUCIDOS CONCUERDAN CON LOS QUE TENEMOS EN LA BASE DE DATOS */
            while ($fila = $resultQuery->fetch_assoc()){
                if($_POST['user']== $fila['user'] && password_verify($_POST['pass'],$fila['pass']) == 1){
                    $statusLogin = 'TRUE';
                }
            }
            /*AL HABERSE REALIZADO LA COMPROBACION Y SER CORRECTA CARGAMOS EL MENU EN FUNCION
            DEL USUARIO QUE HAYA LOGEADO */
            if($statusLogin == 'TRUE'){
                $_SESSION['verifi']=TRUE;
                $_SESSION['user']=$_POST['user'];
                if($_SESSION['user']=="admin"){
                    include('./html/menuAdmin.php');
                }
                else{
                    include('./html/menuUsers.php');
                }
            }
            else {
                $_SESSION['verifi']=FALSE;
                include('./html/menuNoLogin.php');
                header("Location: ./login.php");
            }
        }
    }
    //La sesion no existe, cargamos el menu para la gente que no esta logeada
    else {
        include('./html/menuNoLogin.php');
    }
}
?>