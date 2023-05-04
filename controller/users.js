let users = [
  {
    fname: 'Chloie',
    lname: 'Kendal',
    age: 6,
  },
  {
    fname: 'Bobbie',
    lname: 'Kendal',
    age: 5,
  },
  {
    fname: 'Nazie',
    lname: 'S',
    age: 35,
  },
]

export const getUsers = (req, res) => res.send(users)

export const createUser = (req, res) => {
  const user = req.body
  users.push(user)
  console.log(user)
}

export const getOneUser = (req, res) => {
  const { fname } = req.params
  const oneUser = users.find(
    user => user.fname.toLowerCase() === fname.toLocaleLowerCase()
  )
  if (!oneUser) res.send('user not found')

  // console.log(oneUser)
  res.send(oneUser)
}

export const deleteUser = (req, res) => {
  const { fname } = req.params
  users = users.filter(
    user => user.fname.toLowerCase() !== fname.toLocaleLowerCase()
  )
  res.send('delete user')
}
