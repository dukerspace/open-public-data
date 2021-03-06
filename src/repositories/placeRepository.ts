import { BaseRepository } from './baseRepository'
import { Place } from '../entity/Place'
import { getRepository, Like } from 'typeorm'

export class PlaceRepository extends BaseRepository {
  constructor() {
    super(Place)
  }
  public async pagination(page, limit) {
    try {
      return await super.pagination(page, limit)
    } catch (e) {
      console.log('yyy', e)
    }
  }
  public async create(data): Promise<Place> {
    return await super.create(data)
  }
  public async findPlaceEN(name: string) {
    return await getRepository(Place).findOne({
      where: {
        place_name_en: name
      }
    })
  }
  public async findPlaceTH(name: string) {
    return await getRepository(Place).findOne({
      where: {
        place_name_th: name
      }
    })
  }
}
