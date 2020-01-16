import FetchAir from '../watcher/fetchAir'
import FetchWeather from '../watcher/fetchWeather'

class FetchData {
  public async getData() {
    const fetchAir = new FetchAir()
    fetchAir.run()

    const fetchWeather = new FetchWeather()
    fetchWeather.run()
  }
}

export default FetchData
