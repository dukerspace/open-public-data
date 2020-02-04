import { createConnection, DatabaseType } from 'typeorm'



const dbConfig = () => {
  const connection = <DatabaseType>process.env.DB_CONNECTION ?? "postgres"
  const host = process.env.DB_HOST ?? "localhost"
  const port: number = Number(process.env.DB_PORT) ?? 5432
  const dbName = process.env.DB_DATABASE ?? "open_data"
  const username = process.env.DB_USERNAME ?? "root"
  const password = process.env.DB_PASSWORD ?? null

  const dbConfig: any = {
    name: "default",
    type: connection,
    host: host,
    port: port,
    username: username,
    password: password,
    database: dbName,
    synchronize: false,
    logging: false,
    entities: [
      "src/entity/**/*.ts"
    ],
    migrations: [
      "src/migration/**/*.ts"
    ],
    subscribers: [
      "src/subscriber/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }

  createConnection(dbConfig)
    .then(async connection => {
      console.log(`Database connected : ${connection.name}`)
    })
    .catch(error => {

      console.log(`Database connection error : ${error}`)
    })
}

export default dbConfig
