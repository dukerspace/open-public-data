import CountryRepository from "../../../repositories/countryRepository"

class CountryController {
  constructor() {}
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

export default new CountryController()
