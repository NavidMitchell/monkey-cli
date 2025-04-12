import axios from 'axios'

interface Customer {
    id: string
    firstName?: string
    lastName?: string
    companyName?: string
}

interface SearchParams {
    where?: { companyName: string }
    limit?: number
    skip?: number
}

export class CustomerService {
    private readonly apiKey: string
    private readonly baseUrl = 'https://api.shopmonkey.cloud/v3'

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async searchCustomers(params: SearchParams = {}): Promise<Customer[]> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/customer/search`,
                params,
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status !== 200 || !response.data?.data) {
                throw new Error(`Failed to search customers: Status ${response.status}, Body: ${JSON.stringify(response.data, null, 2)}`)
            }

            return response.data.data
        } catch (error) {
            throw new Error(`Search failed: ${(error as Error).message}`)
        }
    }

    async updateMarketingOptIn(customerId: string, marketingOptIn: boolean): Promise<void> {
        try {
            const response = await axios.put(
                `${this.baseUrl}/customer/${customerId}`,
                { marketingOptIn },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status !== 200) {
                throw new Error(`Failed to update marketing opt-in: Status ${response.status}, Body: ${JSON.stringify(response.data, null, 2)}`)
            }
        } catch (error) {
            throw new Error(`Update failed: ${(error as Error).message}`)
        }
    }
}