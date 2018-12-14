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
    <title>Productos</title>
</head>
<body>
    <?php include('php/verifiLogin.php');?> 
<div class="container-fluid contenedor">
    <div class="cuerpo">
    <button type="button" class="btn btn-primary" id="addProduct">Añadir Nuevo Producto</button>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="table_productos"> 
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Disponible</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal que cargamos para editar los registros -->
<div class="modal fade" id="modalProductos" tabindex="-1" role="dialog" aria-labelledby="modalProductosLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalProductosLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <table class="table table-bordered">
            <tbody id="modalProductos">
                <tr>
                    <td>
                        <label for="nombre">Nombre producto </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="nombre" id="nombre"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="tipo">Tipo </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="tipo" id="tipo"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="cDisponible">Cantidad Disponible </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="cDisponible" id="cDisponible"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="descripcion">Descripcion </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="descripcion" id="descripcion"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="precio">Precio </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="precio" id="precio"/>
                    </td>
                </tr>
                <input type="hidden" class="form-control" name="idProducto" id="idProducto"/>
                <input type="hidden" class="form-control" name="op" id="op"/>  
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick ="insert_product()" id="addModal">Añadir Nuevo Producto</button>
        <button type="button" class="btn btn-primary" onclick ="edit_product()" id="editModal" style="display:none">Editar Producto</button>
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
          <button type="button" class="btn btn-danger" id="borrar_btn" onclick ="delete_product();">Borrar</button>
        </div>
      </div>
    </div>
</div>

<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/datatables.min.js"></script>  
<script src='js/productos.js'></script>
</body>
</html>