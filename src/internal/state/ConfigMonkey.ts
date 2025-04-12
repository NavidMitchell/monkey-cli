import { createStateManager } from './IStateManager.js'

const CONFIG_KEY = 'monkey-config'

export class ConfigMonkey {
    apiKey?: string
}

export async function loadMonkeyConfig(dataDir: string): Promise<ConfigMonkey> {
    const stateManager = createStateManager(dataDir)
    if (await stateManager.containsState(CONFIG_KEY)) {
        const loadedConfig = await stateManager.load<ConfigMonkey>(CONFIG_KEY)
        // Merge loaded config with defaults
        return { ...new ConfigMonkey(), ...loadedConfig }
    } else {
        return new ConfigMonkey()
    }
}

export async function saveMonkeyConfig(dataDir: string, config: ConfigMonkey): Promise<void> {
    const stateManager = createStateManager(dataDir)
    await stateManager.save(CONFIG_KEY, config)
}