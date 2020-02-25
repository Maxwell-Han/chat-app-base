const router = require('express').Router()
const { User } = require('../db/models/')

router.get('/', async (req, res, next) => {
  res.send('Hit the get route on the api/users route!')
})

router.post('/', async (req, res, next) => {
  console.log('POST: creating a new user')

})

module.exports = router
