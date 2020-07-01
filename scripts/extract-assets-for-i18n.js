/**
 * This script will look for src/sessions/index.json
 * and load up each session file listed in it.
 *
 * For each session file, it will pull in the assets list
 * and from the combined assets lists of all sessions,
 * it will generate an assets.json file template for localization.
 */

const sessions = require('../src/Sessions/index.json');

// TODO make this configurable
const mediaRoot = 'https://s3.amazonaws.com/zume-ugly-prototype-media/';

const typeToDefaultExt = {
  video: 'mp4',
  audio: 'mp3',
  download: 'pdf',
  link: ''
};

let results = {};
sessions.sessions.forEach(s => {
  const session = require(`../src/Sessions/${s}`);
  // TODO figure out a way to idempotently generate the localized versions
  // and placing them into the right place based on the locales list in the index.json required
  session.assets.forEach(a => {
    results[a.key] = {
      size: 0,
      url: `${mediaRoot}${a.key}.${typeToDefaultExt[a.type]}`
    };
  });
});

console.log(results);
