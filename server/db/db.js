const mongoose = require('mongoose')
mongoose.set('debug', true)

// Database Name
const dbName = 'chat-app-mongo';

// Connection URL
const url = `mongodb://localhost/${dbName}`
const db = mongoose.connect(url)
mongoose.Promise = Promise

module.exports = db



