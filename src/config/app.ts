import { createConnection } from 'typeorm'
import { config } from './db'

export class App {
  constructor() {
    this.connectDb()
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
}
