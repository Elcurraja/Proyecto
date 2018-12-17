<?php session_start();?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <title>Login</title>
</head>
<body>
    <?php include('php/verifiLogin.php');?>
<div class="container-fluid contenedor">
    <div class="form-login form-group">
        <form action="./" method="POST">
            <div class="login_tittle bg-warning rounded">
                <span id="form_login_tittle">Iniciar Sesion</span>
            </div>
            <span id="infoLogin" class="form-text text-muted"></span>
            <label for="usuario"> Usuario</label>    <input type="text" name="user" id="user" class="form-control"  placeholder="admin">
            <label for="pass">    Contraseña</label> <input type="password" name="pass" id="pass" class="form-control"  placeholder="admin"><br>
            <input type="submit" value="Login" name="Login" class="boton-lg btn btn-primary"/>
        </form>
    </div>
</div>
<?php include('html/footer.php');?>
    <script src="js/lib/jquery-3.3.1.js"></script>
    <script src="js/lib/bootstrap.min.js"></script>
    <script>
        /*COGEMOS LA URL Y COMPROBAMOS SI TIENE EL PARAMETRO E=1 QUE ES ENVIADO CUANDO INTRODUCIMOS MAL LA CONTRASEÑA O
        USUARIO EN EL LOGIN, Y MOSTRAMOS UN TEXTO EN EL FORM DEL LOGIN *//
        $(function(){
            const url = document.location.href.includes('e=1')
            let params = new URLSearchParams(document.location.search.substring(1));
            if (url) {
                $("#infoLogin").append("Usuario o contraseña incorrecta")
            }
        })
    </script>
</body>
</html>