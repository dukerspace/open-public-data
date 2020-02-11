import { dbConfig } from './db'

export const configApp = () => {
  return {
    configDb: dbConfig()
  }
}
