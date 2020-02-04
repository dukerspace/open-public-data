import db from './db'

const config = () => {
  return {
    configDb: db()
  }
}

export default config
