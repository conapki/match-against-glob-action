# Match against glob action

This action tests whether filenames match against provided glob patterns. Useful to run another steps only if needed files were changed. Similar to GitLab changes feature which is available for a single job in a workflow. Uses [minimatch](https://github.com/isaacs/minimatch) internally. 

## Inputs

- **Required** `filenames`: Filenames split by comma. E.g. `src/index.js,package.json,./tests/index.test.js`
- **Required** `patterns`: Glob patterns as a YAML list. See example below

## Outputs

- `match`: `'true'` if at least one file matches. `'false'` otherwise
- `files`: Lists all files matching the patterns

## Example usages

Get files changed in pull request

```yaml
- uses: octokit/request-action@v2.x
  id: get_files
  with:
    route: GET /repos/{owner}/{repo}/pulls/{pull_number}/files
    owner: meshokteam
    repo: meshok
    pull_number: ${{ github.event.pull_request.number }} 
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
- uses: kurnev/match-against-glob-action@v1
  id: match
  with:
    filenames: ${{ join(fromJson(steps.get_files.outputs.data).*.filename) }}
    patterns: |
      - services/nuxt/**/*
      - packages/shared/**/*
- name: Running unit tests
  if: ${{ steps.match.outputs.match == 'true' }}
  uses: ./.github/actions/unit-tests/
```

## [License](./LICENSE)

Conventional Changelog Action is [MIT licensed](./LICENSE).

## Collaboration

If you have questions or [issues](https://github.com/kurnev/match-against-glob-action/issues), please [open an issue](https://github.com/kurnev/match-against-glob-action/issues/new)!
