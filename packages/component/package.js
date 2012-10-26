Package.describe({
  summary: "let component manage your dependencies"
});

var fs = require('fs');
var Path = require('path');
var url = require('url');
var Fiber = require('fibers');
var Future = require('fibers/future');
var _ = require('../../app/lib/third/underscore.js');
var Component = require('component');
var Builder = require('component-builder');
var utils = Component.utils;
var log = utils.log;
var odir = ".meteor/build";

try {
  fs.mkdirSync(odir);
} catch(e) {}

function normalize(deps) {
  return Object.keys(deps).map(function(name){
    return name + '@' + deps[name];
  });
}

Package.register_extension(
  "json", function (bundle, source_path, serve_path, where) {
    if(serve_path === "/component.json") {
      Fiber(function() {
        var st, this_st = fs.statSync(source_path);
        var css_path = Path.join(odir, 'build.css');
        var js_path = Path.join(odir, 'build.js');

        try {
          st = fs.statSync(".meteor/component.json");
        } catch(e) {}

        if(!st || st.mtime.getTime() !== this_st.mtime.getTime()) {
          contents = fs.readFileSync(source_path);
          fs.writeFileSync(".meteor/component.json", contents);
          fs.utimesSync(".meteor/component.json", new Date, this_st.mtime);

          var conf = require(source_path);
          var pkgs = conf.dependencies;
          if(!pkgs) return;
          var dev = true; // XXX: get this from the config
          if(dev && conf.development) {
            pkgs = pkgs.concat(normalize(conf.development));
          }

          conf.remotes = conf.remotes || [];
          conf.remotes.push('https://raw.github.com');

          var install = Future.wrap(function(name, version, cb) {
            var i = 0;
            var report = function(pkg, options) {
              options = options || {};
              log('install', pkg.name + '@' + pkg.version);

              pkg.on('error', function(err){
                if (404 != err.status) utils.fatal(err.stack);
                if (false !== options.error) {
                  log('error', err.message);
                  //process.exit(1);
                  if(pkg.name === name) cb(err);
                }
              });

              pkg.on('dep', function(dep){
                log('dep', dep.name + '@' + dep.version);
                report(dep);
              });

              pkg.on('exists', function(dep){
                log('exists', dep.name + '@' + dep.version);
                if(pkg.name === name) cb();
              });

              pkg.on('file', function(file){
                log('fetch', pkg.name + ':' + file);
              });

              pkg.on('end', function(){
                log('complete', pkg.name);
                if(pkg.name === name) cb();
              });
            };

            var next = function() {
              var remote = conf.remotes[i++];
              if (!remote) return;

              var last = 0 == conf.remotes.length;
              remote = url.parse(remote);
              remote.href = remote.href.slice(0, -1);

              var pkg = Component.install(name, version, {
                dest: ".meteor/components",
                dev: dev,
                remote: remote.href
              });

              pkg.once('error', next);
              report(pkg, { error: last });
              pkg.install();
            };
            next();
          });


          _.each(pkgs, function(url, pkg) {
            var parts = pkg.split('@');
            var name = parts.shift();
            var version = parts.shift() || 'master';
            var rname = pkg.replace('/', '-');
            //TODO: if some time has passed, say 2-3 days, do an update instead of skipping it (for master)
            //TODO: when implementing specific versions, do a version compare here and update if necessary
            if(fs.existsSync(Path.join(odir, name))) return;
            install(name, version).wait();
          });
          fs.utimesSync(js_path, new Date, new Date);
        }
        
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

              bundle.add_resource({
                type: "js",
                path: "/component.js",
                data: "" + obj.require + obj.js,
                where: 'client'
              });

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

        // TODO: add an interface which lets the user know that the files are being built
        var contents = fs.readFileSync(js_path);
        bundle.add_resource({
          type: "js",
          path: "/component.js",
          data: contents,
          where: 'client'
        });
      }).run();
    }
  }
);

/*
//TODO: I'm not yet sure on how to write tests for this. get to it before releasing
Package.on_test(function (api) {
  api.add_files(['component_tests.ls', 'component_tests.js'],
                ['client', 'server']);
});
*/
