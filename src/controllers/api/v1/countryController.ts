import { CountryRepository } from '../../../repositories'

export class CountryController {
  public async index(req, res) {
    const query = req.query
    const page = query.page ?? 1
    const limit = query.limit
    const country = new CountryRepository()
    const result = await country.pagination(page, limit)
    return res.json({
      success: true,
      ...result
    })
  }
  public async create() {}
  public async show(req, res) {
    const id: number = req.params.id
    const country = new CountryRepository()
    const result = await country.find(id)
    return res.json({
      success: true,
      data: result
    })
  }
  public async update() {}
  public async delete() {}
}
