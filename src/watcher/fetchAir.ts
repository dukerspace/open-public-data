import axios from 'axios'
import ProvinceRepository from '../repositories/provinceRepository'
import CityRepository from '../repositories/cityRepository'
import PlaceRepository from '../repositories/placeRepository'
import moment = require('moment')
import TimeSeries from './timeSeries'
import { createConnection } from 'typeorm'
import { Place } from '../entity/Place'
class FetchController {
  url: string
  constructor() {
    console.log('Get start fetch.')
    this.url = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php'
    this.run()
    console.log('Fetched.')
  }
  public async run() {
    const url = this.url
    await createConnection()
    .then(async connection => {
      console.log('Database connected.')
    })
    .catch(error => console.log('Database connection error: ', error))

    await axios(url)
    .then(res => {
      const data = res.data.stations
      data.map(async d => {
        const nameTH = d.nameTH
        const nameEN = d.nameEN
        const areaTH = d.areaTH
        const areaEN = d.areaEN
        const splitTH: Array<string> = areaTH.split(' ')
        const splitEN: Array<string> = areaEN.split(',')
        const lat = d.lat
        const lng = d.long
        const data = d.LastUpdate
        const date = moment(`${d.LastUpdate.date} ${d.LastUpdate.time}`, 'YYYY-MM-DD HH:mm')
        let insertData = {}

        if (!isNaN(Number(data.PM25.value))) {
          insertData = Object.assign({
            'PM2.5': Number(data.PM25.value)
          }, insertData)
        }

        if (!isNaN(Number(data.PM10.value))) {
          insertData = Object.assign({
            'PM10': Number(data.PM10.value)
          }, insertData)
        }

        if (!isNaN(Number(data.O3.value))) {
          insertData = Object.assign({
            'O3': Number(data.O3.value)
          }, insertData)
        }

        if (!isNaN(Number(data.CO.value))) {
          insertData = Object.assign({
            'CO': Number(data.CO.value)
          }, insertData)
        }

        if (!isNaN(Number(data.NO2.value))) {
          insertData = Object.assign({
            'NO2': Number(data.NO2.value)
          }, insertData)
        }

        if (!isNaN(Number(data.PM25.value))) {
          insertData = Object.assign({
            'PM2.5': Number(data.SO2.value)
          }, insertData)
        }

        if (!isNaN(Number(data.AQI.aqi)) && !isNaN(Number(data.AQI.Level))) {
          insertData = Object.assign({
            'AQI': Number(data.AQI.aqi),
            'LEVEL':  Number(data.AQI.Level),
          }, insertData)
        }

        const place = await this.getPlace(nameTH, nameEN)

        if (place && moment(place.last_updated).isSame(moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm'))) {
          return
        } else if (place && !moment(place.last_updated).isSame(moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm'))) {
          const timeSeries = {
            measurement: 'air_quality',
            tags: {
              placeId: place.id,
              source: 'air4thai'
            },
            fields: insertData
          }
          if (Object.keys(insertData).length === 0) {
            return
          }
          const placeRepo = new PlaceRepository()
          placeRepo.update(place.id, { last_updated: moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm')})
          const influx = new TimeSeries()
          await influx.sendToInflux(timeSeries)
          return
        } else {
        // create new place
        const cityReverseEN = splitEN.reverse()
        const provinceNameEN = cityReverseEN[0].trim()
        const cityNameEN = cityReverseEN[1].trim()

        const cityReverseTH = splitTH.reverse()
        const provinceNameTH = cityReverseTH[0].trim()
        const cityNameTH = cityReverseTH[1].trim().replace('อ.', '').replace(',', '')

        const provinceId = await this.getProvince(provinceNameTH, provinceNameEN)

        if (provinceId) {
          const cityId = await this.getCity(provinceId, cityNameTH, cityNameEN)

          if (cityId) {
            const createPlace = {
              city: cityId,
              place_name_th: nameTH,
              place_name_en: nameEN,
              lat: lat,
              long: lng,
              last_updated: date
            }
            const placeId = await this.createPlace(createPlace)
            if (placeId) {
              const timeSeries = {
                tags: {
                  placeId: placeId
                },
                fields: insertData
              }
              const influx = new TimeSeries()
              await influx.sendToInflux(timeSeries)
            }
          }
        }}
      })
    })
    .catch(err => {
      console.log(`Can't connect api: ${err.message}`)
    })
  }
  public async getProvince(nameTH: string, nameEN: string): Promise<number|void> {
    const province = new ProvinceRepository()
    const getProvinceTH = await province.findProvinceTH(nameTH)
    if (getProvinceTH) {
      return getProvinceTH.id
    }
    const getProvinceEN = await province.findProvinceEN(nameEN)
    if (getProvinceEN) {
      return getProvinceEN.id
    }
  }
  public async getCity(provinceId: number, nameTH: string, nameEN: string): Promise<number|void> {
    const city = new CityRepository()
    const getCityTH = await city.findCityTH(nameTH, provinceId)
    if (getCityTH) {
      return getCityTH.id
    }
    const getCityEN = await city.findCityEN(nameEN, provinceId)
    if (getCityEN) {
      return getCityEN.id
    }
  }
  public async getPlace(nameTH: string, nameEN: string): Promise<Place> {
    const place = new PlaceRepository()
    const getPlaceTH = await place.findPlaceTH(nameTH)
    if (getPlaceTH) {
      return getPlaceTH
    }
    const getPlaceEN = await place.findPlaceEN(nameEN)
    if (getPlaceEN) {
      return getPlaceEN
    }
  }
  public async createPlace(data) {
    const placeRepo = new PlaceRepository()
    const result = await placeRepo.create(data)
    return result.id
  }
}

export default FetchController
