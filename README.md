<h1 align="center">Welcome to shopware-cms-helper 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/shopware-cms-helper" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/shopware-cms-helper.svg">
  </a>
  <img src="https://img.shields.io/badge/npm-%3E%3D8.11.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D16.16.1-blue.svg" />
  <a href="https://github.com/Peeet93/shopware-cms-helper#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Peeet93/shopware-cms-helper/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Peeet93/shopware-cms-helper" />
  </a>
</p>

> Create Shopware cms element and block structure

### 🏠 [Homepage](https://github.com/Peeet93/shopware-cms-helper#readme)

## Prerequisites

- npm >=8.11.0
- node >=16.16.1

## Install

```sh
npm i shopware-cms-helper -g
```

## Usage

go to your plugin folder e.g. `custom/plugins/MyPlugin` and run the following command

```sh
npx shopware-cms-helper
```

Choose your desired options and the plugin will create the necessary files for you

After this, you can add the new element/block to your main.js inside of "YourPlugin/src/Resources/app/administration/src" like:
```js
import './module/sw-cms/elements/test';
import './module/sw-cms/blocks/test';
```
and run:
```sh
psh.phar administration:build
```
If you dont have a psh.phar file, you can get it with this commands:
```sh
wget https://shopwarelabs.github.io/psh/psh.phar
chmod +x psh.phar
```
Now you should have a new element/block in your storefront administration


## Author

👤 **Kevin Dohlen**

* Website: https://www.webaix.de
* Github: [@Peeet93](https://github.com/Peeet93)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Peeet93/shopware-cms-helper/issues). 

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
