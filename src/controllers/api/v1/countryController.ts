import { CountryRepository } from "../../../repositories"

export class CountryController {
  public async index(req, res) {
    const country = new CountryRepository()
    const result = await country.pagination(1, 10)
    return res.json({
      success: true,
      data: result
    })
  }
  public async create() {}
  public async show(id: number) {}
  public async update() {}
  public async delete() {}
}
