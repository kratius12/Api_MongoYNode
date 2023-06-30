//se importan las funciones que estan la clase "operacioneCRUD"
const {crearMaterial} = require('./operacionesCRUD.js');
//se importa la libreria faker para crear los documentos de prueba
const {faker} = require("@faker-js/faker");

const array_materiales = [];

//se hace un ciclo para que se almanecen 2000 datos en cada una de las colecciones usando la libreria de faker y el ciclo for
for (let i= 0;i<2000; i++){
    //Se usa la libreria de faker para crear los registros de materiales
    material ={
        nombre: faker.helpers.arrayElement(["pintura", "vidrieria", "acabados", "Pega"]),
        estado:faker.helpers.arrayElement(['activo','inactivo']),
        precio:faker.helpers.arrayElement(['m2','cm','m']),

    }
    // se hace un push para que se almacenen los datos en la array
    array_materiales.push(material)

    
}
crearMaterial(material)

