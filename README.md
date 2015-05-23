<img src="https://www.dropbox.com/s/mr4lt2ihbvjg1ka/paqman.gif?dl=1" width="600" />


<br>
<br>

## Interface
* `relativePath(somePath:String)`: Retrieve a path relative to the project root
* `relativeRequire(somePath:String)`: Require a module relative to the project root
* `installRelativeRequire()`: Install `relativeRequire` globally as `requireCwd`
* `uninstallRelativeRequire()`: Reverse ^^
* `packageJSON`: A cached reference to your package.json's contents

## Installation
```
npm i paqman -S
```

## Verification
```
git clone https://github.com/jameswomack/paqman.git
cd paqman
npm i
npm test
npm run cover
```
