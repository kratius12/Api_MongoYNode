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

    async findOne(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const categoria = client.db('construtech').collection('categorias').findOne({_id: new ObjectId(id)});
            if(categoria){
                return categoria;
            }
        }catch(error){
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('categorias').insertOne(body)
            if(result){
                return result;
            }
        }catch(error){
            console.log(error);
        }
    }

    async addMany(arraycategoria){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('categorias').insertMany(arraycategoria);
        }catch(error){
            console.log(error);
        }
    }

    async update(id,nombre,estado){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('cosntrutech').collection('categorias').updateOne({_id: new ObjectId(id)}, {$set:{nombre:nombre,estado:estado}});
            if(result){
                return result;
            }
        }catch(error){
            console.log(error);
        }
    }

    async updateMany(condicion, actualizacion){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('categorias').updateMany({condicion},{$set:{actualizacion}});
            if(result){
                return result;
            }
        }catch(error){
            console.log(error)
        }
    }

    async delete(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('categorias').deleteOne({_id: new ObjectId(id)});
            if(result){
                return result;
            }
        }catch(error){
            console.log(error)
        }
    }


    async deleteMany(condicion){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('categorias').deleteMany({condicion});
            if(result){
                return result;
            }
        }catch(error){
            console.log(error)
        }
    }
}
module.exports = categoriaService;