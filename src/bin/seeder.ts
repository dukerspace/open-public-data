import { configApp } from '../config'
export class Seeder {
  constructor() {
    this.run()
  }
  config() {
    return configApp().configDb
  }
  run() {
    this.config
    this.readFile
  }
  readFile() {
    console.log('DB seed')

    console.log('Seeded')
  }
}
