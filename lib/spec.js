module.exports.specFiles = function(grunt, filename_regexp, media) {
  media = media || ''
  var allSpecs = grunt.file.expand({cwd: media}, [
    'pa/terrain/**/*.json',
  ])
  var filter = new RegExp(filename_regexp, '')
  var specs = []
  allSpecs.forEach(function(relpath) {
    if (filter.test(relpath)) {
      specs.push({relpath: relpath, abspath: media + relpath})
    }
  })
  return specs
}

module.exports.copyFiles = function(grunt, specs, processSpec) {
  processSpec = processSpec || function(x) {return x}
  specs.forEach(function(file) {
    var spec = grunt.file.readJSON(file.abspath)
    processSpec(spec)
    grunt.file.write(file.relpath, JSON.stringify(spec, null, 2))
  })
}
