const keys = require('./keys')
const redis = require('redis')

const express = require('express')
const app = express()

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
  index = req.body.index
  redisClient.hset('values', index, 'Calculating...')
  redisClient.hset('values', index, fib(parseInt(index)))

  res.send('Done!')

})

app.listen(5001, err => {
  console.log(err)
})


