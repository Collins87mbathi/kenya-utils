# Contributing

Thanks for thinking about contributing. The bar for opening an issue or PR is low — if something feels off, surface it.

## What's most useful

- **Sub-county corrections.** Boundary names shift; if you spot a missing or wrong one in `src/counties/index.ts`, fix it.
- **M-PESA SMS formats** the parser doesn't handle. Open an issue with a redacted sample and a description of what kind of transaction it was.
- **Network prefix updates.** Safaricom/Airtel/Telkom occasionally adopt new ranges. PRs welcome with a source link.
- **Bug reports** with a minimal reproduction. A failing test case is the gold standard.

## Getting set up

```bash
git clone https://github.com/Collins87mbathi/kenya-utils.git
cd kenya-utils
yarn
yarn test
```

Tests should pass on a fresh clone. If they don't, that's a bug — open an issue.

## Working on a change

```bash
yarn test:watch       # run tests in watch mode while you edit
yarn typecheck        # before committing
yarn build            # before opening a PR
```

A few conventions:

- **Co-locate tests.** Put them next to the source: `src/phone/index.test.ts` for `src/phone/index.ts`.
- **Keep modules independent.** A change in `phone` shouldn't require changes in `counties`. The whole point of the sub-path imports is that consumers can use one module without paying for the others.
- **No dependencies.** Pure functions only. If you find yourself reaching for a library, talk to me first.
- **Public functions never throw.** Return `null` or a sensible fallback. Library code should be safe to call on user input without try/catch.

## Commit messages

Conventional Commits-style is appreciated but not enforced:

```
fix: correct Embu sub-county list
feat(phone): add Faiba network prefix detection
docs: clarify Maisha card behaviour in README
```

## Opening a PR

- One topic per PR. Easier to review, easier to revert if needed.
- Reference the issue if there is one (`Closes #12`).
- Make sure `yarn test && yarn typecheck && yarn build` passes locally.

If you're unsure whether a change makes sense, open an issue first and I'll weigh in before you spend time on it.

## Code of conduct

Be kind. That's it.
