const express=require('express')
const { auth } = require('../middleware/auth.middleware')
const { NoteModel } = require('../model/note.model')
const noteRouter=express.Router()
const jwt=require('jsonwebtoken')

noteRouter.use(auth)

noteRouter.get('/', async (req,res)=>{
   
    const token=req.headers.authorization  //.split(" ")[1]
    const decoded=jwt.verify(token,"odinson")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
    
})


noteRouter.post('/add', async (req,res)=>{
    try{
        let movie= new NoteModel(req.body)
        await movie.save()
        res.status(200).send({"msg":"Note has been added"})
    }catch(err){
        res.status(400).send({"err":"Something went wrong"})
    }
    
})


noteRouter.patch('/update/:id', async (req,res)=>{
    let id=req.params.id
    try{
        await NoteModel.findByIdAndUpdate({"_id":id},req.body)
        res.status(200).send({"msg":"Note has been updated"})

    }catch(err){
        res.status(400).send({"err":"Something went wrong"})
    }
})

noteRouter.delete('/delete/:id', async (req,res)=>{
    let id=req.params.id
  
    try{
        await NoteModel.findByIdAndDelete({"_id":id})
        res.status(200).send({"msg":"Note has been deleted"})

    }catch(err){
        res.status(400).send({"err":"Something went wrong"})
    }
})

module.exports={noteRouter}