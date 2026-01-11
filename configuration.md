# Configuration

Test framework and AI configuration are defined in `riflebird.config.ts`.

## Full Configuration Example

```typescript
export default defineConfig({
  ai: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY, 
    model: 'gpt-4o-mini',
    temperature: 0.2,
  },
  unitTesting: {
    enabled: true,
    framework: 'vitest',
    testOutputDir: 'tests/unit', 
    testMatch: ['**/*.test.ts', '**/*.spec.ts'], 
  },
  e2e: {
    framework: 'playwright',
    playwright: {
      browser: 'chromium',
      headless: false,
    },
  },
  healing: {
    enabled: true, 
    maxRetries: 3, 
    mode: 'auto', 
  },
  documentation: {
    enabled: true,
    framework: 'storybook',
    documentationOutputDir: 'docs', 
    setupFiles: [],
    documentationMatch: ['**/*.docs.ts', '**/*.spec.ts'], 
    visual: {
      enabled: true,
      framework: 'chromatic',
    },
  },
});
```

## AI Configuration
Settings for the AI provider and model used for code generation. Validated before command execution.

| Option | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `provider` | `string` | The AI provider to use. Currently supports `'openai'`. | `'openai'` |
| `apiKey` | `string` | API Key for the provider. Can be set here or via environment variables (e.g., `OPENAI_API_KEY`). | `process.env.OPENAI_API_KEY` |
| `model` | `string` | The specific model to use (e.g., `'gpt-4o-mini'`, `'gpt-4o'`). | `'gpt-4o-mini'` |
| `temperature` | `number` | Creativity temperature (0.0 - 2.0). Lower values are more deterministic. | `0.2` |

## Unit Testing
Configuration for unit test generation and discovery.

| Option | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | Whether unit test generation capabilities are enabled. | `true` |
| `framework` | `string` | The testing framework to use. Supports `'vitest'` and `'jest'`. | `'vitest'` |
| `testOutputDir` | `string` | Directory where generated unit tests will be saved. The [Output Strategy](#test-output-strategies) is derived from this. | `'tests/unit'` |
| `testMatch` | `string[]` | Glob patterns to find existing test files to avoid duplication or learn patterns. | `['**/*.test.ts', '**/*.spec.ts']` |

## Auto-Healing
Settings for the auto-healing feature which attempts to fix failing tests automatically.

| Option | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | Enable or disable auto-healing of failing tests. | `true` |
| `maxRetries` | `number` | Maximum number of retry attempts to fix a failure (1-3). | `3` |
| `mode` | `string` | Healing mode. `'auto'` runs automatically, `'manual'` will be for interactive mode. | `'auto'` |

## Documentation
Configuration for documentation generation.

| Option | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | Whether documentation generation is enabled. | `true` |
| `framework` | `string` | Documentation framework to use (e.g., `'storybook'`). | `'storybook'` |
| `documentationOutputDir` | `string` | Directory for generated docs. Strategy derived similar to tests. | `'docs'` |
| `setupFiles` | `string[]` | Files to include for setup (e.g., global styles, providers). | `[]` |
| `documentationMatch` | `string[]` | Glob patterns to find existing documentation. | `['**/*.docs.ts', ...]` |
| `visual.enabled` | `boolean` | Whether visual testing generation is enabled. | `true` |
| `visual.framework` | `string` | Visual testing framework to use. Currently supports `'chromatic'`. | `'chromatic'` |

## E2E Testing
**Note:** E2E support is currently coming soon.

| Option | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `framework` | `string` | E2E framework to use. | `'playwright'` |
| `playwright.browser` | `string` | Browser for tests (`'chromium'`, `'firefox'`, etc.). | `'chromium'` |
| `playwright.headless` | `boolean` | Run tests in headless mode. | `false` |

## Test Output Strategies

The strategy for where files are placed is **automatically detected** from the `testOutputDir` (or `documentationOutputDir`) path.

### Root Strategy
Used for paths like `tests/unit` or `spec/unit`. The source directory structure is mirrored inside this folder.
- **Config:** `testOutputDir: 'tests/unit'`
- **Behavior:** `src/components/cmp.tsx` → `tests/unit/src/components/cmp.test.tsx`

### Colocated Strategy
Used for paths like `__tests__`, `__test__`, or `./__tests__`. The tests are placed next to the source files.
- **Config:** `testOutputDir: '__tests__'`
- **Behavior:** `src/components/cmp.tsx` → `src/components/__tests__/cmp.test.tsx`

## Configuration Validation

Riflebird validates the configuration before every command:
*   **API Key**: Checks for presence and correct format (e.g., `sk-` for OpenAI).
*   **Model**: Ensures a model name is provided.
*   **Temperature**: Must be between 0 and 2.
