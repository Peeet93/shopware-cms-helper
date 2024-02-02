const currentDir = process.cwd();
import path from 'path';
import fs from 'fs';
import shell from 'shelljs';

export default class FileController {

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
