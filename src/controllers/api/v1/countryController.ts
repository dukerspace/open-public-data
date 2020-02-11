import { CountryRepository } from "../../../repositories"

export class CountryController {
  private readonly country
  constructor() {
    this.country = CountryRepository
  }
  public async index(req, res) {
    const result = await this.country.pagination(1, 10)
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
