define([
  'underscore',
  'backbone',
  'd3',
  'collections/PubCollection',
  //'text!index.html'
  // TODO fix this include'text!index.html'
], function(_, Backbone, ignore, PubCollection){//, index) {
  var PubListView = Backbone.View.extend({
    el: d3.select("#publist"),
    render: function () {
      this.pubCollection = new PubCollection();
      console.log("PubListView:");
      console.log(this.pubCollection.data);
      console.log(d3.select('#publist'));
      d3.select('#publist')
        .append('p').text("Hello! The View works!");
      // TODO Append text
      //el.append("p").text("Hello! The View works!");
    }
  });

  return PubListView;
});