# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in the meeko repository.

## Project Overview

Meeko is a JavaScript utility library focused on statistics, math, machine learning, AI, and data processing. It provides both CommonJS and ES modules, with browser compatibility.

## Build/Lint/Test Commands

### Testing
- **Run all tests**: `npm test` (uses mocha with recursive discovery in tests/ directory)
- **Run single test**: `mocha tests/06_math.js` (replace with specific test file)
- **Coverage with HTML**: `npm run cov` (generates HTML coverage report)
- **Coverage for codecov**: `npm run codecov` (outputs lcov format for codecov)
- **Local testing with lint**: `npm run testlocal` (runs standard lint + istanbul coverage)

### Linting
- **Run linter**: `standard *.js` (JavaScript Standard Style)
- **ESLint config**: Defined in package.json and eslintrc.json

### Building
- **Generate ES module**: `npm run cjs2mjs` (uses rollup to create index.mjs)
- **Generate docs**: `npm run jsdoc` (requires jsdoc config)
- **Generate type definitions**: `npm run gents` (uses dts-gen)

### Publishing
- **Patch version and publish**: `npm run push`
- **Create changelog**: `npm run cz` (uses conventional changelog)

## Code Style Guidelines

### General Style
- **JavaScript Standard Style** is enforced via `standard` package
- **Single quotes** for strings
- **No semicolons** (configured in ESLint)
- **2-space indentation** (Standard Style default)
- **Use strict mode**: All files start with `'use strict'`
- **Type checking**: Files use `// @ts-check` for TypeScript checking

### Import/Export Patterns
- **CommonJS**: Primary module system, uses `require()` and `module.exports`
- **ES Module**: Generated via rollup for `index.mjs`
- **Module organization**: `lib/` directory contains core functionality
- **Prototype extensions**: Defined in `lib/prototypeExt.js` using custom `ext()` function

### Naming Conventions
- **Variables**: camelCase (e.g., `genRange`, `max`, `min`)
- **Functions**: camelCase, descriptive names
- **Constants**: UPPER_SNAKE_CASE for Big integers (`MAX64_BIGINT`, `MIN64_BIGINT`)
- **File names**: kebab-case or camelCase (e.g., `mathRand.js`, `string.js`)
- **Module exports**: Descriptive object properties

### Error Handling
- **Parameter validation**: Use `checkParam` utility function
- **Type checking**: Comprehensive type guards in `lib/tools/`
- **Throw errors**: Use descriptive error messages
- **Try-catch**: Used in async operations and file handling

### Documentation Style
- **JSDoc comments**: Extensive use of `@namespace`, `@memberof`, `@param`, `@example`
- **Type annotations**: Use JSDoc types with TypeScript checking enabled
- **Examples**: Include practical code examples in JSDoc
- **Namespace organization**: Group functions under logical namespaces

### Code Organization
- **Math functions**: `lib/math.js` for basic math, `lib/mathAlgebra.js` for algebra
- **Array/String/Date prototypes**: Separate files with JSDoc namespaces
- **Machine Learning**: `lib/ml/` directory for ML algorithms
- **Utilities**: `lib/tools/` for helper functions
- **Browser compatibility**: `index.browser.js` for browser builds

### Testing Patterns
- **Mocha framework**: Using BDD style with `describe` and `it`
- **Assertions**: Node.js `assert` module with custom `assertLog` wrapper
- **Test structure**: One test file per major module (e.g., `06_math.js` for math)
- **Coverage**: Aim for 100% test coverage (configured in package.json)

### Performance Considerations
- **BigInt support**: Handles 64-bit integer operations with BigInt
- **Memory efficiency**: Uses iterative algorithms where possible
- **Matrix operations**: Optimized linear algebra implementations
- **Browser builds**: Excludes Node.js specific code

### Git and Version Management
- **Conventional commits**: Uses `cz-jt` for commit message format
- **Version bumping**: Automated via npm version scripts
- **Changelog**: Auto-generated from git history
- **Git hooks**: Pre-commit checks for linting

## Development Notes

### Node.js Compatibility
- **Minimum Node.js version**: 16.0.0 (specified in package.json engines)
- **ES2022 features**: Enabled in ESLint configuration
- **CommonJS primary**: ESM is build output, not source format

### Browser Support
- **Bundle size**: Optimized for browser usage
- **Rollup build**: Creates ESM bundle with commonjs, json, and builtins plugins
- **Browser entry point**: `index.browser.js` for browser-specific builds

### Library Structure
- **Global export pattern**: Main export is `$` object containing all utilities
- **Prototype extensions**: Safe extension of built-in prototypes
- **Modular design**: Each feature area is a separate module

## When Working on This Codebase

1. **Run tests before committing**: `npm run testlocal`
2. **Follow existing patterns**: Match the code style and structure of similar files
3. **Add JSDoc documentation**: Include type information and examples
4. **Consider browser compatibility**: Test both Node.js and browser builds
5. **Maintain test coverage**: Add tests for new functionality
6. **Use existing utilities**: Leverage `checkParam`, type guards, and helper functions