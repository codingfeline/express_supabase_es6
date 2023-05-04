import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.js'
import restaurants from './routes/restaurants.js'
import cors from 'cors'

const app = express()
const PORT = 4400

app.use(cors())
app.use(bodyParser.json())

app.use('/users', userRoutes)
app.use('/restaurants/', restaurants)

app.get('/', (req, res) => {
  console.log('first')
  res.send('hello')
})

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
)
