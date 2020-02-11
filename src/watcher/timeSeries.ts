import * as Influx from 'influx'
export class TimeSeries {
  constructor() {

  }
  public config() {
    const hostname = process.env.INFLUX_HOST
    const port = Number(process.env.INFLUX_PORT)
    const username = process.env.INFLUX_USERNAME
    const password = process.env.INFLUX_PASSWORD
    const db = process.env.INFLUX_DB

    const influx = new Influx.InfluxDB({
      host: hostname,
      port: port,
      username: username,
      password: password,
      database: db,
      schema: [
        {
          measurement: 'air_quality',
          fields: {
            'PM2.5': Influx.FieldType.INTEGER,
            PM10: Influx.FieldType.INTEGER,
            O3: Influx.FieldType.INTEGER,
            CO: Influx.FieldType.FLOAT,
            NO2: Influx.FieldType.INTEGER,
            SO2: Influx.FieldType.INTEGER,
            AQI: Influx.FieldType.INTEGER,
            LEVEL: Influx.FieldType.INTEGER
          },
          tags: [
            'placeId',
            'source'
          ]
        }
      ]
    })
    return influx
  }
  public sendToInflux(data) {
    try {
      const influx = this.config()
      influx.writePoints([data])
        .then()
        .catch(err => {
          console.log(err.message)
        })
    } catch(e) {
      console.log(e.message)
    }
  }
}
