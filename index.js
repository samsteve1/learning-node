const express = require('express')
const Joi = require('@hapi/joi')
const genre = require('./controllers/genre')
const app = express()

app.use(express.json())

app.get('/api/generes', genre.index)
app.get('/api/generes/:id', genre.show)
app.post('/api/generes', genre.store)
app.put('/api/generes/:id', genre.update)
app.delete('/api/generes/:id', genre.destory)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Node develoment server started at http://localhost${port}`))