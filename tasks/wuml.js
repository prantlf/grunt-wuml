// grunt-wuml
// https://github.com/prantlf/grunt-wuml
//
// Copyright (c) 2016 Ferdinand Prantl
// Licensed under the MIT license.
//
// Generates images from wuml diagram sources.

'use strict';

var path = require('path'),
    wuml = require('wuml'),
    Q = require('q');

module.exports = function (grunt) {

  function processDiagram(fileSrc, fileDest, options) {
    try {
      grunt.log.subhead('Processing diagram "' + fileSrc + '"');
      var input = grunt.file.read(fileSrc, {encoding: 'utf-8'});
      return Q.Promise(function (resolve, reject) {
        wuml.createDiagram(input, options, function(svg) {
          try {
            grunt.file.write(fileDest, svg, {encoding: 'utf-8'});
            resolve();
          } catch (error) {
            grunt.log.error(error);
            grunt.fail.warn('Writing diagram to "' + fileDest + '" failed\n');
            reject();
          }
        });
      });
    } catch (error) {
      grunt.log.error(error);
      grunt.fail.warn('Processing diagram "' + fileSrc + '" failed\n');
    }
  }

  grunt.registerMultiTask('wuml', "Generate images from yuml diagram sources by wuml", function () {
    var done = this.async(),
        options = this.options({
          waggly: false,
          type: 'class',     // class|sequence|usecase
          orientation: 'TD', // LR|TD
          splines: 'ortho',  // ortho|spline
          format: 'png',     // jpg|png|svg
          fontFamily: 'Purisa',
          fontSize: 10
        }),
        promises = this.files.map(function (file) {
          // If multiple source files are specified, the destination
          // path should point to a directory
          var single = file.orig.src.length === 1 &&
                file.orig.src.findIndex(function (src) {
                  return src.indexOf('*') >= 0 || src.indexOf('?') >= 0;
                }) < 0,
              promises = file.src.map(function (src) {
                // If the destination is a directory, use the source file name
                // with the target image format as extension
                var dest = single ? file.dest : path.join(file.dest,
                      path.parse(src).name + '.' + options.format),
                    dir = path.dirname(dest);
                grunt.file.mkdir(dir);
                return processDiagram(src, dest, options);
              });
          return Q.all(promises);
        });
    Q.all(promises)
     .then(done);
  });
};
