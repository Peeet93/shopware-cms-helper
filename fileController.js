const currentDir = process.cwd();
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

class fileController {

    searchFileUpward(fileName, directory) {
        let dir = fs.readdirSync(directory);
        for (let index in dir) {
            if (dir[index] === fileName) {
                return directory;
            }
        }
        if (directory.split(path.sep)[1] === "") {
            return currentDir;
        }
        return this.searchFileUpward(fileName, path.resolve(directory, '..'));
    }

    createDirectory(dir) {
        if (!fs.existsSync(dir)) {
            shell.mkdir('-p', dir);
            return true;
        }
        return false;
    }

    getComposerPath(currentDir) {
        return this.searchFileUpward("composer.json", currentDir);
    }

}

module.exports = fileController;
