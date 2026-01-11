# Fire Command - Multi-Type Test Execution

## Overview

The `fire` command generates and executes tests with flexible filtering options. Currently, **unit test generation is fully supported** with glob patterns, scope filtering, batch processing, and **auto-healing capabilities**. E2E and performance testing infrastructure is in place but not yet fully implemented.

The command automatically validates your AI configuration (API keys, model settings) before execution to ensure proper setup.

## Usage Examples

### Single File Test Generation

Generate unit tests for a specific file (default behavior):

```bash
riflebird fire src/utils/calculator.ts
```

Generate tests with specific type:

```bash
riflebird fire src/utils/calculator.ts --unit
riflebird fire src/components/Button.tsx --document
```

### Glob Pattern Matching

Generate tests for multiple files using glob patterns:

```bash
# All components in a directory
riflebird fire "src/components/*" --unit

# All TypeScript files recursively
riflebird fire "src/**/*.ts" --unit --e2e

# Specific file patterns
riflebird fire "src/utils/*.helper.ts" --unit
```

### Run All Tests with Scope Filters

Execute all test types for all files:

```bash
riflebird fire --all
```

Run tests with scope filtering:

```bash
# All component files only
riflebird fire --all --scope component --unit

# All service files
riflebird fire --all --scope service --unit

# All layout files with E2E tests
riflebird fire --all --scope layout --e2e
```

Run specific test types across all files:

```bash
riflebird fire --all --unit
riflebird fire --all --e2e --unit
riflebird fire --all --unit
riflebird fire --all --e2e --unit
riflebird fire --all --performance
riflebird fire --all --document
```

### Test Type Filters

Available test type flags:

- `--unit`: Unit tests (Jest, Vitest, Mocha, AVA) ✅ **Fully Implemented**
- `--document`: Documentation generation (Storybook) ✅ **Fully Implemented**
- `--e2e`: End-to-end tests (Playwright, Cypress, Puppeteer, WebdriverIO) 🚧 **Coming Soon**
- `--performance`: Performance tests 🚧 **Coming Soon**

**Note**: When using `--e2e` or `--performance` flags, the command will acknowledge them but display a "coming soon" message as these features are under development.

### Scope Filters

When using `--all`, you can filter by file scope:

- `--scope component`: React/Vue components (`*.tsx`, `*.jsx`, `*.vue`)
  - Patterns: `src/components/**`, `components/**`
- `--scope layout`: Layout files
  - Patterns: `src/layouts/**`, `layouts/**`
- `--scope page`: Page/route files
  - Patterns: `src/pages/**`, `pages/**`
- `--scope service`: Service/API files
  - Patterns: `src/services/**`, `src/api/**`
- `--scope util`: Utility/helper files
  - Patterns: `src/utils/**`, `src/helpers/**`
- `--scope hook`: React hooks/Vue composables
  - Patterns: `src/hooks/**`, `src/composables/**`
- `--scope store`: State management files
  - Patterns: `src/store/**`, `src/stores/**`, `src/state/**`

## Command Structure

```
fire [testPath] [options]
```

### Arguments

- `testPath` (optional): Path to the file to generate tests for
  - Can be absolute or relative to project root
  - Mutually exclusive with `--all` flag

### Options

| Option                | Alias | Description                                                           |
| --------------------- | ----- | --------------------------------------------------------------------- |
| `--all`               | `-a`  | Run all test types for all files                                      |
| `--e2e`               | -     | Include E2E tests                                                     |
| `--unit`              | -     | Include unit tests                                                    |
| `--document`          | -     | Include documentation generation                                      |
| `--performance`       | -     | Include performance tests                                             |
| `--scope <scope>`     | `-s`  | Filter by scope (component, layout, page, service, util, hook, store) |
| `--headless`          | `-h`  | Run in headless mode                                                  |
| `--browser <browser>` | `-b`  | Browser to use (chromium, firefox, webkit)                            |

## Resolution Logic

The command determines which test types to execute based on the following logic:

1. **`--all` with no type flags**: Runs unit tests only (currently the only fully supported type)
2. **Specific type flags**: Runs only the specified test types (note: e2e, performance show "coming soon" messages)
3. **Single file with no flags**: Defaults to unit tests only
4. **`--all` + specific flags**: Runs specified types for all files
5. **`--scope` without `--all`**: Automatically enables `--all` mode

### Examples

```bash
# Single file (defaults to unit tests)
riflebird fire src/app.ts

# Pattern matching
riflebird fire "src/components/*" --unit
riflebird fire "src/**/*.service.ts" --unit --e2e

# All files, unit tests (currently only fully supported type)
riflebird fire --all

# All files, unit tests (explicit)
riflebird fire --all --unit

# All files, multiple types (e2e/document/performance show "coming soon")
riflebird fire --all --unit --e2e --document

# Scope filtering (only with --all)
riflebird fire --all --scope component --unit
riflebird fire --all --scope service --unit --e2e
riflebird fire --all --scope hook --unit

# Multiple test types for specific file
riflebird fire src/app.ts --unit --e2e

# Complex combinations
riflebird fire --all --scope component --unit --document
```

## Validation Rules

The command enforces the following validation:

1. **Must provide either a path/pattern or `--all` flag**

   ```bash
   # ❌ Invalid
   riflebird fire

   # ✅ Valid
   riflebird fire src/app.ts
   riflebird fire "src/**/*.ts"
   riflebird fire --all
   ```

2. **Scope automatically enables `--all` mode**

   ```bash
   # ✅ Valid - scope auto-enables --all
   riflebird fire --scope component

   # ✅ Also valid - explicit --all
   riflebird fire --all --scope component

   # ❌ Invalid - scope cannot be used with specific file paths
   riflebird fire src/app.ts --scope component
   ```

3. **Test type flags must be valid**
   - Valid: `e2e`, `unit`, `document`, `performance`
   - Invalid flags throw an error

4. **Scope values must be valid**
   - Valid: `component`, `layout`, `page`, `service`, `util`, `hook`, `store`
   - Invalid scopes throw an error

## Auto-Healing

Riflebird's **Auto-Healing** feature ensures that generated unit tests functionality and pass without manual intervention.

### How It Works

1. **Generation**: The AI generates a unit test file.
2. **Verification**: The system automatically executes the test using your project's package manager (detected automatically).
3. **Detection**: If the test fails, Riflebird captures the error output (stdout/stderr).
4. **Healing**: The AI analyzes the error, regenerates the test code with fixes, and retries.
5. **Loop**: This process repeats (default: max 3 attempts) until the test passes.

### Benefits

- **Zero Manual Fixes**: Reduces the need to manually fix import errors, syntax issues, or incorrect assertions.
- **Context-Aware**: Uses actual runtime error messages to guide the AI's corrections.
- **Robust**: Handles missing dependencies, mock issues, and framework-specific quirks.

By default, auto-healing is **enabled** for all unit test generation commands.


## Error Handling

The command provides clear error messages for common issues:

```bash
# Missing API key
Error: Invalid AI configuration:
  - apiKey: OpenAI API key is required. Set it in config or OPENAI_API_KEY environment variable.
Please check your riflebird.config.ts file or environment variables.

# Invalid API key format
Error: Invalid AI configuration:
  - apiKey: OpenAI API key must start with "sk-".
Please check your riflebird.config.ts file or environment variables.

# Missing both path and --all flag
Error: Either provide a test path/pattern or use --all flag

# Using scope with specific file path
Error: Scope filters (component, layout, etc.) can only be used with --all flag

# Invalid test type
Error: Invalid test type: invalid. Valid types are: e2e, unit, document, performance

# Invalid scope
Error: Invalid scope: invalid. Valid scopes are: component, layout, page, service, util, hook, store
```
