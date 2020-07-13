const app = require('./app')

app.listen(process.env.NODE_PORT | 3333, err => {
  console.log(err)
})
