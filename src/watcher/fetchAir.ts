import * as cheerio from 'cheerio'
import * as puppeteer from 'puppeteer'
import axios from 'axios'

class FetchController {
  url: string
  constructor() {
    console.log('get start')
    this.url = 'http://aqmthai.com/aqi.php'
    this.getUrl()
  }
  public async getUrl() {
    const url = this.url
    // const getData = await axios(url)
    // .then(response => {
    //   const html = response.data
    //   const $ = cheerio.load(html)
    //   return $('tr > .tablebgmain').text()
    // })
    // .catch(console.error)
    const getData = await puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => {
        return page.goto(url).then(function() {
          return page.content()
        })
      })
      .then(html => {
        const $ = cheerio.load(html)
        return $('tr > .tablebgmain').text()
      })
    console.log(getData)
  }
  public async sendTimeSeries() {}
  public async run() {}
}

export default FetchController
