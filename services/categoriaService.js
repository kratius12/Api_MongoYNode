require("dotenv").config();
const {MongoClient, ObjectId} = require("mongodb");
const uri = process.env.URI;

class categoriaService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const categorias = client.db('construtech').collection('categorias').find({}).limit(30).sort({_id:-1}).toArray();
            if(categorias){
                return categorias;
            }
        }catch(error){
            console.log(`Error: ${error}`);
        }
    }
}