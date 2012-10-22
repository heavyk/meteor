Package.describe({
  summary: "a JavaScript functional programming library. It is the recommended base library for, and is written in, LiveScript. It is based in part off of Haskell's Prelude module."
});

Package.on_use(function (api) {
  api.add_files('prelude.js', 'server');
  api.add_files('prelude-browser.js', 'client');
});
