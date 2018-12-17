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
    <title>Registrar</title>
</head>
<body>
    <?php include('php/verifiLogin.php');?>
<div class="container-fluid contenedor">
    <div class="form-register form-group">
        <form action="./php/register_f.php" method="POST">
            <div class="register_tittle bg-warning rounded">
                <span id="form_register_tittle">Nuevo Usuario</span>
            </div>
            <label for="usuario">Usuario</label><input type="text" name="user" id="user" class="form-control">
                <small id="userHelp" class="form-text text-muted">Minimo 5 caracteres</small>
            <label for="email">Correo Electronico</label><input type="email" name="email" id="email" class="form-control">
                <small id="emailHelp" class="form-text text-muted"></small>
            <label for="pass">Contraseña</label><input type="password" name="pass" id="pass" class="form-control">
                <small id="passHelp" class="form-text text-muted">Minimo 5 caracteres</small>
            <input type="submit" value="Registrarse" name="register" class="boton-lg btn btn-primary"/>
        </form>
    </div>
</div>
    <script src="js/lib/jquery-3.3.1.js"></script>
    <script src="js/lib/bootstrap.min.js"></script>
</body>
</html>