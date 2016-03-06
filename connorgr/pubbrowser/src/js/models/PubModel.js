define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  // TODO create constructor for publication name for binding data to model
  var PubModel = Backbone.Model.extend({
    defaults: function () {
      return {
        title: "Empty publication entry"
      }
    }
  });

  return PubModel;
});