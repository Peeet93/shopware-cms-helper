const currentDir = process.cwd();
import FileController from './fileController.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class StorefrontTemplateController {

    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.files = new FileController();
    }

    setName(name) {
        this.name = name
    }

    getNameForBlocks(){
        return this.name.replace(/-/g, '_');
    }

    setType(type) {
        this.type = type;
    }

    createFromTemplates() {
        this.composerPath = this.files.getComposerPath(currentDir);
        if (this.composerPath === currentDir) {
            this.composerPath = this.composerPath + "/src/Resources/views/storefront/";
        } else {
            this.composerPath = currentDir + "/"
        }
        let template = fs.readFileSync(`${__dirname}/templates/storefront/storefront.html.twig.template`, "utf8");
        if (this.type === "block") {
            this.files.createDirectory(`${this.composerPath}block`)
            template = template.replace(/##block-name##/g, this.getNameForBlocks());
            fs.writeFileSync(`${this.composerPath}block/cms-block-${this.name}.html.twig`, template);
        } else {
            this.files.createDirectory(`${this.composerPath}element`)
            template = template.replace(/##block-name##/g, this.getNameForBlocks());
            fs.writeFileSync(`${this.composerPath}element/cms-element-${this.name}.html.twig`, template);
        }
    }

}
