import { Command } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'
import { sync } from './commands/sync.js'

const program = new Command()

program
  .name('drivn')
  .description('Drivn — Modern UI components')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize Drivn in your project')
  .action(init)

program
  .command('add [components...]')
  .description('Add components to your project')
  .action(add)

program
  .command('sync')
  .description('Sync installed components to latest version')
  .action(sync)

program.parse()
