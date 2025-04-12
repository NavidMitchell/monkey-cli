import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { ConfigMonkey, loadMonkeyConfig } from '../internal/state/ConfigMonkey.js'
import { CustomerService } from '../internal/services/CustomerService.js'

export default class SearchCustomers extends Command {
    static description = 'Searches for customers by company name'

    static examples = [
        'monkey search-customers --search "Company Name"'
    ]

    static flags = {
        search: Flags.string({ char: 's', description: 'Company name to search', required: true })
    }

    public async run(): Promise<void> {
        const { flags } = await this.parse(SearchCustomers)
        const config = await loadMonkeyConfig(this.config.configDir)

        if (!config.apiKey) {
            this.error(chalk.red('API key not configured. Run `monkey config` first.'))
        }

        const customerService = new CustomerService(config.apiKey)

        const customers = await customerService.searchCustomers({
            where: { companyName: flags.search }
        })

        if (!customers.length) {
            this.log(chalk.yellow('No customers found for the provided company name.'))
            return
        }

        customers.forEach((customer, index) => {
            this.log(chalk.blue(`Customer ${index + 1}:`))
            this.log(JSON.stringify(customer, null, 2))
        })
    }
}