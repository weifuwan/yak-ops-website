# Contributing Guide

Yak Ops is developed in the open. Bug reports, documentation fixes, design discussions, and focused code contributions are welcome.

## Before starting

1. Search existing Issues and Pull Requests.
2. Open an Issue when the change affects product behavior or needs design discussion.
3. Keep each Pull Request focused on one problem.

## Development flow

```text
Issue or idea
    ↓
Create a branch
    ↓
Implement and test
    ↓
Update docs when needed
    ↓
Open a Pull Request
```

## Code style

Backend changes should follow `CODE_STYLE.md` in the Yak Ops repository.

Frontend changes should also follow:

```text
yak-ops-ui/FRONTEND_CODE_STYLE.md
```

## Pull Request checklist

Before opening a PR, check that:

- the change has a clear scope;
- related tests or validation have been run;
- user-visible behavior is described in the PR body;
- configuration or documentation changes are included when needed;
- unrelated refactors are kept out of the same PR.

## Good first contributions

Documentation, UI polish, connector compatibility fixes, tests, and small usability improvements are all good ways to get familiar with the project.

For larger architectural changes, start with an Issue so the direction can be discussed before implementation.
