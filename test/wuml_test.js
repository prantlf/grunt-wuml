'use strict';

var fs = require('fs'),
    path = require('path');

exports.wuml = {

  'class': function (test) {
    var output = fs.statSync(path.join(__dirname, 'vaadin.png'));
    test.ok(output.isFile() && output.size > 0, 'creates a PNG file');
    test.done();
  },

  sequence: function (test) {
    var output = fs.statSync(path.join(__dirname, 'toolkit.svg'));
    test.ok(output.isFile() && output.size > 0, 'creates a SVG file');
    test.done();
  }

};
