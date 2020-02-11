import { config } from 'dotenv'
import express from 'express'
import * as bodyParser from 'body-parser'
import { resolve } from 'path'
import cron from 'cron'
import router from './routes'
import 'reflect-metadata'
import { configApp } from './config'
import FetchData from './tasks/fetchData'

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
app.use(router.apiV1)

app.listen(port, () => {
  console.log(`API server listening on ${hostname}:${port}, in ${env}`)
})

export default app
