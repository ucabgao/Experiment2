define([
  'jquery',
  'd3'
], function($, ignore) {
  var initialize = function () {
    var debug = d3.select("body")
      .append("div")
      .style("background", "#888")
      .style("position", "absolute")
      .style("top", 0)
      .style("left", 0)
      .style("z-index", 5000);

    var divIds = ["loadTool", "about", "tool"];
    var debugOptions = ["debugLoadTool", "debugAbout", "debugTool"];
    var debugActive = [true, false, false];

    debug.append("p")
        .text(debugOptions[0])
        .attr("id", debugOptions[0]);
    debug.append("p")
        .text(debugOptions[1])
        .attr("id", debugOptions[1]);
    debug.append("p")
        .text(debugOptions[2])
        .attr("id", debugOptions[2]);

    $("#"+debugOptions[0]).click(function() {
      var e = "#"+divIds[0];
      var state = $(e).is(":visible") ? $(e).hide() : $(e).show();
      console.log(divIds[0]);
    });
    $("#"+debugOptions[1]).click(function() {
      var e = "#"+divIds[1];
      var state = $(e).is(":visible") ? $(e).hide() : $(e).show();
      console.log(divIds[1]);
    });
    $("#"+debugOptions[2]).click(function() {
      var e = "#"+divIds[2];
      var state = $(e).is(":visible") ? $(e).hide() : $(e).show();
      console.log(divIds[2]);
    });
  };

  return {
    initialize: initialize
  };
});

