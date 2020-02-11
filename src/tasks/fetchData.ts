import { FetchAir } from '../watcher/fetchAir'

export class FetchData {
  constructor() {
    this.getData()
  }
  public async getData() {
    const fetchAir = new FetchAir()
    fetchAir.run()
  }
}
