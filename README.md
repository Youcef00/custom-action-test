# pull-request-notification-action

This action sends a Google Chat message to the specified space and notifies the user with the new review request and a link to the pull request

## Inputs

### `webhooks`

**Required** A list of Google chat webhooks to the users, the format must be as the following:

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