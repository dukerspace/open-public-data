import BaseRepository from './baseRepository'
import { Country } from '../entity/Country'

class CountryRepository extends BaseRepository {
  constructor() {
    super(Country)
  }
  public async create(data): Promise<Country> {
    return await super.create(data)
  }
}

export default CountryRepository
