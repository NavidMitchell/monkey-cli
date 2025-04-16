import { Command, Args } from '@oclif/core'
import chalk from 'chalk'
import { ConfigMonkey, loadMonkeyConfig } from '../internal/state/ConfigMonkey.js'
import { CustomerService } from '../internal/services/CustomerService.js'

export default class SearchCustomers extends Command {
    static description = 'Searches for customers by first name'

    static examples = [
        'monkey search-customers "John"'
    ]

    static args = {
        search: Args.string({ description: 'First name to search', required: true })
    }

    public async run(): Promise<void> {
        const { args } = await this.parse(SearchCustomers)
        const config = await loadMonkeyConfig(this.config.configDir)

        if (!config.apiKey) {
            this.error(chalk.red('API key not configured. Run `monkey config` first.'))
        }

        const customerService = new CustomerService(config.apiKey)

        const customers = await customerService.searchCustomers({
            where: { firstName: args.search }
        })

        if (!customers.length) {
            this.log(chalk.yellow('No customers found for the provided first name.'))
            return
        }

        customers.forEach((customer, index) => {
            this.log(chalk.blue(`Customer ${index + 1}:`))
            this.log(JSON.stringify(customer, null, 2))
        })
    }
}