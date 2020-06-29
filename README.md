<img src="https://user-images.githubusercontent.com/77849/86050078-1ac76000-ba08-11ea-8277-e6430324de96.png" width="600" />

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
