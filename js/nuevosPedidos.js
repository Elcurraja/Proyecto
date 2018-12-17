$(document).ready(function() {

    load_items()
    
    $('#busqueda_fecha').datetimepicker({
        locale: 'es',
        format: 'DD/MM/YYYY',
    });
    $(document).on('change', 'input', function() {
        var divFooter = $(this).closest('div')
        if($(this).val()!=0){
            divFooter.find(("#addToCart")).prop('disabled', false);
        }
        else {
            divFooter.find(("#addToCart")).prop('disabled', true);
        }
      });
    $(document).on ("click", "button#addToCart", function () {
        var fila = $(this).closest('div.item')
        var id = fila.attr('id')
        
        
        if(!localStorage.getItem("cart")){
            var cart = {}
            cart[id] = {
                'nombre': fila.find('.nombreItem').text(),
                'quantity':fila.find('.quantity').val(),
                'priceu':fila.find('.price').val(),
            }
            localStorage.setItem("cart",JSON.stringify(cart))
        }
        else {
            var cart  = JSON.parse(localStorage.getItem("cart"))
            if(cart[id]){            
                cart[id].quantity = parseInt(cart[id].quantity) + parseInt(fila.find('.quantity').val())
                localStorage.setItem("cart",JSON.stringify(cart))
            }
            else {
                cart[id] = {
                    'nombre': fila.find('.nombreItem').text(),
                    'quantity':fila.find('.quantity').val(),
                    'priceu':fila.find('.price').val(),
                }
                localStorage.setItem("cart",JSON.stringify(cart))
            }
        }
        // console.log(localStorage.getItem("cart"))
    })

    $(document).on ("click", "button#verResumen", function () {
        if($("#idCliente").val()=="admin"){
            $.ajax({
                url:"php/clientes_f.php",
                type:"POST",
                dataType: "json",
                data: {
                    op:"getClientes"
                },
                success: function(response){
                    if (response.error == 1) {
                        console.log("Error en php: " + response.mensaje);
                    }
                    else {
                        $("#sidCliente").empty()
                        for (let index = 0; index < response.datosCliente.length; index++){
                            $("#sidCliente").append(
                                "<option value='" + response.datosCliente[index].id + "'>" + response.datosCliente[index].denominacion + "</option>")
                        }
                    }
                },
                error: function(jqXHR,textStatus, errorThrown){
                    console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
                }
            })
            $("#sidCliente,div.info span").css("display","block")
        }
        else{
            $("#modalResumenPedidos #inputIdCliente").val($("#idCliente").val())
            $("#modalResumenPedidos #inputCliente").val($("#cliente").val())
        }
        var cart = JSON.parse(localStorage.getItem("cart"))
        var array = $.map(cart, function(value, index) {
            return [value];
        });
      
        $("#table_resumen_pedido tbody").empty()
        for (let index = 0; index < array.length; index++){
            var quantity = array[index].quantity
            var price = array[index].priceu
            var total = quantity * price
            var nombre = array[index].nombre
            $("#table_resumen_pedido tbody").append(
                "<tr class='filaOrder'>" +
                    "<td><span>" + nombre + "</span></td>"+
                    "<td><span>" + quantity + "</span></td>"+
                    "<td><span>" + price + "</span></td>"+
                    "<td><span>" + total + "</span></td>"+
                "</tr>");
        }
        $("#modalResumenPedidos").modal("show")
    })
    $(document).on ("click", "button#borrarCarrito", function () {
        localStorage.removeItem("cart")
    })
    $(document).on ("click", "button#completarPedido", function () {
        addOrder(JSON.parse(localStorage.getItem("cart")))
    })
 
})
function load_items(){
 
    $.ajax({
        url:"php/productos_f.php",
        type:"POST",
        dataType: "json",
        data: {
            op:"getProductos"
        },
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + response.mensaje);
            }
        },
        error: function(jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    }).done(function(response){
        
        if(response.cliente =="admin"){
            $(".cuerpo").append("<input type='hidden' class='form-control' name='idCliente' id='idCliente' value='"+ response.cliente +"'>")
        }
        else{
            $(".cuerpo").append("<input type='hidden' class='form-control' name='cliente' id='cliente' value=''>"+
                                "<input type='hidden' class='form-control' name='idCliente' id='idCliente' value=''>")
        }
        for (let index = 0; index < response.datosProductos.length; index++){
            $(".cuerpo").append(
                "<div class='item col-3 float-left' id='" + response.datosProductos[index].id + "'>"+
                    "<div class='float-left' id='img'>"+
                        "<img src='./img/images.jpg' alt='Smiley face' height='130' width='130'><br>"+
                    "</div>"+
                    "<div class='float-left' id='desc'>"+
                        "<span class='nombreItem'><strong>" + response.datosProductos[index].nombre + "</strong></span><br>"+
                        "<span class='TipoItem'><strong>Formato:</strong>" + response.datosProductos[index].tipo + "</span><br>"+
                        "<span><strong>Precio:</strong>"+ response.datosProductos[index].precio +"€</span></br>"+
                        "<input type='hidden' class='form-control price' name='price' id='price' value='" + response.datosProductos[index].precio + "'>"+
                    "</div>"+
                    "<div class='clearfix'></div>"+
                    "<div class='footerItem float-left'>"+
                        "<span>Cantidad</span>"+
                        "<input type='number' class='form-control quantity' name='quantity' id='"+ response.datosProductos[index].id+"quantity'>"+
                        "<button type='button' class='btn btn-primary' id='addToCart' title='añadir' disabled>Añadir</button>"+
                    "</div>"+
                "</div>"+
            ((index+1)%4===0 ? "<div class='clearfix'></div>":""))
        }
    })
    $.ajax({
        url:"php/clientes_f.php",
        type:"POST",
        dataType: "json",
        data: {
            op:"getCliente"
        },
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + response.mensaje);
            }
            if(response!=""){
                $("#cliente").val(response.datosCliente[0].denominacion)
                $("#idCliente").val(response.datosCliente[0].id)
            }
        },
        error: function(jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    })
}
function addOrder(cart){
    if($("#inputIdCliente").val()!=""){
        var idcliente = $("#inputIdCliente").val()
    }
    else{
        var idcliente = $("#sidCliente").val()
    }
    var obs = $("#observaciones").val()
   
    $.ajax({
        url:"php/pedidos_f.php",
        type:"POST",
        dataType: "json",
        data: {
            op:"insertOrder",
            idcliente: idcliente,
            observaciones:obs,
            cart:cart
        },
        success: function(response){
            if (response.error == 1) {
                console.log("Error en php: " + response.mensaje);
            }
            $("#modalResumenPedidos").modal("hide")
            localStorage.removeItem("cart")
            $("#modalPedidoDone").modal("show")
        },
        error: function(jqXHR,textStatus, errorThrown){
            console.log("Error en la peticion AJAX: " + errorThrown + ", " + textStatus);
        }
    })

}