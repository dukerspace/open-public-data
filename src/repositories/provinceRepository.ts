import BaseRepository from './baseRepository'
import { Province } from '../entity/Province'

class ProvinceRepository extends BaseRepository {
  constructor() {
    super(Province)
  }
}

export default ProvinceRepository
