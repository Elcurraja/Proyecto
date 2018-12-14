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
    <?php include('php/verifiLogin.php');?> 
<div class="container-fluid contenedor">
    <div class="cuerpo">
    <button type="button" class="btn btn-primary" id="addPedido">Añadir Nuevo Pedido</button>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="table_orders"> 
                
            </table>
        </div>
    </div>
</div>

<!-- Modal que cargamos para editar los registros -->
<div class="modal fade" id="modalPedidos" tabindex="-1" role="dialog" aria-labelledby="modalPedidosLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalPedidosLabel">Editar Pedido</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <table class="table table-bordered">
            <tbody id="modalPedidos">
                <tr>
                    <td>
                        <label for="cliente">Cliente </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="cliente" id="cliente"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="fecha">Fecha </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="fecha" id="fecha"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="direccion">Direccion </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="direccion" id="direccion"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="telefono">Telefono </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="telefono" id="telefono"/>
                    </td>
                </tr>
                <tr>
                <tr>
                    <td>
                        <label for="poblacion">Poblacion </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="poblacion" id="poblacion"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="obs">Observaciones </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="obs" id="obs"/>
                    </td>
                </tr>
                
                <input type="hidden" class="form-control" name="mIdOrder" id="mIdOrder"/>
                <input type="hidden" class="form-control" name="mIdClient" id="mIdClient"/>
                <input type="hidden" class="form-control" name="op" id="op"/>  
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick ="insert_order()" id="addModal">Añadir Nuevo Producto</button>
        <button type="button" class="btn btn-primary" onclick ="edit_order()" id="editModal" style="display:none">Editar Producto</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade modal-lg" id="modalOpenDetails" tabindex="-1" role="dialog" aria-labelledby="modalOpenDetails" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn btn-info" id="generatePDF">Generar Factura <i class="far fa-file-pdf"></i></button>
          
        </div>
        <div class="modal-body">
                <label for="idOrder" id="idOrder"><h2></h2></label>
                <input type="hidden" class="form-control" name="idDetallePedido" id="idDetallePedido"/>
            <table class="table table-bordered" id="table_Details_Order">
            <thead class='thead-dark'>
                <tr>
                    <th scope='col'>Producto</th>
                    <th scope='col'>Cantidad</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Total</th>
                </tr>
                </thead>
                <tbody>                    
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
          <!-- <button type="button" class="btn btn-danger" id="borrar_btn" onclick ="">Borrar</button> -->
        </div>
      </div>
    </div>
</div>

<!-- Modal que cargamos para la confirmacion del borrado -->
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

<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/datatables.min.js"></script>  
<script type="text/javascript" src="js/lib/moment.min.js"></script>
<script type="text/javascript" src="js/lib/moment_locale_es.js"></script>
<script type="text/javascript" src="js/lib/tempusdominus-bootstrap-4.min.js"></script>
<script type="text/javascript" src="js/lib/jspdf.min.js"></script> 
<script src='js/pedidos.js'></script>
</body>
</html>