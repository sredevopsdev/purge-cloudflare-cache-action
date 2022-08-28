import * as core from '@actions/core';
import Sitemapper from 'sitemapper';

export default async function getUrlsFromSitemap(url: string) {
  const sitemap = new Sitemapper({url, timeout: 60});

  try {
    const {sites} = await sitemap.fetch();
    return sites;
  } catch (error) {
    console.error(error);
    core.setFailed('Error while fetching sitemap');
    process.exit(1);
  }
}
