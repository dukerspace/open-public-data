import { config } from 'dotenv'
import express from 'express'
import * as bodyParser from 'body-parser'
import { resolve } from 'path'
import { createConnection } from 'typeorm'
import cron from 'cron'
import router from './routes'
import 'reflect-metadata'
import FeachData from './jobs/FetchData'

config({ path: resolve(__dirname, '../.env') })
const hostname = process.env.SERVICE_HOSTNAME
const port = process.env.SERVICE_PORT
const env = process.env.NODE_ENV

const app = express()
const today = new Date().toISOString().slice(0, 10)

const requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

// Connect database
createConnection()
  .then(async connection => {
    console.log('Database connected.')
  })
  .catch(error => console.log('Database connection error: ', error))

// Bootstrap application route
app.use(router)

// Cron job
const cronJob = cron.CronJob
// new cronJob(
//   '0 * * * * *',
//   function() {
//     console.log('Fetch data')
//     const fetching = new FeachData()
//     fetching.getData()
//   },
//   null,
//   true,
//   'Asia/Bangkok'
// )

app.listen(port, () => {
  console.log(`API server listening on ${hostname}:${port}, in ${env}`)
})

export default app
