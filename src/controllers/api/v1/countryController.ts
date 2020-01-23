import CountryRepository from "../../../repositories/countryRepository"
import RunThailand from '../../../seeders/RunThailand'

class CountryController {
  constructor() {}
  public async index(req, res) {
    // await RunThailand.run()
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
