import * as core from '@actions/core';
import Cloudflare from 'cloudflare';
import checkAuthInput from './checkAuthInput';

const zoneId = core.getInput('zone', {required: true});

const apiToken = core.getInput('api_token');

const email = core.getInput('email');
const apiKey = core.getInput('api_key');

checkAuthInput(apiToken, email, apiKey);

const filesInput = core.getInput('purge_urls');

let filesArray: string[] = [];

if (filesInput) {
  try {
    filesArray = JSON.parse(filesInput);
  } catch (error) {
    core.setFailed(
      'Error while parsing the file list. Make sure the file list is formatted correctly!'
    );

    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

const client = new Cloudflare({
  token: apiToken.length === 0 ? undefined : apiToken,
  email: email.length === 0 ? undefined : email,
  key: apiKey.length === 0 ? undefined : apiKey
});

client.zones
  .purgeCache(zoneId, {
    //@ts-ignore missing purge_everything type - https://github.com/cloudflare/node-cloudflare/pull/107
    purge_everything: filesArray.length === 0
    // files: filesArray.length === 0 ? undefined : filesArray
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    core.debug(error.toString());
    core.setFailed(error.message);
  });
