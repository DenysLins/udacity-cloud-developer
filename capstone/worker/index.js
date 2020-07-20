const keys = require('./keys')
const redis = require('redis')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

function fib(index) {
  if (index < 2) return index
  return fib(index - 1) + fib(index - 2)
}

app.post('/', (req, res) => {

  console.log(req.body)

  const index = req.body.index
  redisClient.hset('values', index, 'Calculating...')
  redisClient.hset('values', index, fib(parseInt(index)))
  res.sendStatus(200);

})

app.listen(5001, () => console.log('Worker listening no port 5001'))
