<script>
        function cerrar_sesion(){
            $.ajax({
                url:"",
                type:"POST",
                data:{
                    "destroy":"si"
                },
                success:function(respuesta){
                    location.href ="./";
                },
                error:function(jqXHR, textStatus, errorThrown){
                    console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
                }
            });
        }
    </script>
<div id="cont" class="sticky-top">
    <nav class="menu navbar navbar-expand navbar-primary">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="menu_li nav-item">
                    <a class="nav-link" href="./">Principal</a>
                    <div id="divlow1"></div>
                </li>
                <li class="menu_li nav-item">
                    <a class="nav-link" href="./nuevosPedidos.php">Pedidos</a>
                    <div id="divlow3"></div>
                </li>
                <li class="menu_li nav-item">
                    <a class="nav-link"  href="#" onclick="cerrar_sesion()">Logout</a>
                    <div id="divlow4"></div>
                </li>
            </ul>
        </div>
    </nav>
</div>
<script>
    //SCRIPT PARA AÑADIR UNA CLASE A UN DIV EN EL MENU PARA SABER DONDE ESTAMOS
  $(document).ready(function() {
    var url= (window.location.pathname).split("/")
   
    if(url[2]=='empleados.php'|| url[2]=='proveedores.php' || url[2]=='clientes.php'){
        $("#divlow5").addClass("subdiv")
    }
    else if(url[2]=='historico_almacen.php'){
        $("#divlow4").addClass("subdiv")
    }
    else if(url[2]=='pedidos.php'){
        $("#divlow3").addClass("subdiv")
    }
    else if(url[2]=='productos.php'){
        $("#divlow2").addClass("subdiv")
    }
    else{
        $("#divlow1").addClass("subdiv")
    }
  })
</script>
 