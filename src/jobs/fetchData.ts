import FetchAir from '../watcher/fetchAir'
import FetchWeather from '../watcher/fetchWeather'

class FetchData {
  constructor() {
    this.getData()
  }
  public async getData() {
    const fetchAir = new FetchAir()
    fetchAir.run()
  }
}

export default FetchData
