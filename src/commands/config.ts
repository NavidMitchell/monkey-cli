import { input } from '@inquirer/prompts'
import { Command } from '@oclif/core'
import chalk from 'chalk'
import { ConfigMonkey, loadMonkeyConfig, saveMonkeyConfig } from '../internal/state/ConfigMonkey.js'

export default class Config extends Command {
    static description = 'Configures the Monkey CLI with an API key'

    static examples = ['monkey config']

    public async run(): Promise<void> {
        const config = await loadMonkeyConfig(this.config.configDir)

        const apiKey = await input({
            message: 'Enter your Shop Monkey API key',
            default: config.apiKey || ''
        })

        if (apiKey) {
            config.apiKey = apiKey
            await saveMonkeyConfig(this.config.configDir, config)
            this.log(chalk.blue('Monkey') + chalk.green(' Configured'))
        } else {
            this.log(chalk.red('No API key provided. Configuration unchanged.'))
        }
    }
}