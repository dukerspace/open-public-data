import BaseRepository from './baseRepository'
import { Province } from '../entity/Province'
import { getRepository, Like } from 'typeorm'

class ProvinceRepository extends BaseRepository {
  constructor() {
    super(Province)
  }
  public async create(data): Promise<Province> {
    return await super.create(data)
  }
  public async findProvince(province) {
    return await getRepository(Province).find({
      province_name_en: Like(`%${province}%`)
    })
  }
}

export default ProvinceRepository
