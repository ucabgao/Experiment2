require.config({
  paths: {
    jquery: '../../components/jquery/jquery.min',
    underscore: '../../components/underscore/underscore',
    backbone: '../../components/backbone/backbone',
    d3: '../../components/d3/d3.min'
  },
  
  shim: {
    'backbone': {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ['underscore', 'jquery'],
      //Once loaded, use the global 'Backbone' as the
      //module value.
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    }
  }

});

require([
  // Load app module and pass it to definition function
  'pubbrowser'
], function(Pubbrowser) {
  Pubbrowser.initialize();
});