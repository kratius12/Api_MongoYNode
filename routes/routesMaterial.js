const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const materialService = require('../services/materialService.js');
const router = express.Router();
const service = new materialService;

    router.get('/', async (req,res)=>{
        const materiales = await service.find();
            if (materiales){
                res.status(201).send(materiales)
            }else{
                res.status(404).send('No se encontraron Materiales');
            }
    })

    router.get('/:id', async (req,res)=>{
        const id = req.params.id;
        const material = await service.findOne(id);
        if(material){
            res.status(200).send(material);
        }else{
            res.status(404).send(`No se encontró el material con el id: ${id}`);
        }
    })

    router.post('/addMaterial', async (req,res)=>{
        const result = await service.add(req.body);
        if(result){
            res.status(200).json({
                message:`Se agregó un material`
            })
        }else{
            res.status(404).send('Error al intentar insertar materiales')
        }
    })

    router.post('/addMateriales', async (req,res)=>{
        const result = await service.addMany(req.body);
        if(result){
            res.status(200).json({
                message:'Se han guardado los materiales correctamente'
            });
        }else{
            res.status(404).send('Error al intentar insertar materiales');
        }
    })

    router.patch('/:id', async (req,res)=>{
        const id = req.params.id;
        const {nombre, estado} = req.body;
        const result = await service.update(id,nombre,estado);
        if(result.modifiedCount > 0 ){
            res.status(200).json({
                message:`El Material con el id: ${id} ha sido actualizado`
            });
        }else{
            res.status(404).send('Error al intentar actualizar el material');
        }
    })

    router.patch('/updateMateriales/:campoCond/:valorCond/', async (req,res)=>{
        const {campoCond,valorCond} = req.params;
        const {campoUpdate,valorUpdate} = req.body;
        const condicion = `{"${campoCond}":"${valorCond}"}`;
        const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`;
        const result = await service.updateMany(condicion,actualizacion);
        if(result){
            res.status(200).json({
                message:`Se actualizaron los mateiales con la condición ${condicion} en la base de datos`
            });
        }else{
            res.status(404).send('error al intentar actualizar materiales');
        }
    })

    router.delete('/:id', async (req,res)=>{
        const id = req.params.id;
        const result = await service.delete(id);
        if (result.acknowledged == true && result.deletedCount > 0 ){
            res.status(200).json({
                message:`Material eliminado exitosamente`,
            });
        }else{
            res.status(404).send('No se pudo eliminar el material')
        }
    })

    router.delete('/deleteMateriales/:campo/:valor', async (req,res)=>{
        const {campo, valor} = req.params;
        const condicion = campo+":"+valor;
        const result = await service.delteMany(condicion);
        console.dir(result);
        console.dir(condicion);
        if(result.acknowledged == true && result.deletedCount > 0 ){
            res.status(200).json({
                message:`Se han borrado todos los registros que cumplen con la condición ${condicion}`
            });
        }else{
            res.status(404).send('Error al intentar eliminar los materiales');
        }
    })

module.exports = router;