const express = require('express')
require('dotenv').config()
require('./models/db')

// import routes
const fetchItemsRouter = require('./routes/fetchItems')
const setsRouter = require('./routes/createSet')
const shirtsRouter = require('./routes/shirts')
const shoesRouter = require('./routes/shoes')
const pantsRouter = require('./routes/pants')

const app = express()
app.use(express.json())

app.use('/fetch-items-to-db', fetchItemsRouter)
app.use('/create-set', setsRouter)
app.use('/shirts', shirtsRouter)
app.use('/shoes', shoesRouter)
app.use('/pants', pantsRouter)

app.listen(8000, () => {
  console.log('Server is running')
})
