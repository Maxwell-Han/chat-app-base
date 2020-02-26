const router = require('express').Router()
const { User } = require('../db')

router.use('/google', require('./google'))

router.get('/me', (req, res, next) => {
  res.json(req.user || {})
})

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) return next(err)
    res.status(204).end()
  })
})

module.exports = router
