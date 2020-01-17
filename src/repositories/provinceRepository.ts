import BaseRepository from './baseRepository'
import { Province } from '../entity/Province'

class ProvinceRepository extends BaseRepository {
  constructor() {
    super(Province)
  }
  public async create(data): Promise<Province> {
    return await super.create(data)
  }
}

export default ProvinceRepository
