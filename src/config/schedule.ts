import cron from 'cron'
import { FetchData } from '../tasks/fetchData'
export class Schedule {
  constructor() {
    this.runAir()
  }
  runAir() {
    const cronJob = cron.CronJob
    // At every 20th minute from 0 through 59
    new cronJob(
      '0/20 * * * *',
      function() {
        console.log('Fetch data')
        const fetching = new FetchData()
        fetching.getData()
      },
      null,
      true,
      'Asia/Bangkok'
    )
  }
}
