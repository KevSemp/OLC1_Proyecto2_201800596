

var Error = class {
    Valor;
   // tipotOKEN=TIPO;
    Fila;
	Columna;
	tipoE;


    constructor(Valor,Fila,Columna,tipoE) {
      
      this.Valor = Valor;
     
      this.Fila = Fila;
	  this.Columna = Columna;
	  this.tipoE = tipoE;
      
    
     
    }
  }

  Errores =  new Array();
  
  


const err = {
	/**
 * 
 * 
 * 
	* @param {*} valor 
	*  
	*
	*/
   nuevoError: function(valor,fil,columna,tipo) {
	   console.log(valor+fil+columna+"si entro a mi funcion");
	   Errores.push(new Error(valor,fil, columna,tipo));	  
   },


   mandarError: function() {
	return(Errores);	  
},
vaciar: function() {
	Errores=[];	  
}
	
}
  

// Constantes para los tipos de 'valores' que reconoce nuestra gramática.
const TIPO_VALOR = {
	NUMEROS:         'VAL_INT',
	IDENTIFICADOR:  'VAL_IDENTIFICADOR',
	CADENA:         'VAL_CADENA',
	CADENACHAR:      'VAL_CHAR',
	TRUE:             'BOOLEAN_TRUE',
	FALSE:             'BOOLEAN_FALSE',
	METODOLLAMADA:    'VAL_METODO'
}


const TIPO_ERROR = {
    LEXICO:         'Error_lexico',
	SINTACTICO:  'Error_sintactico'

}


const TIPO_OPERACION = {
	SUMA:           'OP_SUMA',
	RESTA:          'OP_RESTA',
	MULTIPLICACION: 'OP_MULTIPLICACION',
	DIVISION:       'OP_DIVISION',
	POTENCIA:       'OP_ELEVACION',
	MODULO:         'OP_MODULO',
	NEGATIVO:       'OP_NEGATIVO',
	MAYOR_QUE:      'OP_MAYOR_QUE',
	MENOR_QUE:      'OP_MENOR_QUE',
	AUMENTO:        'OP_AUMENTO',
	DECREMENTO:     'OP_DECREMENTO',
	MAYOR_IGUAL: 	'OP_MAYOR_IGUAL',
	MENOR_IGUAL:    'OP_MENOR_IGUAL',
	DOBLE_IGUAL:    'OP_DOBLE_IGUAL',
	NO_IGUAL:    	'OP_NO_IGUAL',

	AND:  			'OP_AND',
	OR: 			'OP_OR',
	NOT:   			'OP_NOT',  	

	CONCATENACION:  'OP_CONCATENACION'
};

// Constantes para los tipos de 'instrucciones' válidas en nuestra gramática.
const TIPO_INSTRUCCION = {
	IMPRIMIR:		'INSTR_IMPRIMIR',
	MIENTRAS:		'INSTR_WHILE',
	DO:             'INSTR_DO_WHILE',
	DECLARACION:	'INSTR_DECLARACION',
	ASIGNACION:		'INSTR_ASIGANCION',
	IF:				'INSTR_IF',
	ELSE_IF:		'INSTR_ELSE_IF',
	ELSE:         'INSTR_ELSE',
	PARA: 			'INST_FOR',
	BREAK:           'INST_BREAK',
	RETURN_METODO:   'INST_RETURN',
	RETURN_METODOT:  'INST_RETUN_METODO_TIPO',
	SWITCH:			'SWITCH',
	SWITCH_OP:		'SWITCH_OP',
	SWITCH_DEF:		'SWITCH_DEF',
	CLASS:     'DEFINICION_CLASE',
	METODO:    'DEFINICION_METODO',
	ASIGNACION_SIMPLIFICADA: 'ASIGNACION_SIMPLIFICADA'
}


const TIPO_OPCION_SWITCH = { 
	CASO: 			'CASO',
	DEFECTO: 		'DEFECTO'
} 

//Constantes para defincion de clases
const DEFINICION ={
	  CLASS:     'DEFINICION_CLASE',
	  METODO:    'DEFINICION_METODO',
	  FUNCION:   'DEFINICION_FUNCION',
	  IMPORT:    'DEFINICION_IMPORT',
      LLAMADA_METODO: 'LLAMADA METODO'
}

/**
 * 
 * 
 * 
 * @param {*} operandoIzq 
 * @param {*} operandoDer 
 * @param {*} tipo 
 */
function nuevaOperacion(operandoIzq, operandoDer, tipo) {
	return {
		operandoIzq: operandoIzq,
		operandoDer: operandoDer,
		tipo: tipo
	}
}


/**
 * 
 */
const instruccionesAPI = {



		/**
	 *
	 * @param {*} valor 
	 *  
	 *
	 */
	nuevoError: function(valor) {
		return {
			   valor:  TIPO_INSTRUCCION.RETURN_METODO,
			   return: clase

		}
	},

		/**
	 * 
	 * @param {*} return 
	 *  
	 *
	 */
	nuevoReturnMetodo: function(clase) {
		return {
			   tipo:  TIPO_INSTRUCCION.RETURN_METODO,
			   return: clase

		}
	},

		/**
	 * 
	 * @param {*} expresion 
	 *  @param {*} ret
	 *
	 */
	nuevoReturnMetodoT: function(valor,expresion) {
		return {
			   tipo:  TIPO_INSTRUCCION.RETURN_METODOT,
			   ret: valor,
			   return: expresion

		}
	},


			/**
	 * 
	 * @param {*} expresion 
	 *  
	 *
	 */
	nuevoImport: function(clase) {
		return {
			   tipo:DEFINICION.IMPORT,
			   class:clase

		}
	},



	/**
	 * 
	 * @param {*} operandoIzq 
	 * @param {*} operandoDer 
	 * @param {*} tipo 
	 */
	nuevoOperacionBinaria: function(operandoIzq, operandoDer, tipo) {
		return nuevaOperacion(operandoIzq, operandoDer, tipo);
	},

	/**
	 * 
	 * @param {*} operando 
	 * @param {*} tipo 
	 */
	nuevoOperacionUnaria: function(operando, tipo) {
		return nuevaOperacion(operando, undefined, tipo);
	},

	/**
	 * 
	 * @param {*} valor 
	 * @param {*} tipo 
	 */
	nuevoValor: function(valor, tipo) {
		return {
			tipo: tipo,
			valor: valor
		}
	},

	/**
	 * 
	 * @param {*} expresionCadena 
	 */
	nuevoImprimir: function(expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.IMPRIMIR,
			expresionCadena: expresionCadena
		};
	},

	/**
	 * 
	 * @param {*} instBreak
	 */
	nuevoBreak: function(instBreak) {
		return {
			tipo: TIPO_INSTRUCCION.BREAK,
			instBreak: instBreak
		};
	},

	/**
	 * 
	 * @param {*} expresionLogica 
	 * @param {*} instrucciones 
	 */
	nuevoMientras: function(expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.MIENTRAS,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones
		};
	},

	/**
	 * 
	 * @param {*} expresionLogica 
	 * @param {*} instrucciones 
	 */
	nuevoDo: function(instrucciones, expresionLogica) {
		return {
			tipo: TIPO_INSTRUCCION.DO,
			instrucciones: instrucciones,
			expresionLogica: expresionLogica
			
		};
	},


		/**
	 * 
	 * @param {*} declaracion 
	 * @param {*} expresionLogica
	 * @param {*} aumento
	 * @param {*} instrucciones
	 */
	nuevoFor: function(declaracion, expresionLogica,aumento,instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.PARA,
			declaracion: declaracion,
			expresionLogica:expresionLogica,
			aumento:aumento,
			instrucciones: instrucciones
			
		};
	},

			/**
	 * 
	 * @param {*} identificador
	 * @param {*} valor
	 * 
	 * 
	 */
	nuevaDeclaracionFor: function (identificador, valor) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACION,
			identificador: identificador,
			valor: valor
		}
	},

	



	/**
	 * 
	 * @param {*} expresionLogica
	 * @param {*} instrucciones
	 * @param {*} aumento
	 * @param {*} decremento
	 */
	nuevoPara: function (variable, valorVariable, expresionLogica, aumento, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.PARA,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones,
			aumento: aumento,
			variable: variable,
			valorVariable: valorVariable
		}
	},

	/**
	 * 
	 * @param {*} identificador 
	 */
	nuevoDeclaracion: function(identificador, tipo) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACION,
			identificador: identificador,
			tipo_dato: tipo
		}
	},

		/**
	 * 
	 * @param {*} identificador 
	 *  @param {*} expresion 
	 */
	nuevoDeclaracionS: function(identificador,expresion, tipo) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACION,
			tipo_dato: tipo,
			identificador: identificador,			
			expresion: expresion
		}
	},

		/**
	 * 
	 * @param {*} identificador 
	 * @param {*} ided
	 */
	pushDeclaraciones: function(identificador,ided) {
       return{
	   identificadorP:identificador,
	   identificador:ided
	   }		
	},


		/**
	 * 
	 * @param {*} identificador 
	 * 
	 */
	pushDeclaracionesPPP: function(ided) {
		return{
		identificador:ided
		}		
	 },

		/**
	 * 
	 * @param {*} identificador 
	 * 
	 */
	nuevoIDE: function(identificador,ided) {
		return this.pushDeclaraciones(identificador,ided);
	},



	/**
	 * 
	 * @param {*} identificador 
	 * @param {*} expresionNumerica 
	 */
	nuevoAsignacion: function(identificador, expresionNumerica) {
		return {
			tipo: TIPO_INSTRUCCION.ASIGNACION,
			identificador: identificador,
			expresionNumerica: expresionNumerica
		}
	},

	/**
	 * 
	 * @param {*} identificador 
	 * 
	 */
	nuevoIdentificador: function(identificador) {

	    var identificadores = []; 
		identificadores.push(identificador);
		return identificadores;
			
	},

	/**
	 * 
	 * @param {*} expresionLogica 
	 * @param {*} instrucciones 
	 * @param {*} else_if
	 * @param {*} else
	 * 
	 */
	nuevoIf: function(expresionLogica, instrucciones,contenido,contenidoelse) {
		return {
			tipo: TIPO_INSTRUCCION.IF,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones,
			else_if: contenido,
			else: contenidoelse
		}
	},

		/**
	 * 
	 * @param {*} expresionLogica 
	 * @param {*} instrucciones
	 * @param {*} cuerpo
	 * 
	 */
	nuevoElseIf: function(cuerpo,expresionLogica,instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.ELSE_IF,
			nuevo_else_if: cuerpo,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones,

			
		}
	},
			/**
	 * 
	 * 
	 * @param {*} instrucciones
	 * 
	 * 
	 */
	nuevoElse: function(cuerpo,instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.ELSE,
			instruccione: instrucciones
		}
	},
	

	/**
	 * 
	 * @param {*} expresionLogica 
	 * @param {*} instruccionesIfVerdadero 
	 * @param {*} instruccionesIfFalso 
	 */
	nuevoIfElse: function(expresionLogica, instruccionesIfVerdadero, instruccionesIfFalso) {
		return {
			tipo: TIPO_INSTRUCCION.IF_ELSE,
			expresionLogica: expresionLogica,
			instruccionesIfVerdadero: instruccionesIfVerdadero,
			instruccionesIfFalso: instruccionesIfFalso
		}
	},
  
	/**
	 * 
	 * @param {*} expresionNumerica 
	 * @param {*} instrucciones 
	 */
	nuevoSwitch: function(expresionNumerica, casos) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH,
			expresionNumerica: expresionNumerica,
			casos: casos
		}
	},

	/**
	 * 
	 * @param {*} caso 
	 */
	nuevoListaCasos: function (caso) {
		var casos = []; 
		casos.push(caso);
		return casos;
	},

	/**
	 * 
	 * @param {*} expresionNumerica 
	 * @param {*} instrucciones 
	 */
	nuevoCaso: function(expresionNumerica, instrucciones) {
		return {
			tipo: TIPO_OPCION_SWITCH.CASO,
			expresionNumerica: expresionNumerica,
			instrucciones: instrucciones
		}
	},
	/**
	 * 
	 * @param {*} instrucciones 
	 */
	nuevoCasoDef: function(instrucciones) {
		return {
			tipo: TIPO_OPCION_SWITCH.DEFECTO,
			instrucciones: instrucciones
		}
	},
     /** 
	* 
	* @param {*} instrucciones 
	  @param {*} nombre
	*/
   nuevoClass: function(nombre,instrucciones) {
	   return {
		   tipo:  TIPO_INSTRUCCION.CLASS,
		   nombre: nombre,  
		   instrucciones: instrucciones
		   
	   }
   },

   
   /** 
	* 
	* 
	  
	  @param {*} metodo
	 
	*/
	nuevaLlamadaMetodo: function(metodo) {
		return {
			tipo: DEFINICION.LLAMADA_METODO,
            metodo:metodo
					
		}
	},


      /** 
	* 
	* 
	  @param {*} datos
	  @param {*} nombre
	 
	*/
	nuevaLlamadaMetodoP: function(nombre,datos) {
		return {
			nombre: nombre,
			datos: datos  			
		}
	},


		/**
	 * 
	 * 
	 *  @param {*} expresion
	 * 
	 * 
	 */
	nuevoDatosMetodo: function (cuerpo,expresion) {
		return{
		lista_datos:cuerpo,
		expresion:expresion
	}
	},

		/**
	 * 
	 * 
	 * @param {*} expresion
	 * 
	 */
	nuevoDatoMetodo: function (expresion) {
		return{
			expresion:expresion
		}
	},

      /** 
	* 
	* @param {*} instrucciones 
	  @param {*} nombre
	  @param {*} parametros
	   @param {*} tipoMetodo
	 
	*/
	nuevoMetodo: function(tipoMetodo,nombre,parametros,instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.METODO,
			tipoMetodo: tipoMetodo,
			nombre: nombre,  
            parametros: parametros,
			instrucciones: instrucciones
			
		}
	},
		/**
	 * 
	 * @param {*} tipo
	 *  @param {*} identificador
	 * 
	 * 
	 */
	nuevoListaParametros: function (cuerpo,tipo,identificador) {
		return{
		lista_parametros:cuerpo,
		tipo:tipo,
		identificador:identificador
	}
	},
	

		/**
	 * .
	 * @param {*} tipo
	 * @param {*} identificador
	 * 
	 */
	nuevoParametro: function (tipo,identificador) {
		return{
		tipo: tipo,
		identificador: identificador
		}
	},

	      /** 
	* Crea un objeto tipo OPCION_SWITCH para un CASO DEFECTO de la sentencia switch.
	* @param {*} instrucciones 
	  @param {*} nombre
	  @param {*} parametros
	  @param {*} tipoMetodo
	 
	*/
	nuevoMetodoTipo: function(tipoMetodo,nombre,parametros,instrucciones) {
		return {
			tipo: DEFINICION.METODO,
			tipoMetodo: tipoMetodo,
			nombre: nombre,  
            parametros: parametros,
			instrucciones: instrucciones
			
		}
	},
		/**
	 * 
	 * @param {*} parametro 
	 * 
	 */
	nuevoListaParametrosT: function (parametro,identificador) {
		var parametros = []; 
		parametros.push(this.nuevoListaPAM(parametro,identificador));
		return parametros;
	},
	

		/**
	 * 
	 * @param {*} tipo
	 * @param {*} identificador
	 * 
	 */
	nuevoListaPAMT: function (tipo,identificador) {
		return{
		tipo: tipo,
		identificador: identificador
		}
	},
	
	
	/**
	* 
	* @param {*} operador 
	*/
	nuevoOperador: function(operador){
		return operador 
	},
 
	/**
	 * 
	 * @param {*} identificador 
	 * @param {*} operador 
	 * @param {*} expresionCadena 
	 */
	nuevoAsignacionSimplificada: function(identificador, operador , expresionNumerica){
		return{
			tipo: TIPO_INSTRUCCION.ASIGNACION_SIMPLIFICADA,
			operador : operador,
			expresionNumerica: expresionNumerica,
			identificador : identificador
		} 
	}
}
// Exportamos nuestras constantes y nuestra API

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.TIPO_ERROR = TIPO_ERROR;
module.exports.instruccionesAPI = instruccionesAPI;
module.exports.err = err;
module.exports.Errores = Errores;
module.exports.TIPO_OPCION_SWITCH = TIPO_OPCION_SWITCH;
