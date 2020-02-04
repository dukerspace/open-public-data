import { config } from 'dotenv'
import express from 'express'
import * as bodyParser from 'body-parser'
import { resolve } from 'path'
import cron from 'cron'
import router from './routes'
import 'reflect-metadata'
import configApp from './config'
import FetchData from './jobs/fetchData'

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

// All config
configApp()

// Bootstrap application route
app.use(router)

// Cron job
const cronJob = cron.CronJob
// At every 20th minute from 0 through 59
new cronJob(
  '0/20 * * * *',
  function() {
    console.log('Fetch data')
    const fetching = new FetchData()
    fetching.getData()
  },
  null,
  true,
  'Asia/Bangkok'
)

app.listen(port, () => {
  console.log(`API server listening on ${hostname}:${port}, in ${env}`)
})

export default app
