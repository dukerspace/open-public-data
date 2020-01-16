import BaseRepository from './baseRepository'
import { City } from '../entity/City'

class CityRepository extends BaseRepository {
  constructor() {
    super(City)
  }
}

export default CityRepository
