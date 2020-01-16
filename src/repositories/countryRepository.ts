import BaseRepository from './baseRepository'
import { Country } from '../entity/Country'

class CountryRepository extends BaseRepository {
  constructor() {
    super(Country)
  }
}

export default CountryRepository
