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
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

    <script src="js/lib/jquery-3.3.1.js"></script>
    <title>Historico Almacen</title>
</head>
<body>
    <?php include('php/verifiLogin.php');?> 
<div class="container-fluid contenedor">
    <div class="cuerpo">
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="tabla_historico_almacen"> 
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
    <?php include('html/footer.php');?>
    <script src="js/lib/bootstrap.min.js"></script>
    <script src="js/lib/datatables.min.js"></script>  
    <script src='js/historico_almacen.js'></script>
</body>
</html>