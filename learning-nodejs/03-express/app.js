const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello World! 我来了')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})