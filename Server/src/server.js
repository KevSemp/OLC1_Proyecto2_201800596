
const express = require("express");

const app = express();

var cors = require('cors');

app.use(cors());

app.set('port', process.env.PORT || 8080);


const morgan = require("morgan");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



app.get('/', (req, res) => {
    res.send('entro');
});

app.post('/Analisis/', (req, res) => {
    const { input } = req.body;
    const { copia } = req.body;

   
  //  console.log(input+"hola");
    console.log(copia+"hola2");
    console.log(input+"hola");
  
    var parser = require('../analyzer/interprete').recibir;
 
    //parser.nuevoRecibir(input.toString());
    // parser.nuevaCopia(input.toString());
     var mandar=parser.nuevoRecibir(input.toString(),copia.toString());
   // parser.nuevoRecibir(copia.toString());
    res.send(mandar);
});
