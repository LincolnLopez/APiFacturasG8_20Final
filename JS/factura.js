var UrlGetFacturas ='http://localhost:90/G8_20/controller/facturas.php?op=GetFacturas';
var UrlPostFactura ='http://localhost:90/G8_20/controller/Facturas.php?op=InsertFactura';
var UrlGetUno ='http://localhost:90/G8_20/controller/facturas.php?op=GetUno';
var UrlPutFactura ='http://localhost:90/G8_20/controller/facturas.php?op=UpdateFactura';
var UrlDeleteFactura = 'http://localhost:90/G8_20/controller/facturas.php?op=DeleteFactura';

$(document).ready(function(){
    CargarFacturas();
});
//Función para cargar el formlario
function CargarFacturas(){
    $.ajax({
        url: UrlGetFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarFactura('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarFactura('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+      
             '</tr>';
             $('.facturas').html(Valores);
            }
        }
    });
}

//Función para Ingresar facturas
function AgregarFactura(){
    var datosfactura = {
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val()
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPostFactura,
        type: 'POST',
        data: datosfacturajson, 
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Agregada");
}
//Función para obtener una factura en especifica para su edición o eliminación
function CargarFactura(IDFACTURA){
    var datosfactura = {
        ID:IDFACTURA
    }; 
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosfacturajson, 
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);  
            $('#DETALLE').val(MiItems[0].DETALLE); 
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+MiItems[0].ID+')"'+
            'value="Actualizar Factura" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}
//Función para actualizar información de facturas
function ActualizarFactura(IDFACTURA){
    var datosfactura={
        ID:IDFACTURA,
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val(),
        ESTADO: 'F' 
    };
    var datosfacturajson= JSON.stringify(datosfactura);
    $.ajax({
        url: UrlPutFactura,
        type: 'PUT',
        data: datosfacturajson,
        datatype:'JSON',
        contentType: 'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Factura Actualizado");
}
//Función para eliminar facturas
function EliminarFactura(IDFACTURA){
    var datosfactura={
        ID:IDFACTURA

    };
    var datosfacturajson= JSON.stringify(datosfactura);
    $.ajax({
        url:UrlDeleteFactura,
        type:'DELETE',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
     });
     
     alert("Factura Eliminado");
     CargarFacturas(); // Se agrega para que actualice los resultados 
    }



 