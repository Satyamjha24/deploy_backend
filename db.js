const mongoose=require('mongoose')
require('dotenv').config()

const connection=mongoose.connect(process.env.url)
//" mongodb://127.0.0.1:27017/todosatlas"

module.exports={connection}