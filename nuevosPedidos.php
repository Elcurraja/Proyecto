<?php session_start();?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" >
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <script src="js/lib/jquery-3.3.1.js"></script>

    <title>Nuevo Pedido</title>
</head>
<body>
    <?php include('php/verifiLogin.php');?>
    <div class="container-fluid contenedor">
        <div class="cuerpo">
            <button type="button" class="btn btn-primary float-left" id="verResumen" title="Ver Resumen">Ver Resumen</button>
            <button type="button" class="btn btn-danger float-right" id="borrarCarrito" title="Borrar carrito">Borrar carrito</button>
            <div class='clearfix'></div>
            
        </div>
    </div>
<!-- MODAL PARA ABRIR EL RESUMEN DE LOS PEDIDOS  -->
<div class="modal fade modal-lg" id="modalResumenPedidos" tabindex="-1" role="dialog" aria-labelledby="modalResumenPedidos" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>          
        </div>
        <div class="modal-body">
            <div class="info">
                <span style="font-size:1.4em; display:none"><strong>Selecciona el cliente:</strong></span><select name="sidCliente" class="form-control form-control-lg" id="sidCliente" style="display:none"></select>
            </div>
            <input type="hidden" class="form-control" name="inputIdCliente" id="inputIdCliente"/>
            <input type="hidden" class="form-control" name="inputCliente" id="inputCliente"/>
            <table class="table table-bordered" id="table_resumen_pedido">
            <thead class='thead-dark'>
                <tr>
                    <th scope='col'>Producto</th>
                    <th scope='col'>Cantidad</th>
                    <th scope='col'>Precio/u</th>
                    <th scope='col'>Total € Unidades</th>
                </tr>
                </thead>
                <tbody>                    
                </tbody>
            </table>
            <textarea class="form-control" name="observaciones" id="observaciones"></textarea>
            <label for="total" id="total"><h2></h2></label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-success" id="completarPedido">Completar</button>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="modalPedidoDone" tabindex="-1" role="dialog" aria-labelledby="modalPedidoDone" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>  
          <button type="button" class="btn btn-info" id="generatePDF">Generar Factura <i class="far fa-file-pdf"></i></button>        
        </div>
        <div class="modal-body">
          <p>Pedido realizado correctamente</p>  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
</div>
<?php include('html/footer.php');?>
    <script src="js/lib/bootstrap.min.js"></script>
    <script src='js/nuevosPedidos.js'></script>
</body>
</html>