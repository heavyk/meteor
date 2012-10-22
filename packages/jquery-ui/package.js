Package.describe({
  summary: "Interactions and Widgets for the web"
});

Package.on_use(function (api) {
  api.add_files('jquery-ui.js', 'client');
  
  // instead of boring vanilla jquery-ui (no themes)
  // this is instead a bastard child of jquery-bootstrap-ui
  //    http://addyosmani.github.com/jquery-ui-bootstrap/
  api.add_files('jquery-ui-1.8.16.custom.css', 'client');
  
  // we could potentially loop through the images dir... lol
	api.add_files('images/ui-bg_flat_0_aaaaaa_40x100.png', 'client');
	api.add_files('images/ui-bg_glass_55_fbf9ee_1x400.png', 'client');
	api.add_files('images/ui-bg_glass_65_ffffff_1x400.png', 'client');
	api.add_files('images/ui-bg_glass_75_dadada_1x400.png', 'client');
	api.add_files('images/ui-bg_glass_75_e6e6e6_1x400.png', 'client');
	api.add_files('images/ui-bg_glass_75_ffffff_1x400.png', 'client');
	api.add_files('images/ui-bg_highlight-soft_75_cccccc_1x100.png', 'client');
	api.add_files('images/ui-bg_inset-soft_95_fef1ec_1x100.png', 'client');
	api.add_files('images/ui-icons_222222_256x240.png', 'client');
	api.add_files('images/ui-icons_2e83ff_256x240.png', 'client');
	api.add_files('images/ui-icons_454545_256x240.png', 'client');
	api.add_files('images/ui-icons_888888_256x240.png', 'client');
	api.add_files('images/ui-icons_cd0a0a_256x240.png', 'client');
	api.add_files('images/ui-icons_f6cf3b_256x240.png', 'client');
});
