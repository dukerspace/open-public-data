require('dotenv').config()
import { getRepository } from 'typeorm'

const site = `${process.env.SERVICE_HOSTNAME}:${process.env.SERVICE_PORT}`

export class BaseRepository {
  currentPath: string
  allRow: number
  page: number
  perPage: number
  constructor(protected model) {}
  public async pagination(currentPath: string, page: number, limit?: number) {
    this.currentPath = currentPath
    this.page = Number(page) ?? 1
    this.perPage = Number(limit) ?? 15
    const skip: number = this.page === 1 ? 0 : (this.page - 1) * this.perPage
    const result = await getRepository(this.model)
      .createQueryBuilder(`${this.model}`)
      .where({
        is_delete: false
      })
      .skip(skip)
      .take(this.perPage)
      .getMany()

    this.allRow = await getRepository(this.model)
      .createQueryBuilder(`${this.model}`)
      .where({
        is_delete: false
      })
      .getCount()
    return {
      total: this.allRow,
      per_page: Number(this.perPage),
      current_page: Number(page),
      last_page: this.lastPage(),
      first_page_url: this.firstPageUrl(),
      last_page_url: this.lastPageUrl(),
      next_page_url: this.nextPageUrl(),
      prev_page_url: this.prevPageUrl(),
      path: this.currentUrl(),
      from: Number(page),
      to: Number(page * this.perPage),
      data: this.transform(result)
    }
  }
  private lastPage() {
    return Math.ceil(this.allRow / this.perPage)
  }
  private currentUrl(number?: number): string {
    const pageNumber = number ?? this.page ?? 1
    const params = `page=${pageNumber}&limit=${this.perPage}`
    return `${site}${this.currentPath}?${params}`
  }
  private firstPageUrl() {
    return this.currentUrl(1)
  }
  private lastPageUrl() {
    const last = this.lastPage()
    return this.currentUrl(last)
  }
  private nextPageUrl() {
    console.log(this.page , this.lastPage())
    const pageNumber = this.page < this.lastPage() ? this.page + 1 : null
    if (!pageNumber) return null
    const params = `page=${pageNumber}&limit=${this.perPage}`
    return `${site}${this.currentPath}?${params}`
  }
  private prevPageUrl() {
    const pageNumber = this.page > 1 ? this.page - 1 : null
    if (!pageNumber) return null
    const params = `page=${pageNumber}&limit=${this.perPage}`
    return `${site}${this.currentPath}?${params}`
  }
  public async create(data) {
    return await getRepository(this.model).save(data)
  }
  public async find(id: number) {
    return await getRepository(this.model).findOne(id)
  }
  public async update(id: number, data) {
    return await getRepository(this.model).update(id, data)
  }
  public async delete(id: number) {
    return await getRepository(this.model).delete(id)
  }
  public transform(result) {
    return result
  }
}
