# Contributing

When adding new test types:

1. Add the type to `TestType` union in `fire-command.ts`
2. Update `resolveTestTypes()` to include it in `--all` mode
3. Add CLI flag in `packages/cli/src/index.ts`
4. Implement execution logic in `FireCommand.execute()`
5. Update documentation

## Support

For issues or questions about the fire command:

- GitHub Issues: [riflebird/issues](https://github.com/ebubekirtabak/riflebird/issues)
- Discussions: [riflebird/discussions](https://github.com/ebubekirtabak/riflebird/discussions)
