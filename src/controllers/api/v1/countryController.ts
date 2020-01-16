class CountryController {
  constructor() {}
  public async index(req, res) {
    return res.json({ success: true })
  }
  public async create() {}
  public async show(id: number) {}
  public async update() {}
  public async delete() {}
}

export default new CountryController()
