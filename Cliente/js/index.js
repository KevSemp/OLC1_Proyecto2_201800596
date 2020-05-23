/**
 * Tries to connect to another url (in this case should be our back-end server)
 * and executes a POST operation
 */
function Conn() {

    var url = 'http://localhost:8080/Analisis/';

    var dataAsJson = {
        input: document.getElementById("entrada").value,
        copia: document.getElementById("copia").value
    };

    console.log("Sent value:\n");
    console.log(dataAsJson);

    $.post(url, dataAsJson, function (data, status) {
        console.log(`${data}`)
        var clase = data.mandar.REPORTE_CLASE;
        var metodos = data.mandar.REPORTE_METODO;
        var ast = data.mandar.AST;
        var errores = data.mandar.ERRORES;
        var erroresC = data.mandar.ERRORESC;
        if(errores.length == 0){
        
        jsonView.format(ast,'.root');
    }else{
        console.log("no entro");
    }
        console.log(clase);
        recorrerErrores(errores,erroresC);
        Tabla_Errores(errores,erroresC); 
        recorrer(clase,metodos);
    });
}


function recorrerErrores(Errores,Erroresc){
    var cadena="";
    for(let a = 0; a< Errores.length; a++){
       cadena+="Token: "+Errores[a].Valor+"  Fila: "+Errores[a].Fila+"  Columna: "+Errores[a].Columna+"  Tipo: "+Errores[a].tipoE+"\n";
    }
    if(Erroresc.length != 0)
    {
       cadena+= "Errores en codigo copia: \n";
       for(let a = 0; a< Erroresc.length; a++){
        cadena+="Token: "+Erroresc[a].Valor+"  Fila: "+Erroresc[a].Fila+"  Columna: "+Erroresc[a].Columna+"  Tipo: "+Erroresc[a].tipoE+"\n";
     }


    }

  
    document.getElementById("traduccionJ").value = cadena;

}

function obtenerHT(){
    var p1 = document.getElementById("traduccionP").value;
    saveDocument(p1,"reporteHT.txt");
}

function obtenerJS(){
    var p1 = document.getElementById("traduccionJ").value;
    saveDocument(p1,"reporteJS.txt");
}

function saveDocument(value_Txt, aux_Nombre) {
    let file = new File([value_Txt], aux_Nombre, {
      type: "text/plain;charset=utf-8",
    });
   
    var url = window.URL.createObjectURL(file);
   
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
  
 
    a.href = url;
    a.download = file.name;
    a.onclick = destroyClickedElement;
    a.click();
    window.URL.revokeObjectURL(url);
  }


  function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
  }
   
  function openFiles(file) {
    // obtienes una URL para el fichero que acabas de crear
    var url = window.URL.createObjectURL(file);
    window.open(url, "Download");
  }



function Tabla_Errores(Errores,Erroresc) 
{
    var myTable;
    myTable= "<table class=\"table table-hover\"><tr><td style='width: 100px; color: red;'>Token</td>";
       myTable+="<td style='width: 100px; color: red; text-align: right;'>Fila</td>";
       myTable+="<td style='width: 100px; color: red; text-align: right;'>Columna</td>";
       myTable+="<td style='width: 100px; color: red; text-align: right;'>Descripcion</td></tr>";
   
  
   for (let i = 0; i < Errores.length; i++) {
    myTable+="<tr><td style='width: 100px;text-align: right;'>" + Errores[i].Valor + "</td>";        
    myTable+="<td style='width: 100px;text-align: right;'>" +  Errores[i].Fila + "</td>";    
    myTable+="<td style='width: 100px;text-align: right;'>" +  Errores[i].Columna + "</td>";    
    myTable+="<td style='width: 100px;text-align: right;'>" +  Errores[i].tipoE + "</td>";    
    myTable+="</tr>";

      //console.log(Salida[i].Numero + Salida[i].Valor + Salida[i].Tipo + Salida[i].Fila)
   }
   for (let i = 0; i < Erroresc.length; i++) {
    myTable+="<tr><td style='width: 100px;text-align: right;'>" + Erroresc[i].Valor + "</td>";        
    myTable+="<td style='width: 100px;text-align: right;'>" +  Erroresc[i].Fila + "</td>";    
    myTable+="<td style='width: 100px;text-align: right;'>" +  Erroresc[i].Columna + "</td>";    
    myTable+="<td style='width: 100px;text-align: right;'>" +  Erroresc[i].tipoE + "</td>";    
    myTable+="</tr>";

      //console.log(Salida[i].Numero + Salida[i].Valor + Salida[i].Tipo + Salida[i].Fila)
   }
   myTable+="</table>";
   
   if(Errores.length != 0 || Erroresc.length != 0){
   document.getElementById('tablePrint').innerHTML = myTable;
   }else{
    document.getElementById('tablePrint').innerHTML = '';
   }
    //var blob = new Blob([myTable], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, "testfile1.txt");
}

function recorrer(array,metodos){
    var cadena="";
    cadena += "===Reporte clases copia==="+"\n";
    
    for(let a = 0; a< array.length; a++){
        cadena +="Nombre clase: "+array[a].Nombre+" cantidad de metodos: "+array[a].Metodos+"\n";
    }


    cadena += "===Reporte funciones copia==="+"\n";
    for(let a = 0; a< metodos.length; a++){
        cadena += "=================="+"\n";
        cadena +="Nombre de metodo: "+metodos[a].Nombre+ "\n" + "Nombre clase a que peretenece: "+metodos[a].Clase+"\n";
        cadena += "Parametros:"+"\n";
     for(let v = 0; v< metodos[a].Parametros.length; v++){
        cadena += metodos[a].Parametros[v]+"  "+metodos[a].Ids[v]+"\n";
     }
     cadena += "=================="+"\n";
    }

    document.getElementById("traduccionP").value = cadena;
    console.log(cadena);

}