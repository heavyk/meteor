Package.describe({
  summary: "Javascript dialect similar to coffeescript based off of coco"
});

var LiveScript = require('LiveScript');
var fs = require('fs');

Package.register_extension(
  "ls", function (bundle, source_path, serve_path, where) {
    serve_path = serve_path + '.js';

    var contents = fs.readFileSync(source_path);
    var options = {bare: true};
    try {
      contents = new Buffer(LiveScript.compile(contents.toString('utf8'), options));
    } catch(e) {
      return bundle.error("File: "+source_path+"\n"+e.message);
    }

    bundle.add_resource({
      type: "js",
      path: serve_path,
      data: contents,
      where: where
    });
  }
);

Package.on_test(function (api) {
  api.add_files(['livescript_tests.ls', 'livescript_tests.js'],
                ['client', 'server']);
});
