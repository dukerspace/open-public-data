#!/usr/bin/env node

import commander from 'commander'
import { Seeder } from './seeder'
export class Command {
  constructor() {
    this.load()
  }
  load() {
    const command = "list"
    const description = 'all lists'
    const alias = "l"

    commander.version('0.0.1')
      .option('seed', 'db seeder')
  }
}
