<?php session_start();?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/lib/datatables.min.css">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <title>Principal</title>
  <script src="js/lib/jquery-3.3.1.js"></script>
</head>
<body>
    <?php include('php/verifiLogin.php');?>
    </div>
    <div class="container-fluid contenedor" style="height:560px">
        <div class="cuerpo">
        <div class="jumbotron">
            <h1 class="display-4">Proyecto Desarrollo de Aplicaciones Web</h1>
            <p class="lead">La aplicacion consiste en una pagina para la venta de productos a empresas de restauracion</p>
            </div>
        </div>
    </div>
    <?php include('html/footer.php');?>
    <script src="js/lib/bootstrap.min.js"></script>
    <script src="js/lib/datatables.min.js"></script>  
    </body>
</html>