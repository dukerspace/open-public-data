import { createConnection } from 'typeorm'
import { config } from './db'
import cronJob from './job'

export class App {
  constructor() {
    this.connectDb()
    this.cronJob()
  }
  connectDb() {
    createConnection(<any>config)
      .then(async connection => {
        console.log(`Database connected : ${connection.name}`)
      })
      .catch(error => {
        console.log(`Database connection error : ${error}`)
      })
  }
  cronJob() {
    new cronJob()
  }
}
