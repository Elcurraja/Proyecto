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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" >
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/lib/tempusdominus-bootstrap-4.min.css"/>

    <script src="js/lib/jquery-3.3.1.js"></script>
    <title>Pedidos</title>
</head>
<body>
    <?php include('php/verifiLogin.php')?>
<div class="container-fluid contenedor">
    <div class="cuerpo">
    <button type="button" class="btn btn-primary" id="addOrder" title="Nuevo Pedido">Nuevo Pedido</button>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="table_orders"> 
                
            </table>
        </div>
    </div>
</div>

<!-- MODAL QUE CARGAMOS PARA LA ABRIR DETALLES DEL PEDIDO -->
<div class="modal fade modal-lg" id="modalOpenDetails" tabindex="-1" role="dialog" aria-labelledby="modalOpenDetails" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn btn-info" id="generatePDF">Generar Factura <i class="far fa-file-pdf"></i></button>
        </div>
        <div class="modal-body">
                <div class="info"></div>
                <input type="hidden" class="form-control" name="idDetallePedido" id="idDetallePedido"/>
            <table class="table table-bordered" id="table_Details_Order">
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
            <label for="total" id="total"><h2></h2></label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
</div>

<!-- MODAL QUE CARGAMOS PARA LA CONFIRMACION DEL BORRADO -->
<div class="modal fade" id="modal_confirm_borrar" tabindex="-1" role="dialog" aria-labelledby="modal_confirm_borrar" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmación</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <p id="mensaje_confirm_borrar">
                ¿Esta seguro de querer borrar el siguiente registro?
            </p>
            <p id="cuerpo_mensaje">
            </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-danger" id="borrar_btn" onclick ="delete_producto();">Borrar</button>
        </div>
      </div>
    </div>
</div>

<div class="modal fade" id="modal_NoProductos" tabindex="-1" role="dialog" aria-labelledby="modal_NoProductos" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Error</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <p id="mensaje_noProductos">
                No hay productos para esta factura
            </p>
            <p id="cuerpo_mensaje">
            </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
</div>
    <?php include('html/footer.php');?>
    <script src="js/lib/bootstrap.min.js"></script>
    <script src="js/lib/datatables.min.js"></script>  
    <script type="text/javascript" src="js/lib/moment.min.js"></script>
    <script type="text/javascript" src="js/lib/moment_locale_es.js"></script>
    <script type="text/javascript" src="js/lib/tempusdominus-bootstrap-4.min.js"></script> 
    <script type="text/javascript" src="js/lib/jspdf.min.js"></script> 
    <script src='js/pedidos.js'></script>
</body>
</html>