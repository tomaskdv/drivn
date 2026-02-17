import { Command } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'
import pkg from '../package.json'

const program = new Command()

program
  .name('drivn')
  .description('Drivn — Modern UI components')
  .version(pkg.version)

program
  .command('create')
  .description('Initialize Drivn in your project')
  .action(init)

program
  .command('add [components...]')
  .description('Add components to your project')
  .action(add)

program.parse()
