function listarCliente() {
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET",
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#list_cliente").empty();
            pintarRespuesta(respuesta.items);
        }
    })
}

function pintarRespuesta(items) {

    let myTable = "<table>";
    if (items.length > 0) {
        myTable += "<tr>";
        myTable += "<th>" + "ID" + "</th>";
        myTable += "<th>" + "NOMBRE" + "</td>";
        myTable += "<th>" + "EMAIL" + "</td>";
        myTable += "<th>" + "EDAD" + "</td>";
        myTable += "</tr>"
    }
    
   
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td><a href='./detalle_cliente.html'>" + items[i].name + "</a></td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable+="<td> <button onclick='eliminarCliente("+items[i].id+")'>Borrar</button>";
        myTable += "</tr>"
    }
    myTable += "</table>"
    $("#list_cliente").append(myTable);
}

function crearCliente(){
    let myData= {
        id:$("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#edad").val(),
    };
    let dataToSend = JSON.stringify(myData);        
    console.log(dataToSend)
    $.ajax({
        url:"https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            console.log(respuesta);
            $("#name").val("");
            $("#email").val("");
            $("#edad").val("");
            $("#list_cliente").empty();
            listarCliente();

        },error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status );
            
        }
    }); 
}

function eliminarCliente(idElement){
    let myData ={
        id: idElement
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta){
            $("#list_client").empty();
            listarCliente();
        }
    })
}

function editarCliente(){
    let myData = {
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#edad").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g6ec27d31f0870f-db202109251721.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            listarCliente();
        }
    });
}

