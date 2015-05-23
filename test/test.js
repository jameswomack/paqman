var Path    = require('path'),
    chai    = require('chai'),
    sinon   = require('sinon'),
    expect  = chai.expect,
    assert  = chai.assert,
    paqman  = require('../')

chai.should()
chai.use(require('sinon-chai'))

var packageFileName = 'package.json',
    packageJSON     = require(Path.join(process.cwd(), packageFileName)),
    expectedVersion = packageJSON.version

describe('installRelativeRequire', function () {
  beforeEach(function () {
    paqman.uninstallRelativeRequire()
  })
  afterEach(function () {
    paqman.uninstallRelativeRequire()
  })

  it('should install `requireCwd`', function () {
    assert(!global.requireCwd, 'global.requireCwd is falsy')
    paqman.installRelativeRequire()
    expect(global.requireCwd).to.be.a.function
  })

  it('should result in requiring package easily', function () {
    paqman.installRelativeRequire()
    var version = global.requireCwd(packageFileName).version
    expect(version).to.equal(expectedVersion)
  })
})

describe('packageJSON', function () {
  var sandbox

  beforeEach(function () {
    paqman.cache.reset()
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should cache the first result', function () {
    var cacheSetSpy = sandbox.spy(paqman.cache, 'set')
    var pkg, pkgKeyCount
    for(var i = 10; i > 0; i--) {
      pkg = paqman.packageJSON
      pkgKeyCount = pkgKeyCount || Object.keys(paqman.packageJSON).length
    }
    cacheSetSpy.should.have.callCount(pkgKeyCount + 2)
  })
})
