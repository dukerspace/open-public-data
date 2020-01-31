import { createConnection } from 'typeorm'
import fetchAir from './fetchAir'
class Cli {
  constructor() {
    this.run()
  }
  public async run() {
    await createConnection()
    .then(async connection => {
      console.log('Database connected.')
    })
    .catch(error => console.log('Database connection error: ', error))

    new fetchAir()
  }
}

export default new Cli()
