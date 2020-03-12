const router = require('express').Router()
const { User, Room } = require('../db/models/')

const toObj = arr => {
  const res = {}
  arr.forEach(el => res[el._id] = el)
  return res
}

router.get('/', async (req, res, next) => {
  console.log('Hit the get route on the api/users route!')
  try {
    const data = await User.find()
    const parsedData = toObj(data)
    res.json(parsedData)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:userId/buddies/', async (req, res, next) => {
  console.log('GET buddies')
  try {
    const userId = req.params.userId
    const buddies = await User.getBuddies(userId)
    res.json(toObj(buddies))
  } catch (err) {
    console.log('there was an error ', err)
  }
})

router.get('/:userId/rooms/', async (req, res, next) => {
  console.log('GET users rooms')
  try {
    const userId = req.params.userId
    const rooms = await Room.find({ owners: userId})
    res.json(toObj(rooms))
  } catch (err) {
    console.log('there was an error ', err)
  }
})

router.post('/:userId/buddies/', async (req, res, next) => {
  console.log('POST add friend')
  try {
    const userId = req.params.userId
    const buddyId = req.body.buddyId
    console.log('the buddyId is ', buddyId, ' the body is ', req.body)
    const user = await User.findById(userId)
    user.buddies.push(buddyId)
    await user.save()
    const buddy = await User.findById(buddyId)
    res.json(buddy)
  } catch (err) {
    console.log('there was an error ', err)
  }
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
