'use strict';

var fs = require('fs'),
    path = require('path');

exports.wuml = {

  'class': function (test) {
    var output = fs.statSync(path.join(__dirname, 'vaadin.svg'));
    test.ok(output.isFile() && output.size > 0,
      'generates a class diagram as SVG');
    console.warn('TODO: Investigate, why creating PNG files fails - they have 0 bytes.');
    test.done();
  },

  sequence: function (test) {
    var output = fs.statSync(path.join(__dirname, 'toolkit.svg'));
    test.ok(output.isFile() && output.size > 0,
      'generates a sequence diagram as SVG');
    test.done();
  }

};
