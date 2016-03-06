// define([
//   'jquery',
//   'underscore',
//   'backbone',
//   'd3',
//   'views/PubList'
// ], function($, _, Backbone, ignore, PubListView) {
//   var Router = Backbone.Router.extend({
//     routes: {
//       'about': 'showAbout',
//       '*actions': 'defaultAction'
//     }
//   });

//   var initialize = function () {
//     var pubrouter = new Router();

//     pubrouter.on('route:about', function() {
//       // TODO create the about view and render it
//       console.log("About routed");
//     });

//     Backbone.history.start();
//   };

//   return { 
//     initialize: initialize
//   };
// });