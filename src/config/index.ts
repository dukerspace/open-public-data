import { dbConfig } from './db'
import { Schedule } from './schedule'

export const configApp = () => {
  return {
    configDb: dbConfig(),
    schedule: new Schedule()
  }
}
