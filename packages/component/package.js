Package.describe({
  summary: "let component manage your dependencies"
});

var Fiber = require('fibers');
var LiveScript = require('LiveScript');
var Component = require('component');
var Builder = require('component-builder');
var fs = require('fs');
var Path = require('path');
var utils = Component.utils;
var log = utils.log;
var odir = ".meteor/build";

try {
  fs.mkdirSync(odir);
} catch(e) {}


Package.register_extension(
  "json", function (bundle, source_path, serve_path, where) {
    Fiber(function() {
      if(source_path.substr(-"component.json".length) === "component.json") {
        var st, this_st = fs.statSync(source_path);
        try {
          st = fs.statSync(".meteor/component.json");
        } catch(e) {}
        if(!st || st.mtime.getTime() !== this_st.mtime.getTime()) {
          var install = function(pkg) {
            Fiber(function() {
              var fiber = Fiber.current;
              //TODO: resolve the package version correctly. for now, we'll use master
              // v === '*' ? 'master' : normalize(v)
              log('install', pkg.name + '@' + pkg.version);

              pkg.on('error', function(err){
                log('error', err.message);
                //process.exit(1);
                throw err;
              });

              pkg.on('dep', function(dep){
                log('dep', dep.name + '@' + dep.version);
                install(dep);
              });

              pkg.on('exists', function(dep){
                log('exists', dep.name + '@' + dep.version);
                fiber.run();
              });

              pkg.on('file', function(file){
                log('fetch', pkg.name + ':' + file);
              });

              pkg.on('end', function(){
                log('complete', pkg.name);
                fiber.run();
              });
              
              pkg.install();
              Fiber.yield();
            }).run();
          };
          contents = fs.readFileSync(source_path);
          fs.writeFileSync(".meteor/component.json", contents);
          fs.utimesSync(".meteor/component.json", new Date, this_st.mtime);

          var config = require(source_path);
          var deps = Object.keys(config.dependencies);
          deps.map(function(k) {
            var name = k.replace('/', '-');
            //TODO: if some time has passed, say 2-3 days, do an update instead of skipping it (for master)
            //TODO: when implementing specific versions, do a version compare here and update if necessary
            if(fs.existsSync(Path.join(odir, name))) return;
            var pkg = Component.install(k, 'master', {
              dest: ".meteor/components",
              dev: true //TODO: select dev/production from the config
            });
            
            install(pkg);
          });
        }

        var css_path = Path.join(odir, 'build.css');
        var js_path = Path.join(odir, 'build.js');
        try {
          st = fs.statSync(js_path);
        } catch(e) {}
        if(!st || st.mtime.getTime() !== this_st.mtime.getTime()) {
          Fiber(function() {
            //TODO: use serve_path to determine the location in the build dir
            var builder = new Builder(Path.join(process.cwd(), ".meteor"));
            var start = new Date;
            builder.development();
            console.log();
            fiber = Fiber.current;
            builder.build(function(err, obj){
              if (err) Component.utils.fatal(err.message);

              fs.writeFileSync(css_path, obj.css);
              fs.utimesSync(css_path, new Date, this_st.mtime);

              //var name = config.name;
              //if (standalone) js.write(';(function(){\n');
              fs.writeFileSync(js_path, obj.require);
              fs.appendFileSync(js_path, obj.js);
              fs.utimesSync(js_path, new Date, this_st.mtime);
              //if (standalone) js.write('window.' + name + ' = require("' + conf.name + '");\n');
              //if (standalone) js.write('})();');

              var duration = new Date - start;
              log('write', js_path);
              log('write', css_path);
              log('js', (obj.js.length / 1024 | 0) + 'kb');
              log('css', (obj.css.length / 1024 | 0) + 'kb');
              log('duration', duration + 'ms');
              console.log();
              fiber.run();
            });
            Fiber.yield();
          }).run();
        }

        var contents = fs.readFileSync(Path.join(odir, "build.js"));
        bundle.add_resource({
          type: "js",
          path: "/component.js",
          data: contents,
          where: 'client'
        });
      }
    }).run();
  }
);

/*
//TODO: I'm not yet sure on how to write tests for this. get to it before releasing
Package.on_test(function (api) {
  api.add_files(['component_tests.ls', 'component_tests.js'],
                ['client', 'server']);
});
*/
