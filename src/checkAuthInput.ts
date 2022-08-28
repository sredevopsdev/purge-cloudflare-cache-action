import * as core from '@actions/core';

function exitWithError() {
  core.setFailed('You must provide api_token OR email AND api_key');
  process.exit(1);
}

export default function checkAuthInput(
  token: string,
  email: string,
  key: string
): void {
  if (token.length || (email.length && key.length)) {
    return;
  }

  exitWithError();
}
