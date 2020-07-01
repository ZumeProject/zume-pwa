// this needs to accept the following arguments:
// 1 - a folder where the po files are (which locales should be accepted?)
// 2 - specify what the locale file name is supposed to be (e.g. zume.json)
// 3 - create a folder for each locale?
// 4 - convert the .po file to .json and put it in the right folder
// --------------
// Manual steps
// --------------
// add the enDisplayName and native name
// --------------
// add to the list of language codes in i18n init
// --------------

const glob = require('glob'),
  path = require('path'),
  { gettextToI18next } = require('i18next-conv'),
  { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs'),
  { updateAssetFileSizes } = require('./get-asset-file-sizes'),
  sessions = require('../src/Sessions/index.json');

// since this is run through `npm run sync-i18n <arguments>` we need to start at the [2] argument.
if (
  !process.argv[2] ||
  !process.argv[3] ||
  !process.argv[4] ||
  !existsSync(process.argv[4])
) {
  console.log(`Usage: npm run sync-i18n <localizationFolder> <targetFolder> <assetTemplate>
    localizationFolder - path to folder of localizations
    targetFolder - folder where localizations should be put
    assetTemplate - sample json file to create new localized asset files`);
  process.exit();
}

const sourceI18nFolder = process.argv[2];
const targetI18nFolder = process.argv[3];
const localizedAssetsFileTemplate = process.argv[4];
const { externalLocalizationFilePrefix, assetBaseUrls } = sessions;
const targetFileName = `${externalLocalizationFilePrefix}.json`;
const targetAssetFileName = `${externalLocalizationFilePrefix}-assets.json`;

function syncI18n() {
  const files = glob.sync(`${sourceI18nFolder}**/*.po`);

  files.forEach(async (f) => {
    try {
      console.log(`Processing file ${f}`);
      const locale = path.basename(f, '.po');
      await updateExternalLocalizations(locale, f);
      await updateLocalizedAssets(locale);
    } catch (e) {
      console.error('Failed to process file', e);
    }
  });

  console.log(`Updated ${files.length} locales.`);
}

async function updateExternalLocalizations(locale, file) {
  const targetFolder = path.join(targetI18nFolder, locale);
  const target = path.join(targetFolder, targetFileName);

  if (!existsSync(targetFolder)) {
    mkdirSync(targetFolder, { recursive: true });
  }
  console.log(`Updating external localization ${target}`);
  const l11n = await gettextToI18next(locale, readFileSync(file));
  writeFileSync(target, l11n);
}

async function updateLocalizedAssets(locale) {
  const assetsFile = path.join(targetI18nFolder, locale, targetAssetFileName);
  if (!existsSync(assetsFile)) {
    console.log(
      `Creating a localized assets file since none was found. ${assetsFile}`
    );
    const assets = JSON.parse(readFileSync(localizedAssetsFileTemplate));
    assets.meta = {
      baseUrl: `${assetBaseUrls[0]}/${locale}/`,
    };
    const data = JSON.stringify(assets, null, 2);
    writeFileSync(assetsFile, data);
  }

  await updateAssetFileSizes(assetsFile);
  console.log(`Updating asset file sizes ${assetsFile}`);
}

syncI18n();
