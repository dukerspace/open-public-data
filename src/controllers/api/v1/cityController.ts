import { CityRepository } from '../../../repositories'

export class CityController {
  public async index(req, res) {
    const query = req.query
    const page = query.page ?? 1
    const limit = query.limit
    const city = new CityRepository()
    const result = await city.pagination(page, limit)
    return res.json({
      success: true,
      ...result
    })
  }
  public async create() {}
  public async show(req, res) {
    const id: number = req.params.id
    const city = new CityRepository()
    const result = await city.find(id)
    return res.json({
      success: true,
      data: result
    })
  }
  public async update() {}
  public async delete() {}
}
