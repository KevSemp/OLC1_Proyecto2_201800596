/**
 * Ejemplo Intérprete Sencillo con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-sensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"imprimir"			return 'RIMPRIMIR';
"int"			    return 'RNUMERO';
"double"            return 'RDOUBLE';
"char"              return 'RCHAR';
"boolean"           return 'RBOOL';
"String"			return 'RSTRING';
"do"                return 'RDO';
"while"			    return 'RMIENTRAS';
"if"				return 'RIF';
"else"				return 'RELSE';
"for"				return 'RPARA';
"switch"			return 'RSWITCH';
"case"				return 'RCASE';
"default"			return 'RDEFAULT';
"break"				return 'RBREAK';
"continue"          return 'RCONTINUE';
"class"             return 'RCLASS'
"void"              return 'RVOID';
"import"			return 'RIMPORT';
"System"			return 'System';
"."                 return 'punto';
"out"				return 'out';
"println"			return 'println';
"true"              return 'true';
"false"             return 'false';
"return"             return 'return';

":"					return 'DOSPTS';
";"					return 'PTCOMA';
","                 return 'COMA';
"{"					return 'LLAVIZQ';
"}"					return 'LLAVDER';
"("					return 'PARIZQ';
")"					return 'PARDER';

"+="				return 'O_MAS';
"-="				return 'O_MENOS';
"*="				return 'O_POR';
"/="				return 'O_DIVIDIDO';
"&&"				return 'AND'
"||"				return 'OR';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"^"					return 'ELEVACION';
"%"                 return 'MODULO';
"/"					return 'DIVIDIDO';
"&"					return 'CONCAT';

"<="				return 'MENIGQUE';
">="				return 'MAYIGQUE';
"=="				return 'DOBLEIG';
"!="				return 'NOIG';

"<"					return 'MENQUE';
">"					return 'MAYQUE';
"="					return 'IGUAL';

"!"					return 'NOT';


\"([^\\\"\n]|\\.)*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENACHAR'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.					{ console.error ('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
                       err.nuevoError(yytext,yylloc.first_line,yylloc.first_column,TIPO_ERROR.LEXICO);
					}

/lex


%{
	const TIPO_OPERACION	= require('./instrucciones').TIPO_OPERACION;
	const TIPO_VALOR 		= require('./instrucciones').TIPO_VALOR;
	const TIPO_ERROR 		= require('./instrucciones').TIPO_ERROR;
	const TIPO_DATO			= require('./tabla_simbolos').TIPO_DATO; //para jalar el tipo de dato
	const instruccionesAPI	= require('./instrucciones').instruccionesAPI;
	const err = require('./instrucciones').err;
%}


/* Asociación de operadores y precedencia */
%left 'CONCAT'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF {
		// cuado se haya reconocido la entrada completa retornamos el AST
		return $1;
	}
;



instrucciones
	: instrucciones instruccion 	{ $1.push($2); $$ = $1; }
	| instruccion					{ $$ = [$1]; }
;

instruccion
	: System punto out punto println PARIZQ expresion_cadena PARDER PTCOMA	{ $$ = instruccionesAPI.nuevoImprimir($7); }
	| imports {$$ = $1}
	| RMIENTRAS PARIZQ expresion_cadena PARDER LLAVIZQ instrucciones LLAVDER
														{ $$ = instruccionesAPI.nuevoMientras($3, $6); }
    | RDO LLAVIZQ instrucciones LLAVDER RMIENTRAS PARIZQ expresion_cadena PARDER PTCOMA
	                                                    { $$ = instruccionesAPI.nuevoDo($3,$7)}
	| RPARA PARIZQ DECLARACION_FOR PTCOMA expresion_cadena PTCOMA IDENTIFICADOR MAS MAS PARDER LLAVIZQ instrucciones LLAVDER
														{ $$ = instruccionesAPI.nuevoFor($3,$5,$7,$9,$12) }
	| RPARA PARIZQ DECLARACION_FOR PTCOMA expresion_cadena PTCOMA IDENTIFICADOR MENOS MENOS PARDER LLAVIZQ instrucciones LLAVDER
														{ $$ = instruccionesAPI.nuevoFor($3,$5,$7,$9,$12) }													
	| DATO_TIPO IDENTIFICADOR PTCOMA						{ $$ = instruccionesAPI.nuevoDeclaracion($2, $1); }
	| LLAMADA_METODO PTCOMA   {$$ = instruccionesAPI.nuevaLlamadaMetodo($1);}
	
	| IDENTIFICADOR IGUAL expresion_cadena PTCOMA		{ $$ = instruccionesAPI.nuevoAsignacion($1, $3); } //esto soporta expresiones_cadena y expresion_numerica
    | DATO_TIPO otraDeclaracion IGUAL expresion_cadena PTCOMA {$$ = instruccionesAPI.nuevoDeclaracionS($2,$4,$1);}
	
	| RIF PARIZQ expresion_cadena PARDER LLAVIZQ instrucciones LLAVDER ELSE_IF ELSE
														{ $$ = instruccionesAPI.nuevoIf($3,$6,$8,$9);}											
	| RVOID IDENTIFICADOR PARIZQ LP PARDER LLAVIZQ instrucciones LLAVDER
														{$$ = instruccionesAPI.nuevoMetodo($1,$2,$4,$7);}
    | DATO_TIPO IDENTIFICADOR PARIZQ LP PARDER LLAVIZQ instrucciones LLAVDER
	                                                    {$$ = instruccionesAPI.nuevoMetodoTipo($1,$2,$4,$7)}													
	| RSWITCH PARIZQ expresion_cadena PARDER LLAVIZQ casos LLAVDER
		{ $$ = instruccionesAPI.nuevoSwitch($3,$6);}
	| IDENTIFICADOR MAS MAS PTCOMA                     { $$ = instruccionesAPI.nuevoOperacionUnaria($1, TIPO_OPERACION.AUMENTO); }
	| IDENTIFICADOR MENOS MENOS PTCOMA                       { $$ = instruccionesAPI.nuevoOperacionUnaria($1, TIPO_OPERACION.DECREMENTO); }	
	| IDENTIFICADOR operadores expresion_cadena PTCOMA	
	                                                    { $$ = instruccionesAPI.nuevoAsignacionSimplificada($1, $2, $3); }
	| RCLASS IDENTIFICADOR LLAVIZQ instrucciones LLAVDER { $$ = instruccionesAPI.nuevoClass($2,$4);}
	| RBREAK PTCOMA {$$ = instruccionesAPI.nuevoBreak($1);}
	| return expresion_cadena PTCOMA {$$ = instruccionesAPI.nuevoReturnMetodoT($1,$2);}
	| return PTCOMA {$$ = instruccionesAPI.nuevoReturnMetodo($1);}											
	| error   { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
	               var errorLixco = "error_sintactico";
				   err.nuevoError(yytext,this._$.first_line,this._$.first_column,errorLixco);
	          }	
	 
;

ELSE_IF: ELSE_IF RELSE RIF PARIZQ expresion_logica PARDER LLAVIZQ instrucciones LLAVDER {$$ = instruccionesAPI.nuevoElseIf($1,$5,$8);}
         |
			;


ELSE: RELSE LLAVIZQ instrucciones LLAVDER {$$ = instruccionesAPI.nuevoElse($1,$4);}
      |
	  ;

imports : RIMPORT IDENTIFICADOR PTCOMA {$$ = instruccionesAPI.nuevoImport($2)}
         |
		 ;

DECLARACION_FOR : IDENTIFICADOR IGUAL expresion_numerica {
            $$ = instruccionesAPI.nuevoAsignacion($1,$3);	
}
                 |DATO_TIPO IDENTIFICADOR IGUAL expresion_numerica {$$ = instruccionesAPI.nuevoDeclaracionS($2,$4,$1);}
;

LLAMADA_METODO: IDENTIFICADOR PARIZQ DATOS PARDER {$$ =  instruccionesAPI.nuevaLlamadaMetodoP($1,$3)}
                |
;

DATOS: DATOS COMA expresion_cadena
   {	   
   $$ = instruccionesAPI.nuevoDatosMetodo($1,$3);
 
   }
   | expresion_cadena
    {
           $$ = instruccionesAPI.nuevoDatoMetodo($1);
	}
	; 

DATO_TIPO: RNUMERO {$$ = TIPO_DATO.NUMERO;}
		   | RBOOL {$$ = TIPO_DATO.BOOLEAN;}
		   | RDOUBLE {$$ = TIPO_DATO.DOUBLE;}
		   | RCHAR {$$ = TIPO_DATO.CHAR;}
		   | RSTRING {$$ = TIPO_DATO.STRING;}
;

LP: LP COMA DATO_TIPO IDENTIFICADOR
   {	   
   $$ = instruccionesAPI.nuevoListaParametros($1,$3,$4);
 
   }
   |DATO_TIPO IDENTIFICADOR
    {
           $$ = instruccionesAPI.nuevoParametro($1,$2);
	}
	|
	;

otraDeclaracion: otraDeclaracion COMA IDENTIFICADOR{
			
			  $$ = instruccionesAPI.pushDeclaraciones($1,$3);	
	}
                |IDENTIFICADOR{$$ = instruccionesAPI.pushDeclaracionesPPP($1);}
				;

casos : casos caso_evaluar
    {
      $1.push($2);
	  $$ = $1;
    }
  | caso_evaluar
  	{ $$ = instruccionesAPI.nuevoListaCasos($1);}
;

caso_evaluar : RCASE expresion_cadena DOSPTS instrucciones
    { $$ = instruccionesAPI.nuevoCaso($2,$4); }
  | RDEFAULT DOSPTS instrucciones
    { $$ = instruccionesAPI.nuevoCasoDef($3); }
;

operadores
    : O_MAS      { $$ = instruccionesAPI.nuevoOperador(TIPO_OPERACION.SUMA); }
	| O_MENOS    { $$ = instruccionesAPI.nuevoOperador(TIPO_OPERACION.RESTA); }
    | O_POR      { $$ = instruccionesAPI.nuevoOperador(TIPO_OPERACION.MULTIPLICACION); }
	| O_DIVIDIDO { $$ = instruccionesAPI.nuevoOperador(TIPO_OPERACION.DIVISION); }
;


expresion_numerica
	: MENOS expresion_numerica %prec UMENOS				{ $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.NEGATIVO); }
	| expresion_numerica MAS expresion_numerica			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.SUMA); }
	| expresion_numerica MENOS expresion_numerica		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.RESTA); }
	| expresion_numerica POR expresion_numerica			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION); }
	| expresion_numerica DIVIDIDO expresion_numerica	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION); }
	| expresion_numerica ELEVACION expresion_numerica   { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA);}
	| expresion_numerica MODULO expresion_numerica      { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3, TIPO_OPERACION.MODULO)}
	| expresion_numerica MAS MAS                         { $$ = instruccionesAPI.nuevoOperacionUnaria($1, TIPO_OPERACION.AUMENTO); }
	| expresion_numerica MENOS MENOS                         { $$ = instruccionesAPI.nuevoOperacionUnaria($1, TIPO_OPERACION.DECREMENTO); }
	| PARIZQ expresion_cadena PARDER					{ $$ = $2; }
	| ENTERO											{ $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.NUMERO); }
	| DECIMAL											{ $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.NUMERO); }
	| true                                              { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.TRUE); }
	| false                                             { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.FALSE); }
	| LLAMADA_METODO									{ $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.METODOLLAMADA);}
	| IDENTIFICADOR										{ $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR); }
;

expresion_cadena
	: expresion_cadena MAS expresion_cadena			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.CONCATENACION); }
	| CADENA											{ $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA); }
	| CADENACHAR                                         { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.CADENACHAR);}
	| expresion_numerica								{ $$ = $1; }
	| expresion_logica                                  {$$ = $1;}
;

expresion_relacional
	: expresion_cadena MAYQUE expresion_cadena		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR_QUE); }
	| expresion_cadena MENQUE expresion_cadena		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR_QUE); }
	| expresion_cadena MAYIGQUE expresion_cadena	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR_IGUAL); }
	| expresion_cadena MENIGQUE expresion_cadena	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR_IGUAL); }
	| expresion_cadena                                 {$$ = $1;}
	| NOT expresion_logica                    	     	{ $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.NOT); }
	| expresion_cadena DOBLEIG expresion_cadena			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DOBLE_IGUAL); }
	| expresion_cadena NOIG expresion_cadena			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.NO_IGUAL); }
;

expresion_logica
	: expresion_logica AND expresion_relacional         { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.AND); }
	| expresion_logica OR expresion_relacional  		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.OR); }
	| expresion_relacional								{ $$ = $1; }
;

true_false
   : true {$$ = $1;}
   | false {$$ = $1;}
   ;

