import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { ConfigMonkey, loadMonkeyConfig } from '../internal/state/ConfigMonkey.js'
import { CustomerService } from '../internal/services/CustomerService.js'

interface Customer {
    id: string
    firstName?: string
    lastName?: string
    companyName?: string
}

export default class EnableMarketing extends Command {
    static description = 'Enables marketing opt-in for a customer or all customers'

    static examples = [
        'monkey enable-marketing --search "Company Name"',
        'monkey enable-marketing --dry-run',
        'monkey enable-marketing --search "Company Name" --dry-run'
    ]

    static flags = {
        search: Flags.string({ char: 's', description: 'Company name to search', required: false }),
        'dry-run': Flags.boolean({ char: 'd', description: 'Run search without updating', required: false })
    }

    private formatCustomerLog(customer: Customer, dryRun: boolean, action: string): string {
        const name = `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
        const company = customer.companyName ? `(${customer.companyName})` : ''
        const prefix = dryRun ? 'Dry run: Found customer' : `Customer ${action}`
        return chalk.blue(prefix) + chalk.green(` ${name} ${company} ID: ${customer.id}`)
    }

    public async run(): Promise<void> {
        const { flags } = await this.parse(EnableMarketing)
        const config = await loadMonkeyConfig(this.config.configDir)

        if (!config.apiKey) {
            this.error(chalk.red('API key not configured. Run `monkey config` first.'))
        }

        const customerService = new CustomerService(config.apiKey)

        if (flags.search) {
            // Search for specific customer
            const customers = await customerService.searchCustomers({
                where: { companyName: flags.search }
            })

            if (!customers.length) {
                this.error(chalk.red('No customer found for the provided company name.'))
            }

            const customer = customers[0]
            if (flags['dry-run']) {
                this.log(this.formatCustomerLog(customer, true, ''))
                return
            }

            await customerService.updateMarketingOptIn(customer.id, true)
            this.log(this.formatCustomerLog(customer, false, 'marketing opt-in enabled'))
        } else {
            // Process all customers
            let skip = 0
            const limit = 100
            let foundCount = 0

            while (true) {
                const customers = await customerService.searchCustomers({ limit, skip })
                if (!customers.length) break

                for (const customer of customers) {
                    foundCount++
                    if (flags['dry-run']) {
                        this.log(this.formatCustomerLog(customer, true, ''))
                    } else {
                        await customerService.updateMarketingOptIn(customer.id, true)
                        this.log(this.formatCustomerLog(customer, false, 'marketing opt-in enabled'))
                    }
                }

                skip += limit
            }

            if (foundCount === 0) {
                this.log(chalk.yellow('No customers found.'))
            } else if (flags['dry-run']) {
                this.log(chalk.blue('Dry run: Found') + chalk.green(` ${foundCount} customers`))
            } else {
                this.log(chalk.blue('Customers') + chalk.green(` ${foundCount} marketing opt-in enabled`))
            }
        }
    }
}