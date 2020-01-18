import { createConnection } from 'typeorm'
import CountryRepository from '../repositories/countryRepository'
import ProvinceRepository from '../repositories/provinceRepository'
import CityRepository from '../repositories/cityRepository'
// import CountryRepository from '../repositories/countryRepository'

import addressJson from './ThailandLocation.json'
import { Country } from '../entity/Country'

class RunThailand {
  addresses: []
  constructor() {
    this.run()
  }
  public async run() {
    console.log('Seeding.')
    await this.insert()
    console.log('Seeded.')

  }
  public async insert() {
    try {
      await createConnection()
      .then(async connection => {
        console.log('Database connected.')
      })
      .catch(error => console.log('Database connection error: ', error))

      const countryData = {
        country_name: 'ประเทศไทย'
      }

      const country = new CountryRepository()
      const getCountry = await country.create(countryData)
      for (const p in addressJson) {
        const provinceName = addressJson[p].PROVINCE_NAME
        const provinceData = {
          country: getCountry.id,
          province_name: provinceName
        }
        const province = new ProvinceRepository()
        const getProvince = await province.create(provinceData)
        for (const a in addressJson[p].amphurs) {
          const cityName = addressJson[p].amphurs[a].AMPHUR_NAME
          const cityData = {
            province: getProvince.id,
            city_name: cityName
          }
          const city = new CityRepository()
          await city.create(cityData)
        }
      }
    } catch (e) {
      console.log('error', e.message)
    }
  }
}

export default new RunThailand()
