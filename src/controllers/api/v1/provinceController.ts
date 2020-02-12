import { ProvinceRepository } from "../../../repositories"

export class ProvinceController {
  public async index(req, res) {
    const query = req.query
    const page = query.page ?? 1
    const limit = query.limit
    const province = new ProvinceRepository()
    const result = await province.pagination(page, limit)
    return res.json({
      success: true,
      ...result
    })
  }
  public async create() {}
  public async show(req, res) {
    const id: number = req.params.id
    const province = new ProvinceRepository()
    const result = await province.find(id)
    return res.json({
      success: true,
      data: result
    })
  }
  public async update() {}
  public async delete() {}
}
