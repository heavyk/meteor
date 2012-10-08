Package.describe({
  summary: "real-time audio synthesis and composition from within the browser"
});

Package.on_use(function (api) {
  api.add_files('Audiolet.js', 'client');
});
