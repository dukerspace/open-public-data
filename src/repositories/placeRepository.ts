import BaseRepository from './baseRepository'
import { Place } from '../entity/Place'

class PlaceRepository extends BaseRepository {
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
}

export default PlaceRepository
