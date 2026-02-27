require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

require('./models/User');

const {initializeDatabase } = require('./db/connect')

app.get('*', (req, res) => {
  res.send('Hi, you server is running here')
})


const port = process.env.PORT || 8080

const start = async () => {
  try {
    await initializeDatabase();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
