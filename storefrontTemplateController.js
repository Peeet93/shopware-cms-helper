const currentDir = process.cwd();
const fs = require('fs');
const fileController = require('./fileController');

class storefrontTemplateController {

    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.files = new fileController();
    }

    setName(name) {
        this.name = name;
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
            template = template.replace(/##block-name##/g, this.name);
            fs.writeFileSync(`${this.composerPath}block/cms-block-${this.name}.html.twig`, template);
        } else {
            this.files.createDirectory(`${this.composerPath}element`)
            template = template.replace(/##block-name##/g, this.name);
            fs.writeFileSync(`${this.composerPath}element/cms-element-${this.name}.html.twig`, template);
        }
    }

}

module.exports = storefrontTemplateController;
