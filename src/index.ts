import core from '@actions/core'
import Cloudflare from 'cloudflare'

const zoneId = core.getInput('zone', {required: true})
const apiToken = core.getInput('api_token', {required: true})
const filesInput = core.getInput('files')

let filesArray: string[] = []

if (filesInput) {
  try {
    filesArray = JSON.parse(filesInput)
  } catch (error) {
    core.setFailed(
      'Error while parsing the file list. Make sure the file list is formatted correctly!'
    )

    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

const client = new Cloudflare({
  token: apiToken
})

client.zones.purgeCache(zoneId, {
  //@ts-ignore missing purge_everything type - https://github.com/cloudflare/node-cloudflare/pull/107
  purge_everything: filesArray.length === 0,
  files: filesArray.length === 0 ? undefined : filesArray
})
