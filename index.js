const express=require('express')
const {connection}=require('./db');
const { noteRouter } = require('./route/note.route');
const { userRouter } = require('./route/user.route');
const cors=require('cors')
require('dotenv').config()


const app=express();
app.use(express.json())
app.use(cors())
app.get('/', (req,res)=>{
    res.send("Homepage")
})

app.use('/user', userRouter)
app.use('/notes', noteRouter)

app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log("Connected to the db")
        }catch(err){
        console.log("Connection to db failed")
        console.log(err)
        }
        console.log(`Running the server at ${process.env.port}`)
})



