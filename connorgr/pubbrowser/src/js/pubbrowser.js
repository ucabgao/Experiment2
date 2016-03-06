define([
  'jquery',
  'underscore',
  'backbone',
  'test',
  'views/PubListView'
], function($, _, Backbone, Test, PubListView) {
  var initialize = function () {
    Test.initialize();
  };

  var Router = Backbone.Router.extend({
    routes: {
      'about': 'showAbout',
      '': 'main',
      '*actions': 'defaultAction'
    },

    main: function() {
      console.log("Router");
      console.log(PubListView);
      var publistView = new PubListView();
      console.log(publistView);
      publistView.render();
    }
  });

  var pub_router = new Router();
  Backbone.history.start();


  return {
    initialize: initialize
  };
});