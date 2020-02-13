import { BaseRepository } from './baseRepository'
import { Province } from '../entity/Province'
import { getRepository, Like } from 'typeorm'

export class ProvinceRepository extends BaseRepository {
  constructor() {
    super(Province)
  }
  public async create(data): Promise<Province> {
    return await super.create(data)
  }
  public async findProvinceEN(name: string) {
    return await getRepository(Province).findOne({
      province_name_en: Like(`%${name}%`)
    })
  }
  public async findProvinceTH(name: string) {
    return await getRepository(Province).findOne({
      province_name_th: Like(`%${name}%`)
    })
  }
}
