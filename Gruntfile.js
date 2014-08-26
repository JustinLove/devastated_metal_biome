var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/com.wondible.pa.devastated_metal_biome.server/'
var stream = 'stable'
var media = require('./lib/path').media(stream)

module.exports = function(grunt) {
  var craters = grunt.file.readJSON('craters.json')

  // Project configuration.
  grunt.initConfig({
    copy: {
      biome: {
        files: [
          {
            src: media + 'pa/terrain/metal.json',
            dest: 'pa/terrain/devastated_metal.json',
          },
          {
            src: media + 'pa/terrain/metal/metal.json',
            dest: 'pa/terrain/metal/devastated_metal.json',
          },
        ],
      },
      mod: {
        files: [
          {
            src: [
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: ['modinfo.json'],
            dest: modPath,
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content)
            info.date = require('dateformat')(new Date(), 'yyyy/mm/dd')
            info.identifier = info.identifier.replace('client', 'server')
            info.context = 'server'
            info.category = ['biome']
            delete(info.scenes)
            delete(info.priority)
            console.log(info.identifier, info.version, info.date)
            return JSON.stringify(info, null, 2)
          }
        }
      },
    },
    jsonlint: {
      all: {
        src: [
          'pa/terrain/**/*.json',
        ]
      },
    },
    proc: {
      type: {
        filename_regexp: 'pa/terrain/devastated_metal.json',
        process: function(spec) {
          spec.biomes[0].spec = '/pa/terrain/metal/devastated_metal.json'
          spec.name = 'devastated_metal'
          spec.ignore_height_range = false
        }
      },
      biome: {
        filename_regexp: 'pa/terrain/metal/devastated_metal.json',
        process: function(spec) {
          spec.layers.push({
            "note": "7",
            "disable": false,
            "noise": {
              "scale": 1,
              "zoom": 2,
              "type": "simplex",
              "simplex_scale": 10
            }
          })
          spec.brushes.forEach(function(brush) {
            brush.elevation_range = [ -1.0, 1.0 ]

            if (brush.brush_spec == "/pa/terrain/generic/brushes/unit_cannon_wreckage.json") {
              brush.layer = 7
              brush.max_instances = 10
              brush.noise_range = [0, 1]
              brush.planet_size_range = [200, null]
            }
          })
          spec.brushes = spec.brushes.concat(craters)
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('copy:biomeFiles', 'copy files into the mod from PA', function() {
    var done = this.async()
    prompt.get(['filename_regexp'], function(err,result) {
      var specs = spec.specFiles(grunt, result.filename_regexp, media)
      spec.copyFiles(grunt, specs)
      done()
    })
  })

  var proc = function(filename_regexp, process) {
    var specs = spec.specFiles(grunt, filename_regexp)
    spec.copyFiles(grunt, specs, process)
  }

  grunt.registerMultiTask('proc', 'Process biome files', function() {
    var process = this.data.process
    if (this.data.filename_regexp) {
      proc(this.data.filename_regexp, process)
    } else {
      var done = this.async()
      prompt.get(['filename_regexp'], function(err,result) {
        proc(result.filename_regexp, process)
        done()
      })
    }
  })

  grunt.registerTask('server', ['copy:mod', 'copy:modinfo']);

  // Default task(s).
  grunt.registerTask('default', ['jsonlint']);

};

