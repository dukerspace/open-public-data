import CountryRepository from '../repositories/countryRepository'
import ProvinceRepository from '../repositories/provinceRepository'
import CityRepository from '../repositories/cityRepository'
// import CountryRepository from '../repositories/countryRepository'

import thailand from './ThailandLocation.json'

class RunThailand {
  addresses: []
  constructor() {
    this.run()
  }
  public run() {
    console.log('Seeding.')

    console.log('Seeded.')
  }
  public async insert() {
    const countryData = {
      country_name: 'ประเทศไทย'
    }
    const country = new CountryRepository()
    const countryId = country.create(countryData)

    thailand.map(d => {
      const provinceName = d.PROVINCE_NAME
      const provinceData = {
        country_id: countryId,
        province_name: provinceName
      }
      const province = new ProvinceRepository()
      const provinceId = province.create(provinceData)

      d.amphurs.map(a => {
        const cityName = a.AMPHUR_NAME
        const cityData = {
          province_id: provinceId,
          city_name: cityName
        }
        const city = new CityRepository()
        city.create(cityData)
      })
    })
  }
}

export default new RunThailand()
