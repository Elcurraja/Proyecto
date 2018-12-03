<?php
session_start();

// Comprobamos si hemos enviado el parametro para destruir la sesion
// Destruimos la sesion y redireccionamos.
if (isset($_POST['destroy'])&& $_POST['destroy']=="si"){
        session_destroy();
}

//Comprobamos si la sesion existe y el atributo para poder logear es correcto
if(isset($_SESSION['verifi'])&& $_SESSION['verifi']==TRUE){
    include('./html/menuLogin.php');
}
else{
    //Comprobamos si los parametros user y admin se han enviado y si son correctos,
    //cambiamos el parametro "verifi" a True y cargamos el menu principal.
    if(isset($_POST['user'])&& isset($_POST['pass'])){
        if($_POST['user']=='admin' && $_POST['pass']=='admin'){
            $_SESSION['verifi']=TRUE;
            include('./html/menuLogin.php');
        }
        else{
            $_SESSION['verifi']=FALSE;
           include('./html/menuNoLogin.php');
           header("Location: ./login.php");
        }
    }
    //La sesion no existe, cargamos el menu para la gente que no esta logeada
    else {
        include('./html/menuNoLogin.php');
        
    }
}
?>