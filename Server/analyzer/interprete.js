var fs = require('fs'); 
var parser = require('./gramatica');
var cont = 0;




// Constantes para operaciones, instrucciones y valores
const TIPO_INSTRUCCION = require('./instrucciones').TIPO_INSTRUCCION;
const TIPO_OPERACION = require('./instrucciones').TIPO_OPERACION;
const TIPO_VALOR = require('./instrucciones').TIPO_VALOR;
const TIPO_ERROR = require('./instrucciones').TIPO_ERROR;
const instruccionesAPI = require('./instrucciones').instruccionesAPI;
const TIPO_OPCION_SWITCH = require('./instrucciones').TIPO_OPCION_SWITCH;
const DEFINICION  = require('./instrucciones').DEFINICION;
const Errores  = require('./instrucciones').err;

// Tabla de Simbolos
const TIPO_DATO = require('./tabla_simbolos').TIPO_DATO;
const TS = require('./tabla_simbolos').TS;
const ER = require('./instrucciones');



//Necesario para reporte clases
Classes =  new Array();
ClasseC = new Array();
Mets = new Array();
Params  = new Array();
identificadors = new Array();
reporteClase = new Array();
reporteCOPIA = new Array();
reporte = new Array();
reporteFun = new Array();

var ObjParams = class {
    Tipo;
    Idenntificador;
   // tipotOKEN=TIPO;


    constructor(Tipo,Idenntificador) {
      this.Tipo = Tipo,
      this.Idenntificador = Idenntificador;
    
     
    }
  }

  

var ObjMetsC = class {
    Clase;
    Tipo;
    Nombre;
    Parametros;
    Ids;
   // tipotOKEN=TIPO;


    constructor(Clase,Tipo,Nombre,Parametros,Ids) {
      this.Clase = Clase;
      this.Tipo = Tipo;
      this.Nombre = Nombre;
      this.Parametros = Parametros;
      this.Ids = Ids;
    
     
    }
  }



var ObjMets = class {
    Tipo;
    Nombre;
    Parametros;
    Ids;
   // tipotOKEN=TIPO;


    constructor(Tipo,Nombre,Parametros,Identificadores) {
      this.Tipo = Tipo,
      this.Nombre = Nombre;
      this.Parametros = Parametros;
      this.Ids = Identificadores;
    
     
    }
  }

var ObjClases = class {
    Nombre;
    Metodos;
   // tipotOKEN=TIPO;


    constructor(Nombre,Metodos) {
      
      this.Nombre = Nombre;
      this.Metodos = Metodos;
    
     
    }
  }

  const recibir ={


    nuevoRecibir: function(valor,c){
        reporte = [];
        reporteFun  = [];
        
   let ast = parser.parse(valor.toString());
   
   let errores = Errores.mandarError();
   Errores.vaciar();
   console.log(errores.length+"tamaaa;oooooo");
   let astC = parser.parse(c.toString());
   let erroresC = Errores.mandarError();
   Errores.vaciar();
   recorrerErrores();
   if(errores.length == 0){
    if(c.length  != 0){
   recorrerClase(ast,Classes);
   recorrerClase(astC,ClasseC);
   analisisClass(Classes,ClasseC);
    }
  // recorrerCopia(reporteCOPIA);
   recorrerReporte(reporte);
   recorrerReporteF(reporteFun);
   }else{
      console.log("no entro");

   }
   var mandar={
       REPORTE_CLASE:reporte,
       REPORTE_METODO:reporteFun,
       AST:ast,
       ERRORES:errores,
       ERRORESC:erroresC
   }
   errores = null;
   Errores.vaciar();

   return{
       mandar
   }
   
},
nuevaCopia: function(valor){
    console.log(valor);
 
 }
}

module.exports.recibir = recibir;

let ast;
let astC;
try {
    // leemos nuestro archivo de entrada
    const entrada = fs.readFileSync('./entrada.txt');
    // invocamos a nuestro parser con el contendio del archivo de entradas
    ast = parser.parse(entrada.toString());
    
    // imrimimos en un archivo el contendio del AST en formato JSON
    fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2));
} catch (e) {
    console.error(e);
    return;
}

recorrerErrores();

function recorrerErrores(){

    for(let a = 0; a< Errores.length; a++){
       console.log(Errores[a].Valor+Errores[a].Fila+Errores[a].Columna+Errores[a].tipoE);
    }

}



var ropClases = class {
    Nombre;
    NombreMetodos;
   // tipotOKEN=TIPO;


    constructor(Nombre,NombreMetodos) {
      
      this.Nombre = Nombre;
      this.NombreMetodos = NombreMetodos;
    
     
    }
  }



// Creación de una tabla de simbolos GLOBAL para iniciar con el interprete
const tsGlobal = new TS([]);

// Procesamos las instrucciones reconocidas en nuestro AST
//procesarBloque(ast, tsGlobal);
//recorrerClase(ast,Classes);

//recorrerClase(astC,ClasseC);

//ver(Classes);
//ver(ClasseC);

//analisisClass(Classes,ClasseC);

function analisisClass (Original,Copia){
    var contF;
    var nombre;
    var nombreM;
    var cantidadMC;
    var cantidadMO;
    var tipo;
    var contador=0;
    var contadorP=0;
    var valMetodo;
    var valParametro;
    console.log("analisis");
    for(let a = 0; a< Original.length; a++){
      contador = 0;
           cantidadMC = 0;
           cantidadMO = 0;
    for(let b = 0; b< Copia.length; b++){

          if(Original[a].Nombre === Copia[b].Nombre){


            console.log("son iguales no te veo muy fresco nombre de clases iguales");
            console.log(Original[a].Nombre +"  match  "+ Copia[b].Nombre);
                nombre =  Original[a].Nombre;
                cantidadMO = Original[a].Metodos.length;
                cantidadMC = Copia[b].Metodos.length;
             if(Original[a].Metodos.length == 0 && Copia[b].Metodos.length == 0){
                reporte.push(new ObjClases(nombre,Mets.length));
             }else{
            for(let c=0 ; c< Original[a].Metodos.length; c++){
            
                 for(let d=0; d<Copia[b].Metodos.length; d++){

                    if(Original[a].Metodos[c].Nombre === Copia[b].Metodos[d].Nombre){
                        contador++;
                        console.log("aleluya comoej eso nombre de metodos iguales");
                        console.log(Original[a].Metodos[c].Nombre+ " match  "+  Copia[b].Metodos[d].Nombre)
                          nombreM = Original[a].Metodos[c].Nombre;
                           tipo = Original[a].Metodos[c].Tipo;
                           valParametro = true;
                          for(let e=0; e<Original[a].Metodos[c].Parametros.length ; e++){
                              
                        

                          
                                 if(Original[a].Metodos[c].Parametros[e] === Copia[b].Metodos[d].Parametros[e]){
                                    contadorP++;
                                     console.log("parametros iguales");
                                     console.log(Original[a].Metodos[c].Parametros[e] + "  match  "+ Copia[b].Metodos[d].Parametros[e])
                                     Params.push(Original[a].Metodos[c].Parametros[e]);
                                     identificadors.push(Original[a].Metodos[c].Ids[e]);

                                 }else{
                                     console.log("parametros no iguales");
                                     Params=[];
                                     identificadors =[];
                                     valParametro=false;
                                    
                                 }

                        
                         
                       }

                       if(valParametro == true){
                           valMetodo = true;
                          Mets.push(new ObjMets(tipo,nombreM,Params,identificadors));
                          reporteFun.push(new ObjMetsC(nombre,tipo,nombreM,Params,identificadors));
                          Params=[];
                          identificadors=[];
                       }
                        

                    }else{
                        valMetodo = false;
                        console.log("100% pana");
                    }
                  

                 }



            }
        }
     
            if(contador == cantidadMC && cantidadMC == cantidadMO && valMetodo ==true){
           contador = 0;
           cantidadMC = 0;
           cantidadMO = 0;
           valMetodo = false;
        console.log("entrooo");
        reporteCOPIA.push(new ObjClases(nombre,Mets));
        reporte.push(new ObjClases(nombre,Mets.length));
        
    }
        Mets = [];
            
          }else{
              console.log("todo bien mi bro");
          }



    }
    
    
    
    }

}


function recorrerReporte(array){
    console.log("===Reporte clases copia===")
    for(let a = 0; a< array.length; a++){
     console.log("Nombre clase: "+array[a].Nombre+" cantidad de metodos: "+array[a].Metodos);
    }
    reporteCOPIA = [];
    ClasseC = [];
    Classes = [];
}

function recorrerReporteF(array){
    console.log("===Reporte funciones copia===")
    for(let a = 0; a< array.length; a++){
     console.log("Nombre clase: "+array[a].Clase+" nombre de metodo: "+array[a].Nombre);
     console.log("parametros");
     for(let v = 0; v< array[a].Parametros.length; v++){
        console.log(array[a].Parametros[v]+"  "+array[a].Ids[v]);
     }
    }
    reporteCOPIA = [];
    ClasseC = [];
    Classes = [];

}

function recorrerCopia(array){
    console.log("===esto es copia===");
    for(let a = 0; a< array.length; a++){
        console.log("nombre clase");
        console.log(array[a].Nombre+"cantidad de funciones"+array[a].Metodos.length);
        for(let v = 0; v< array[a].Metodos.length ; v++){
            console.log("nombre metodo");
                  console.log(array[a].Metodos[v].Nombre + array[a].Metodos[v].Tipo);
                  console.log("tipos de los parametros");
                  for(let c = 0; c < array[a].Metodos[v].Parametros.length;c++){
                        console.log(array[a].Metodos[v].Parametros[c]+array[a].Metodos[v].Ids[c]);
                  }
                 

        }
    }
    reporteCOPIA = [];
    ClasseC = [];
    Classes = [];

}


function ver(array){
    console.log("esto es ver");
    for(let a = 0; a< array.length; a++){
        console.log(array[a].Nombre);
        for(let v = 0; v< array[a].Metodos.length ; v++){
                  console.log(array[a].Metodos[v].Nombre + array[a].Metodos[v].Tipo);
                  for(let c = 0; c < array[a].Metodos[v].Parametros.length;c++){
                        console.log(array[a].Metodos[v].Parametros[c]);
                  }

        }
    }




}

function recorrerClase(instruccion,array){
console.log("abr");
var nombre;
var tipo;
Mets = [];
Params = [];

    for(var v in instruccion){
       
        //console.log(instruccion[v]);
        
        if(instruccion[v].tipo === TIPO_INSTRUCCION.CLASS){
            //console.log(instruccion[v].nombre);
             nombre  =  instruccion[v].nombre;
            
           // console.log(instruccion[v]);
            for(var a in instruccion[v]){
               // console.log(instruccion[v][a]);
                if(a == "instrucciones"){
                    
                   
                    console.log(instruccion[v][a]);
                   
                    for(var meto in instruccion[v][a]){
                        
                        if(instruccion[v][a][meto] !== undefined ){
                        if(instruccion[v][a][meto].tipo === TIPO_INSTRUCCION.METODO){
                            var n_metodo;
                        //console.log(instruccion[v][a][meto].nombre+"este lo podria guardar");
                        n_metodo = instruccion[v][a][meto].nombre;
                        tipo = instruccion[v][a][meto].tipoMetodo;
                        recorrerMetodo(instruccion[v][a][meto]);
                        //console.log("ya sali");
                        for (let i = 0; i < Params.length; i++) {
      
                            //console.log(Params[i]);
                            
                         }
                         Mets.push(new ObjMets(tipo,n_metodo,Params,identificadors));
                        
                         Params = [];
                         identificadors = [];
                        }
                    }
                    }
                
                }
            }
            array.push(new ObjClases(nombre,Mets));
            Mets = [];
        }

        
        
        if(instruccion[v].tipo === TIPO_INSTRUCCION.METODO){
         // console.log(instruccion[v].nombre)
          recorrerMetodo(instruccion[v]);

        }



         if(v == "tipo"){
           //console.log(instruccion[v]);
         }



    }


}


function recorrerMetodo(metodo){
   
  for(var v in metodo){
      if(v == "nombre"){
        console.log(metodo[v]);
      }
      if(v == "parametros"){
         // console.log("entro");
          recorrerParametros(metodo[v]);
      }
      if(v == "instrucciones"){
       // console.log(metodo[v]);
       for(a in metodo[v]){
      //   recorrerInstucciones(metodo[v]);
       }
     
      }
           
  }
}


function recorrerInstucciones(instrucciones){
 //console.log(instruccion);

 instrucciones.forEach(instruccion => {

    if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
        // Procesando Instrucción Imprimir
        console.log("entro");
    
    } 
   // console.log(instruccion);


 });

  



}

function recorrerParametros(parametros){
     
    for(var v in parametros){
      
         //console.log("esto podria ser"+parametros[v]);
         if(v == "tipo"){
         //   console.log("abr");
           // console.log(parametros[v]);
            Params.push(parametros[v]);
         }
         if(v == "identificador"){

            console.log("olo este es el identificador"+parametros[v]);
            identificadors.push(parametros[v]);
         }
        
      


      if(parametros[v] !== null && typeof(parametros[v])=="object"){
              recorrerParametros(parametros[v]);
      }

}

   
    


}




