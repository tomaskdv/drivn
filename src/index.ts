import { Command } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'

const program = new Command()

program
  .name('drivn')
  .description('Drivn — Modern UI components')
  .version('0.1.0')

program
  .command('create')
  .description('Initialize Drivn in your project')
  .action(init)

program
  .command('add [components...]')
  .description('Add components to your project')
  .action(add)

program.parse()
