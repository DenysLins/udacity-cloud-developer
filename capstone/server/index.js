
const keys = require('./keys')

// Express App Setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client Setup
const { Pool } = require('pg')
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})

pgClient.on('error', () => console.log('Lost PG connection'))

pgClient
  .query('CREATE TABLE IF NOT EXISTS used_values (number INT UNIQUE)')
  .catch(err => console.log(err))

// Redis Client Setup
const redis = require('redis')
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

app.get('/api/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM used_values')
  console.log(values.rows)
  res.send(values.rows)
})

app.get('/api/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    console.log(values)
    res.send(values)
  })
})

app.post('/api/values', async (req, res) => {

  console.log(req.body)
  const index = req.body.index

  if (!index) {
    return res.status(400).send('Index invalid')
  }

  if (parseInt(index) > 50) {
    return res.status(422).send('Index too high')
  }

  redisClient.get(index, (err, reply) => {

    if (err) {
      console.log(err)
    }

    if (!reply) {

      const data = {
        index: index
      };

      axios.post(`http://${keys.workerHost}:${keys.workerPort}/`, data)
        .catch((err) => {
          console.error(err)
        })
    }

  })

  pgClient.query('INSERT INTO used_values(number) VALUES($1) ON CONFLICT (number) DO NOTHING;', [index])
  res.send({ working: true })

})

app.listen(5000, () => console.log('Server listening no port 5000'))
