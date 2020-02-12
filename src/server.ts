import { config } from 'dotenv'
import e from 'express'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import { resolve } from 'path'
import router from './routes'
import 'reflect-metadata'
import { configApp } from './config'

config({ path: resolve(__dirname, '../.env') })

const hostname = process.env.SERVICE_HOSTNAME
const port = process.env.SERVICE_PORT
const env = process.env.NODE_ENV

const app = e()
const today = new Date().toISOString().slice(0, 10)

const requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}
app.use(requestTime)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // limit each IP to 100 requests per windowMs
});

app.use(limiter)
app.use(compression())
app.use(helmet())
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
