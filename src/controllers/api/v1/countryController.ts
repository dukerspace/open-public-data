require('dotenv').config()
import { BaseController } from '../../baseController'
import { CountryRepository } from '../../../repositories'
import { urlLastPath } from '../../../utils/url'
import { Country } from 'entity/Country'
import { Response } from 'express'
const site = `${process.env.SERVICE_HOSTNAME}:${process.env.SERVICE_PORT}`

export default class CountryController extends BaseController {
  page: number
  limit: number
  public async index(req, res) {
    const country = new CountryRepository()
    const currentPath = req.path
    const page = req.query.page
    const limit = req.query.limit
    const result = await country.pagination(currentPath, page, limit)
    return res.json({
      success: true,
      ...result
    })
  }
  public async create() {}
  public async show(req, res: Response) {
    const id: number = req.params.id
    console.log('req', urlLastPath(req.path))
    const country = new CountryRepository()
    let result, options
    if (urlLastPath(req.path) === 'provinces') {
      options = [ 'provinces' ]
      const data = await country.find(id, options) //.then(x => this.transformerWithRelation(x))
      result = this.transformerWithRelation(data)
    } else {
      const data = await  country.find(id)
      console.log('data', data)
      result = this.transformer(data)
    }
    return res.json({
      success: true,
      data: result
    })
  }
  public async update() {}
  public async delete() {}
  private  transformer = (result) => {
    return result
    return {
      id: result.id,
      country_name_th: result.country_name_th,
      country_name_en: result.country_name_en,
      url: `${site}/air/v1/countries/${result.id}`
    }
  }
  public async transformerWithRelation(result) {
    return await {
      id: result.id,
      country_name_th: result.country_name_th,
      country_name_en: result.country_name_en,
      url: `${site}/air/v1/countries/${result.id}`,
      provinces: result.provinces
    }
  }
}
