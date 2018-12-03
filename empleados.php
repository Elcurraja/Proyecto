<!DOCTYPE html>
<html lang="es">
<head>
    <!-- https://www.oxygenna.com/freebies
    https://www.oxygenna.com/freebies
    https://material.io/design/color/the-color-system.html#tools-for-picking-colors -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/lib/datatables.min.css">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

    <script src="js/lib/jquery-3.3.1.js"></script>
    <title>Empleados</title>
</head>
<body>
    <?php include('php/verifiLogin.php');?> 
<div class="container-fluid contenedor">
    <div class="cuerpo">
    <button type="button" class="btn btn-primary" id="addEmploye">Añadir Nuevo Empleado</button>
        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="table_employee"> 
                <thead class="thead-dark">
                    <tr>
                        
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Fecha nacimiento</th>
                        <th scope="col">Inicio contrato</th>
                        <th scope="col">Fin Contrato</th>
                        <th scope="col">Puesto</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Nº</th>
                        <th scope="col">Poblacion</th>
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
<div class="modal fade" id="modalEmployee" tabindex="-1" role="dialog" aria-labelledby="modalEmployeeLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEmployeeLabel">Editar Empleado</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <table class="table table-bordered" id="add_manip">
            <tbody id="modalEmployee">
                <tr>
                    <td>
                        <label for="denominacion">Denominacion Social </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="denominacion" id="denominacion"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="nombre">Nombre </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="nombre" id="nombre"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="apellido">Apellidos </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="apellido" id="apellido"/>
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
                    <td>
                        <label for="poblacion">Poblacion </label>
                    </td>
                    <td>
                        <input type="text" class="form-control" name="poblacion" id="poblacion"/>
                    </td>
                </tr>
                <input type="hidden" class="form-control" name="idCliente" id="idCliente"/>
                <input type="hidden" class="form-control" name="op" id="op"/>  
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick ="insert_employee()" id="add">Añadir Nuevo Cliente</button>
        <button type="button" class="btn btn-primary" onclick ="edit_employee()" id="edit" style="display:none">Editar Cliente</button>
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
          <button type="button" class="btn btn-danger" id="borrar_btn" onclick ="delete_client();">Borrar</button>
        </div>
      </div>
    </div>
</div>

<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/datatables.min.js"></script>  
<script src='js/empleados.js'></script>
</body>
</html>