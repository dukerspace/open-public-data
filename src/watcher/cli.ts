import { createConnection } from 'typeorm'

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

  }
}

export default new Cli()
