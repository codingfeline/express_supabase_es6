import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.js'
import restaurants from './routes/restaurants.js'
import supabaseProvider from './supabase.js'
import cors from 'cors'

const app = express()
const PORT = 4400

app.use(cors())
app.use(bodyParser.json())

app.use('/users', userRoutes)
app.use('/restaurants/', restaurants)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  console.log('first')
  res.send('hello')
})

app.post('/login', async (req, res) => {
  // console.log('first')
  const { email, password } = req.body
  try {
    const { data, error } = await supabaseProvider.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    res.json({ data })
    // res.send('all ok')
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log(email, password)
  }
})

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
)
