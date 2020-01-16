import { getRepository } from 'typeorm'

class BaseRepository {
  constructor(protected model) {}
  public async pagination(page: number, limit: number) {
    let skip = page === 1 ? 0 : (page - 1) * limit
    return await getRepository(this.model)
      .createQueryBuilder(`${this.model}`)
      .where({
        is_delete: false
      })
      .skip(skip)
      .take(limit)
      .getMany()
  }
  public async create(data) {
    return await getRepository(this.model).create(data)
  }
  public async find(id: number) {
    return await getRepository(this.model).findOne(id)
  }
  public async update(id: number, data) {
    return await getRepository(this.model).update(id, data)
  }
  public async delete(id: number) {
    return await getRepository(this.model).delete(id)
  }
}

export default BaseRepository
