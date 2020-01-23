import BaseRepository from './baseRepository'
import { City } from '../entity/City'
import { getRepository, Like } from 'typeorm'

class CityRepository extends BaseRepository {
  constructor() {
    super(City)
  }
  public async create(data): Promise<City> {
    return await super.create(data)
  }
  public async findCityEN(name: string, provinceId?: number) {
    return await getRepository(City).findOne({
      where: {
        province_id: provinceId,
        city_name_en: Like(`%${name}%`)
      }
    })
  }
  public async findCityTH(name: string, provinceId?: number) {
    return await getRepository(City).findOne({
      where: {
        province_id: provinceId,
        city_name_th: Like(`%${name}%`),
      }
    })
  }
}

export default CityRepository
