const { MongoClient, ObjectId } = require('mongodb');
//se ingresan las credenciales para la conección a la base de datos
const uri = 'mongodb+srv://admin:admin@cluster0.ya4kxql.mongodb.net/?retryWrites=true&w=majority'

async function crearMaterial(nuevoMat){
    //se instacia la conexión a la base de datos
    const client = new MongoClient(uri);
    try{
        //se conecta a la base de datos
        await client.connect();
        //se crea el query para realizar la operación de guardado de la información
        const result = await client.db('construtech').collection('categorias').insertOne(nuevoMat);
        //se imprime el mensaje de confirmación de que se ha realizado la operación correctamente
        if(result){
        console.log(`check`);}
        else{
            console.log("no se pudo crear el material")
        }
    //se crea un catch por si se genera un error con la conexión a la base de datos
    }catch(error){
        //se imprime el mensaje de error
        console.log(error)
    }finally{
        //se cierra la conexión para garantizar la seguridad de la base de datos
        await client.close();
    }
}

module.export = {crearMaterial};