Package.describe({
  summary: "JavaScript 3D library."
});

Package.on_use(function (api) {
  api.add_files('three.min.js', 'client');
});
