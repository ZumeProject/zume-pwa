const replace = require('replace-in-file');

const PUBLIC_URL = process.env.PUBLIC_URL;
const options = {
  files: ['build/404.html', 'build/manifest.json'],
  from: /%PUBLIC_URL%/g,
  to: PUBLIC_URL
};

if (PUBLIC_URL !== '/') {
  options.files.push('build/service-worker.js');
} else {
  // set public asset prefix to blank for a local service worker
  replace.sync({
    files: 'build/service-worker.js',
    from: /%PUBLIC_URL%/g,
    to: ''
  });
}

replace.sync(options);
