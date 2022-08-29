# Cloudflare Purge Cache Action

This action uses [Cloudflare's API](https://api.cloudflare.com/#zone-purge-all-files) to purge their cache of your website. It can be helpful after deploying a new version.

What makes this action different from similar ones is that it allows you to clean URL caches based on the XML sitemap. This way, if you want to purge specific files, you don't have to remember to update the workflow every time.

## Configuration
Creating API tokens: https://developers.cloudflare.com/api/tokens/create/

**All sensitive information like zones and tokens should be stored with [encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).**
## Usage



`your-workflow.yml`
```yaml   
#...      
  - name: Purge cache
    uses: rafaucau/purge-cloudflare-cache-action@0.0.2
    with:
      # Zone is required by both authentication methods
      zone: ${{ secrets.CLOUDFLARE_ZONE }}
      
      # Use API Token
      api_token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      # OR use global API Key and Email
      api_key: ${{ secrets.CLOUDFLARE_API_KEY }}
      email: ${{ secrets.CLOUDFLARE_EMAIL }}

      # If the following options are not used, everything will be purged
      # [Optional] A space seperated list of URLs to purge
      files: https://example.com/1 https://example.com/2
      # [Optional] XML sitemap URL
      # Do not use this option if you want to purge everything!
      # If your sitemap is large, you'd better not use this option and purge everything
      sitemap: https://example.com/sitemap.xml
#... 
```
