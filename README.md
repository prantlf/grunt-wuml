# grunt-wuml
[![NPM version](https://badge.fury.io/js/grunt-wuml.png)](http://badge.fury.io/js/grunt-wuml)
[![Build Status](https://travis-ci.org/prantlf/grunt-wuml.png)](https://travis-ci.org/prantlf/grunt-wuml)
[![Coverage Status](https://coveralls.io/repos/prantlf/grunt-wuml/badge.svg)](https://coveralls.io/r/prantlf/grunt-wuml)
[![Dependency Status](https://david-dm.org/prantlf/grunt-wuml.svg)](https://david-dm.org/prantlf/grunt-wuml)
[![devDependency Status](https://david-dm.org/prantlf/grunt-wuml/dev-status.svg)](https://david-dm.org/prantlf/grunt-wuml#info=devDependencies)
[![devDependency Status](https://david-dm.org/prantlf/grunt-wuml/peer-status.svg)](https://david-dm.org/prantlf/grunt-wuml#info=peerDependencies)
[![Code Climate](https://codeclimate.com/github/prantlf/grunt-wuml/badges/gpa.svg)](https://codeclimate.com/github/prantlf/grunt-wuml)
[![Codacy Badge](https://www.codacy.com/project/badge/f3896e8dfa5342b8add12d50390edfcd)](https://www.codacy.com/public/prantlf/grunt-wuml)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM Downloads](https://nodei.co/npm/grunt-wuml.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-wuml)

This module provides a grunt multi-task generating images from [yuml]
diagram sources using [wuml].
    
If you generate HTML technical documention from textual sources, you may want
to maintain only sources of UML diagrams in your repository and generate the
pictures only during the documentation build.  You will be able to do changes
easily, without committing both diagram sources and pictures and sychronizing
them manually.

If you want to just quickly convert a yuml source file to a picture, you
can use the [wuml] command-line tool, which this task is based on.

## Installation

You need [node >= 0.12][node], [npm] and [grunt >= 0.4][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json].  If you haven't used Grunt before, be sure to
check out the [Getting Started] guide, as it explains how to create a
Gruntfile as well as install and use Grunt plugins.  Once you're familiar
with that process, you may ensure native dependencies of this plugin and
install it:

1. Install [pre-requisites](https://github.com/schoeffm/waggly-uml#prerequisites)
   of [wuml] depending on your operating system

2. Install the Grunt task:

```shell
$ npm install grunt-wuml --save-dev
```

## Configuration

Add the `wuml` entry with the wuml task configuration to the
options of the `grunt.initConfig` method:

```js
grunt.initConfig({
  wuml: {
    one: {
      files: {
        'dist/doc/images/diagram.png': ['doc/images/diagram.yuml']
      }
    },
    all: {
      src: ['doc/images/*.classses.yuml']
      dest: 'dist/doc/images'
    }
  }
});
```
The configuration consists of key-value pairs with the output image path
as a key pointing to the yuml input file.  If you specify more source
files by wildcards, the destination should be a directory; the source file
extension wil lbe replaced by the output format in the output file name.

Then, load the plugin:

```javascript
grunt.loadNpmTasks('grunt-wuml');
```

## Build

Call the `wuml` task:

```shell
$ grunt wuml
```

or integrate it to your build sequence in `Gruntfile.js`:

```js
grunt.registerTask('default', ['wuml', ...]);
```

## Customizing

Default behaviour of the task can be tweaked by the task options; these
are the defaults:

```js
grunt.initConfig({
  wuml: {
    one: {
      files: {
        'dist/doc/images/diagram.png': ['doc/images/diagram.yuml']
      },
      options: {
        waggly: false,
        type: 'class',     // class|sequence|usecase
        orientation: 'TD', // LR|TD
        splines: 'ortho',  // ortho|spline
        format: 'png',     // jpg|png|svg
        fontFamily: 'Purisa',
        fontSize: 10
      }
    }
  }
});
```
See the [documentation of the command-line wuml tool](https://github.com/schoeffm/waggly-uml#cli-tool)
for more information.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## Release History

 * 2018-04-27   v1.0.0   Dropped support of Node.js 4
 * 2017-02-23   v0.2.1   Update dependencies
 * 2016-26-08   v0.2.0   Upgrade to Grunt 1.x
                         Detect output format from file extension
 * 2016-03-05   v0.1.1   Update dependencies, improve build testing
 * 2016-01-09   v0.1.0   Initial release

## License

Copyright (c) 2016-2019 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
[wuml]: https://github.com/schoeffm/waggly-uml
[yuml]: http://yuml.me/
