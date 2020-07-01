const request = require('request'),
  Bottleneck = require('bottleneck'),
  { readFileSync, writeFileSync } = require('fs');

/**
 * Note this is just a helper script to quickly fetch file sizes.
 * Many servers are not returning the content-length header, especially when
 * behind a CDN. We have to fetch the actual content to get its length.
 * So this helper isn't 100% reliable.
 */

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100,
});

async function getAssetSizes(assetsFile) {
  const assets = JSON.parse(readFileSync(assetsFile));
  const results = {};
  const { meta } = assets;
  const { baseUrl } = meta;
  const requests = Object.keys(assets).map(async (a) => {
    let url = assets[a].url;
    if (url) {
      if (!url.startsWith('https://')) {
        url = baseUrl + url;
      }
      results[a] = await limiter.schedule(() => getSize(url));
    }
  });
  await Promise.all(requests);
  return { original: assets, fileSizes: results };
}

function getSize(url) {
  return new Promise((resolve, reject) => {
    request.head(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        const len = response.headers['content-length'];
        if (len && !isNaN(len)) {
          resolve(JSON.parse(len));
        } else {
          resolve();
        }
      }
    });
  });
}

async function updateAssetFileSizes(assetsFile) {
  const { original, fileSizes } = await getAssetSizes(assetsFile);
  Object.keys(fileSizes).forEach((k) => {
    if (fileSizes[k]) {
      original[k].size = fileSizes[k];
    }
  });
  const data = JSON.stringify(original, null, 2);
  writeFileSync(assetsFile, data);
  console.log(`Updated asset filesizes for ${assetsFile}`);
}

module.exports = {
  getAssetSizes,
  updateAssetFileSizes,
};
