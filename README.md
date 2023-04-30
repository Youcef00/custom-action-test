# custom-action-test

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `webhooks`

**Required** A list of Google chat webhooks to the users, the format must be the following:

`git_username:webhook_URL git_username2:webhook_URL2`

## Example usage

```yaml
on:
  pull_request:
    types : [review_requested]

jobs:
  PR-notification-job:
    runs-on: ubuntu-latest
    name: Send GitHub notification
    steps:
      - name: Hello world action step
        id: hello
        uses: Youcef00/pull-request-notification-action@v1.0
        with:
          webhooks: ${{ format('{0} {1}', secrets.WEBHOOK_GITBOT, secrets.WEBHOOK_PLATCHOON) }}
```