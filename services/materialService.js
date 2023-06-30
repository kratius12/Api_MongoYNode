require("dotenv").config();
const {MongoClient, ObjectId} = require("mongodb");
const uri = process.env.URI;

class materialService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const materiales = client.db('construtech').collection('materiales').find({}).limit(2000).sort({_id:-1}).toArray();
            if(materiales){
                return materiales;
            }
        }catch(error){
            console.log('Error en la conexion', error);
        }
    }

    async findOne(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const material = client.db('construtech').collection('materiales').findOne({_id: new ObjectId(id)});
            if(material){
                return material;
            }
        }catch(error){
            console.log('Error en la conexion', error);
        }
    }

    async add(body){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            
                await client.connect();
                const result = await client.db('construtech').collection('materiales').insertOne(body);
                if(result){
                    return result;
                }
            }catch(error){
                console.log('Error en la conexión', error)
            }
        }
    

    async addMany(arrayMateriales){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('materiales').insertMany(arrayMateriales);
            if(result){
                return result;
            }
        }catch(error){
            console.log(error)
        }
    }

    async update(id, nombre, estado){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('materiales').updateOne({_id: new ObjectId(id)},{$set:{nombre:nombre,estado:estado}});
            if(result){
                return result;
            }
        }catch(error){
            console.log('Error al conectarse', error);
        }
    }

    async updateMany(condicion, actualizacion){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('materiales').updateMany({condicion},{$set:actualizacion})
            if(result){
                return result;
            }
        }catch(error){
            console.log('Error al conectarse', error)
        }
    }

    async delete(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('materiales').deleteOne({_id: new ObjectId(id)})
            if(result){
                return result;
            }
        }catch(error){
            console.log('Error al conectarse', error);
        }
    }



    async delteMany(condicion){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const result = await client.db('construtech').collection('materiales').deleteMany({condicion});
            if(result){
                return result;
            }
        }catch(error){
            console.log('Error al conectarse', error);
        }
    }
}

module.exports = materialService;