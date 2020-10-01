require('dotenv').config()
import { getRepository, getConnection } from 'typeorm'
import { BaseRepository } from './baseRepository'
import { Country } from '../entity/Country'
import e = require('express')
import { Province } from '../entity/Province'

const site = `${process.env.SERVICE_HOSTNAME}:${process.env.SERVICE_PORT}`

export class CountryRepository extends BaseRepository {
  constructor() {
    super(Country)
  }
  // override pagination(currentPath: string, page: number, limit?: number) {

  // }
  public async create(data): Promise<Country> {
    return await super.create(data)
  }
  public async find(id: number, options?: Array<string>): Promise<Country> {
    // getRepository(Country).createQueryBuilder()
    // if (options) {
      let data: Country
      // data =  await getRepository(Country).createQueryBuilder()
      // .createQueryBuilder()
      // .where({ id: id }).getRawOne()
      // .getOne()
      if (options) {
        data = await getRepository(Country)
          .findOne({id: id}, { relations: options })
      } else {
        data = await getRepository(Country)
          .findOne({id: id})
      }

      return data
      // return this.transformerWithRelation(data)
    // }
    // const data = await getRepository(Country).findOne(id)
    // return await this.transformer(data)
  }
  // public async findWithRelation(id: number) {
  //   const result = await getRepository(Country).findOne(id, { relations: ["provinces"]})
  //   return result
  // }
  public async transformer(result) {
    return await result.map(x => {
      return {
        id: x.id,
        country_name_th: x.country_name_th,
        country_name_en: x.country_name_en,
        url: `${site}/air/v1/countries/${x.id}`
      }
    })
  }
  public async transformerWithRelation(result) {
    const data = await result
    return data
    // return data.map(x => {
    //   return {
    //     id: x.id,
    //     country_name_th: x.country_name_th,
    //     country_name_en: x.country_name_en,
    //     url: `${site}/air/v1/countries/${x.id}`,
    //     provinces: x.provinces.map(y => {
    //       return {
    //         province_id: y.id,
    //         province_name_th: y.province_name_th,
    //         province_name_en: y.province_name_en,
    //         url: `${site}/air/v1/provinces/${y.id}`
    //       }
    //     })
    //   }
    // })
  }
}
