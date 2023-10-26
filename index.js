const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/subscribers').
  catch(error => handleError(error))
const db = mongoose.connection
db.on('open', _ => console.log('Database connected'))
db.on('error', err => console.log(err))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers.js')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server started'))
