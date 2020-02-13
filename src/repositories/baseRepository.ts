import { getRepository } from 'typeorm'

const website = process.env.WEB_SITE
export class BaseRepository {
  query: Array<string>
  constructor(protected model) {}
  public async pagination(page: number, limit?: number) {
    const pageLimit: number = limit ?? 15
    const pageNumber: number = page
    const skip: number = pageNumber === 1 ? 0 : (pageNumber - 1) * pageLimit
    const result = await getRepository(this.model)
      .createQueryBuilder(`${this.model}`)
      .where({
        is_delete: false
      })
      .skip(skip)
      .take(pageLimit)
      .getMany()

    const count = await getRepository(this.model)
      .createQueryBuilder(`${this.model}`)
      .where({
        is_delete: false
      })
      .getCount()
    return {
      total: count,
      per_page: pageLimit,
      current_page: pageNumber,
      last_page: 4,
      first_page_url: this.firstPage(),
      last_page_url: this.lastPage(),
      next_page_url: this.nextPage(),
      prev_page_url: this.prevPage(),
      path: this.currentUrl,
      from: pageNumber,
      to: pageLimit,
      data: result
    }
  }
  private url(page) {
    return
  }
  private currentUrl(): string {
    return
  }
  private firstPage() {}
  private lastPage() {}
  private nextPage() {}
  private prevPage() {}
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
}
