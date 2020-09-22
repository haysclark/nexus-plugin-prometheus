# Contributing

The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into master.

## Code of Conduct

Please make sure you're familiar with and follow the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Reviewing Pull Requests

1. Ensure all checklist items are completed.

## Approving Pull Requests

1. Use "Squash and Merge". This keeps a clean history in `master`, with a full history available in Pull Requests.
1. Ensure the merge message conforms to [Conventional Commits](https://conventionalcommits.org/) spec.
1. Breaking changes? Ensure the commit message contains the text `BREAKING CHANGE:`.

## Releasing

Releasing is handled automatically when merging to `master`, powered by [GitHub Actions](https://github.com/features/actions) and [semantic-release](https://github.com/semantic-release/semantic-release).
