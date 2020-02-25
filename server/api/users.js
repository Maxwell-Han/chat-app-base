const router = require('express').Router()
const { User } = require('../db/models/')

router.get('/', async (req, res, next) => {
  res.send('Hit the get route on the api/users route!')
})

router.post('/', async (req, res, next) => {
  res.send('this is the POST route!')
  try {
    await User.create(req.body)
  } catch (err) {
    console.log('there was an error ', err)
  }

})

router.put('/', async (req, res, next) => {
  res.send('this is the PUT route!')

})

module.exports = router
