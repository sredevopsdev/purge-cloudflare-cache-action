import * as core from '@actions/core';
import Cloudflare from 'cloudflare';
import checkAuthInput from './checkAuthInput';

const zoneId = core.getInput('zone', {required: true});

const apiToken = core.getInput('api_token');

const email = core.getInput('email');
const apiKey = core.getInput('api_key');

checkAuthInput(apiToken, email, apiKey);

const files = core.getInput('files');
let filesArray: string[] = [];

if (files.length) {
  filesArray = files.split(' ');
}

const client = new Cloudflare({
  token: apiToken.length === 0 ? undefined : apiToken,
  email: email.length === 0 ? undefined : email,
  key: apiKey.length === 0 ? undefined : apiKey
});

client.zones
  .purgeCache(zoneId, {
    //@ts-ignore missing purge_everything type - https://github.com/cloudflare/node-cloudflare/pull/107
    purge_everything: filesArray.length === 0 ? true : undefined,
    files: filesArray.length === 0 ? undefined : filesArray
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
    core.setFailed(error.message);
  });
