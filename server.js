/* 
Criando uma REST API 
npm ini -y
npm i express mongoose --save-dev
npm i dotenv nodemon --save-dev
*/

require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_STRING, {useNewUrlParser: true, useUnifiedTopology:true})  //process.env.DATABASE_STRING é um informação sensivel, sendo configurada em .env
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('MongoDB conectado.'))

app.use(express.json())  //carrega o padrão json

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)  //aponta para as rotas

app.listen(3000, () => console.log('O servidor está rodando.'))  //http://localhost:3000/