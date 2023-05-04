import express from 'express'
import supabaseProvider from '../supabase.js'
const router = express.Router()
const restaurantsProvider = supabaseProvider

/**
 * Feature 1: Getting a list of restaurants
 */

// const result = [1, 2, 3, 4, 5, 6, 7]
router.get('/', async (req, res) => {
  // let data = null
  const { data } = await restaurantsProvider.from('restaurants').select()
  // console.log(data.length)
  // console.log('my-req')
  res.json(data)
})

/**
 * Feature 2: Getting a specific restaurantl
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params

  // Find the restaurant with the matching id.
  const { data } = await restaurantsProvider
    .from('restaurants')
    .select()
    .eq('id', id)
  if (!data) {
    // console.log('error', data)
    res.sendStatus(404)
    // return
  } else {
    const restaurant = data.length > 0 ? data[0] : undefined

    // If the restaurant doesn't exist, let the client know.
    if (!restaurant) {
      res.sendStatus(404)
      return
    }

    res.json(restaurant)
  }
})

/**
 * Feature 3: Adding a new restaurant
 */
router.post('/', async (req, res) => {
  const { body } = req
  const { name } = body
  // const name = new Date()
  // console.log(body)
  // console.log(name)
  // return

  const { data, error } = await restaurantsProvider.insert({ name }).select()

  console.log('data', data)
  console.log('error', error)
  // return
  if (error || data.length !== 1) {
    res.status(400).send({ error })
  }
  res.json(data[0])
})

/**
 * Feature 4: Deleting a restaurant.
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  // return

  const { error } = await restaurantsProvider.delete().eq('id', id).select()

  // return
  if (error) {
    res.status(404).send({ error })
  }

  res.sendStatus(200)
})

/**
 * Feature 5: Updating the name of a restaurant.
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { newName } = req.body

  const { error } = await restaurantsProvider
    .update({ name: newName })
    .eq('id', id)
  // .select()

  if (error) {
    res.status(404).send({ error })
    return
  }

  res.sendStatus(200)
})

router.post('/signin', async (req, res) => {
  const { email } = req.body
  const { password } = req.body
  console.log(email, password)
  // return
  const { data, error } = await supabaseProvider.auth.signInWithPassword({
    email,
    password,
  })
  // if (!data.session) {
  //   console.log('error', error)
  //   return
  // }
  console.log('data', data)
  // return
  res.json(data)
})

export default router
