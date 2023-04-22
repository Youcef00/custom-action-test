# custom-action-test

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `webhook`

**Required** The webhook URL of the chat.

## Example usage

```yaml
uses: Youcef00/custom-action-test@v1.16
with:
  webhook: WEBHOOK_URL
```