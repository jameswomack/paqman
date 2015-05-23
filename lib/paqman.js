var Path  = require('path'),
    LRU   = require('lru-cache')

module.exports = Object.create({
  CWD: process.cwd(), // For overrides
  pathPrefix: './', // Also for overrides
  packageFileName: 'package.json', // Also for overrides
  didCachePackageMembers: false, // For package member caching
  allowCacheOverwrites: false,
  cache: LRU(),
  previousRequireCwd: null,
  fromCache: function (key, creationLambda) {
    var retVal
    if (!(retVal = this.cache.get(key))) {
      this.cache.set(key, (retVal = creationLambda(key)))
    }
    return retVal
  },
  relativePath: function relativePath(pathRelativeToCwd) {
    return this.fromCache(this.pathPrefix + pathRelativeToCwd, Path.join.bind(Path, this.CWD))
  },
  relativeRequire: function relativeRequire(pathRelativeToCwd) {
    var path = this.relativePath(pathRelativeToCwd)
    return require(path)
  },
  uninstallRelativeRequire: function installRelativeRequire() {
    global.requireCwd = this.previousRequireCwd
    this.previousRequireCwd = null
  },
  installRelativeRequire: function installRelativeRequire() {
    this.previousRequireCwd = global.requireCwd
    global.requireCwd = this.relativeRequire.bind(this)
  },
  get packageJSON() {
    var packageJSON = this.fromCache(this.packageFileName, this.relativeRequire.bind(this, this.packageFileName))
    if (!this.didCachePackageMembers) {
      Object.keys(packageJSON).forEach(function (key) {
        if (!this.cache.has(key) || this.allowCacheOverwrites) {
          this.cache.set(key, packageJSON[key])
        }
      }.bind(this))
      this.didCachePackageMembers = true
    }
    return packageJSON
  }
})
