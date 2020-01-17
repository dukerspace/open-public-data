import BaseRepository from './baseRepository'
import { City } from '../entity/City'

class CityRepository extends BaseRepository {
  constructor() {
    super(City)
  }
  public async create(data): Promise<City> {
    return await super.create(data)
  }
}

export default CityRepository
