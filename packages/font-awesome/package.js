Package.describe({
  summary: "The iconic font designed for use with Twitter Bootstrap"
});

Package.on_use(function (api) {
  api.add_files('css/font-awesome.css', 'client');
  api.add_files('font/fontawesome-webfont.eot', 'client');
  api.add_files('font/fontawesome-webfont.woff', 'client');
  api.add_files('font/fontawesome-webfont.ttf', 'client');
  api.add_files('font/fontawesome-webfont.svg', 'client');
});
