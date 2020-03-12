const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/rooms', require('./rooms'))
router.use('/messages', require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
