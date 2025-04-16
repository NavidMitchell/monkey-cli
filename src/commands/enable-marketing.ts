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
        'monkey enable-marketing --search "John"',
        'monkey enable-marketing --dry-run',
        'monkey enable-marketing --search "John" --dry-run'
    ]

    static flags = {
        search: Flags.string({ char: 's', description: 'First name to search', required: false }),
        'dry-run': Flags.boolean({ char: 'd', description: 'Run search without updating', required: false })
    }

    private formatCustomerLog(customer: Customer, dryRun: boolean, action: string): string {
        const name = `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
        const company = customer.companyName ? `(${customer.companyName})` : ''
        const prefix = dryRun ? 'Dry run: Found customer' : `Customer ${action}`
        return chalk.blue(prefix) + chalk.green(` ${name} ${company} ID: ${customer.id}`)
    }

    private async processCustomerUpdate(customerService: CustomerService, customer: Customer, dryRun: boolean): Promise<void> {
        // Fetch customer details to get phone numbers
        const customerDetails = await customerService.getCustomerDetails(customer.id)
        const phoneNumbers = customerDetails.phoneNumbers || []

        if (!phoneNumbers.length) {
            this.log(chalk.yellow(`No phone numbers found for customer ID: ${customer.id}`))
            return
        }

        // Create minimal update payload with only id, marketingOptInVerifiedDate, and marketingOptInStatus
        const updatedPhoneNumbers = phoneNumbers.map(phone => ({
            id: phone.id,
            marketingOptInVerifiedDate: new Date().toISOString(),
            marketingOptInStatus: "OptedIn"
        }))

        const updateData = { phoneNumbers: updatedPhoneNumbers }

        if (dryRun) {
            this.log(this.formatCustomerLog(customer, true, ''))
            this.log(chalk.gray(`Dry run update payload: ${JSON.stringify(updateData, null, 2)}`))
            return
        }

        await customerService.updateMarketingOptIn(customer.id, updateData)
        this.log(this.formatCustomerLog(customer, false, 'phone number marketing opt-in updated'))
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
                where: { firstName: flags.search }
            })

            if (!customers.length) {
                this.error(chalk.red('No customer found for the provided first name.'))
            }

            await this.processCustomerUpdate(customerService, customers[0], flags['dry-run'])
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
                    await this.processCustomerUpdate(customerService, customer, flags['dry-run'])
                }

                skip += limit
            }

            if (foundCount === 0) {
                this.log(chalk.yellow('No customers found.'))
            } else if (flags['dry-run']) {
                this.log(chalk.blue('Dry run: Found') + chalk.green(` ${foundCount} customers`))
            } else {
                this.log(chalk.blue('Customers') + chalk.green(` ${foundCount} phone number marketing opt-in updated`))
            }
        }
    }
}