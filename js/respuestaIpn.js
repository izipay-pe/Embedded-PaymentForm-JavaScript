respuestaIPN();

async function respuestaIPN(){

    const response = await fetch('http://ipn-respuesta-nodejs.nn.r.appspot.com/respuesta/IPN')
    
    var respuesta = await response.json()
    var datos = [];

    // Obtener el div card-body
    const cardBody = document.querySelector('.card-body');

    // Obtener la referencia a la tabla
	var table = document.getElementById("miTabla");

    // Crear una nueva fila
    var row = table.insertRow();

    // Crear celdas para la nueva fila
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    for(var i=0; i<respuesta.length; i++){
        
        // Contar el número de propiedades en el objeto
        var numPropiedades = Object.keys(respuesta[i]).length;

        // Mostrar el número de propiedades en la consola
        console.log("El objeto tiene " + numPropiedades + " propiedades."+i);
        
        if(numPropiedades > 5) {
            
            var pre = document.createElement("pre");
            var hr = document.createElement("hr");
            var h3 = document.createElement("h3");
            var salida= 'salida'+i;

            datos = respuesta[i];

            pre.setAttribute("id", salida);
            hr.setAttribute("width",2000);
            hr.setAttribute("size",20);
            pre.textContent = JSON.stringify(datos, undefined, 5);
            h3.textContent = "Objeto "+i+" : ";

            document.body.appendChild(hr);
            document.body.appendChild(h3);
            document.body.appendChild(pre);
            
        } else {          
            
            // Crear elementos HTML
            var tr = document.createElement("tr");
            var tdObjeto = document.createElement("td");
            var tdDatos = document.createElement("td");            
            var pre = document.createElement("pre");
            var hr = document.createElement("hr");
            var h3 = document.createElement("h3");
            var salida= 'salida'+i;
                   
            datos = JSON.parse(respuesta[i]['kr-answer']);

            var transactions = datos.transactions[0].uuid;

            pre.setAttribute("id", salida);
            hr.setAttribute("size",20);
            pre.textContent = JSON.stringify(datos, undefined, 5);
            auxlength = respuesta.length-1
            h3.textContent = "Objeto N° "+i+" de "+auxlength+" : UUID - "+transactions;

            document.body.appendChild(hr);
            document.body.appendChild(h3);
            document.body.appendChild(pre);

            // Agregar los elementos a la fila de la tabla
            tdObjeto.appendChild(h3);
            tdDatos.appendChild(pre);
            tr.appendChild(tdDatos);

            // Agregar la fila a la tabla
            var tabla = document.getElementById("miTabla");

            // Agregar separador después de la fila
            tabla.getElementsByTagName("tbody")[0].appendChild(hr);
            tabla.getElementsByTagName("tbody")[0].appendChild(h3);
            tabla.getElementsByTagName("tbody")[0].appendChild(tr);

            // Agregar la tabla al div card-body
            cardBody.appendChild(tabla);

            document.getElementById('shopId').textContent = transactions
            document.getElementById('orderCycle').textContent = datos['orderCycle']
            document.getElementById('orderStatus').textContent = datos['orderStatus']
            document.getElementById('orderTotalAmount').textContent = datos['orderDetails']['orderTotalAmount']
            document.getElementById('orderCurrency').textContent = datos['orderDetails']['orderCurrency'] 
        }
        
    }
       
}

function agregarFila() {
    // Obtener la referencia a la tabla
    var table = document.getElementById("miTabla");

    // Crear una nueva fila
    var row = table.insertRow();
    var fila = [];
    var celda = [];

    for(var i=0; i<3; i++){
        row.setAttribute("id", fila[i]);
        celda[i] = row.insertCell(i);
        celda[i].innerHTML = "Dato N° : "+[i];
    }
    // Agregar una clase a la nueva fila
    //row.setAttribute("id", "0");

    // Crear celdas para la nueva fila
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Añadir contenido a las celdas
    cell1.innerHTML = "Contenido de la celda 1";
    cell2.innerHTML = "Contenido de la celda 2";
}
