const swPrefix = "sw-cms-";
const fs = require('fs');
const currentDir = process.cwd();
const path = require('path');
const shell = require('shelljs');

class adminTemplateClass {

    constructor(type, name) {
        this.type = type;
        this.name = name;
    }

    setType(type){
        this.type = type;
    }

    setName(name){
        this.name = name;
    }

    setBlockType(type){
        this.blockType = type;
    }

    getComposerPath(){
        return this.searchFileUpward("composer.json", currentDir);
    }

    searchFileUpward(fileName, directory){
        let dir = fs.readdirSync(directory);
        for (let index in dir){
            if(dir[index] === fileName){
                return directory;
            }
        }
        if(directory.split(path.sep)[1] === ""){
            return currentDir;
        }
        return this.searchFileUpward(fileName, path.resolve(directory, '..'));
    }

    createDirectory (dir){
        if (!fs.existsSync(dir)){
            shell.mkdir('-p', dir);
            return true;
        }
        return false;
    }

    setConfigPath(){
        this.composerPath = this.getComposerPath();
        this.adminDir = this.composerPath + "/src/Resources/app/administration/src/sw-cms/";

        if (this.type === "block"){
            this.templateFolder = `${__dirname}/templates/admin/block/`;

            this.previewClass = `${swPrefix}block-preview-${this.name}`;
            this.previewBlock = `${swPrefix.replace(/-/g, '_')}block_preview_${this.name.replace(/-/g, '_')}`;

            this.componentClass = `${swPrefix}block-${this.name}`;
            this.componentBlock = `${swPrefix.replace(/-/g, '_')}block_${this.name.replace(/-/g, '_')}`;

            this.adminDir += "blocks/";
        }else if (this.type === "element"){
            this.templateFolder = `${__dirname}/templates/admin/elements/`;

            this.previewClass = `${swPrefix}el-preview-${this.name}`;
            this.previewBlock = `${swPrefix.replace(/-/g, '_')}element_preview_${this.name.replace(/-/g, '_')}`;

            this.configClass = `${swPrefix}el-config-${this.name}`;
            this.configBlock = `${swPrefix.replace(/-/g, '_')}element_config_${this.name.replace(/-/g, '_')}`;

            this.componentClass = `${swPrefix}el-${this.name}`;
            this.componentBlock = `${swPrefix.replace(/-/g, '_')}element_${this.name.replace(/-/g, '_')}`;

            this.adminDir += "elements/";
        }else{
            throw "type is not supported!";
        }
        this.adminDir += this.name + "/";

        this.previewDir = this.adminDir + "preview/";
        this.configDir = this.adminDir + "config/";
        this.componentDir = this.adminDir + "component/";
    }

    createFromTemplates(){
        this.setConfigPath();
        this.createDirectory(this.previewDir);
        this.createDirectory(this.componentDir);
        if(this.type === "block"){
            this.createBlock();
        }else if(this.type === "element"){
            this.createDirectory(this.configDir);
            this.createElement();
        }
    }

    createBlock(){
        this.createComponent();
        this.createPreview();
        this.createIndex();
    }

    createElement(){
        this.createConfig();
        this.createComponent();
        this.createPreview();
        this.createIndex();
    }

    createComponent(){
        let block = fs.readFileSync(`${this.templateFolder}component/component.scss.template`, "utf8");
        block = block.replace(/##class##/g, this.componentClass);
        fs.writeFileSync(`${this.componentDir}${this.componentClass}.scss`, block);

        block = fs.readFileSync(`${this.templateFolder}component/component.html.twig.template`, "utf8");
        block = block.replace(/##class##/g, this.componentClass);
        block = block.replace(/##block##/g, this.componentBlock);
        fs.writeFileSync(`${this.componentDir}${this.componentClass}.html.twig`, block);

        block = fs.readFileSync(`${this.templateFolder}component/index.js.template`, "utf8");
        block = block.replace(/##class##/g, this.componentClass);
        block = block.replace(/##name##/g, this.name);
        fs.writeFileSync(`${this.componentDir}index.js`, block);
    }

    createConfig(){
        let block = fs.readFileSync(`${this.templateFolder}config/config.scss.template`, "utf8");
        block = block.replace(/##class##/g, this.configClass);
        fs.writeFileSync(`${this.configDir}${this.configClass}.scss`, block);

        block = fs.readFileSync(`${this.templateFolder}config/config.html.twig.template`, "utf8");
        block = block.replace(/##class##/g, this.configClass);
        block = block.replace(/##block##/g, this.configBlock);
        fs.writeFileSync(`${this.configDir}${this.configClass}.html.twig`, block);

        block = fs.readFileSync(`${this.templateFolder}config/index.js.template`, "utf8");
        block = block.replace(/##class##/g, this.configClass);
        block = block.replace(/##name##/g, this.name);
        fs.writeFileSync(`${this.configDir}index.js`, block);
    }

    createPreview(){
        let block = fs.readFileSync(`${this.templateFolder}preview/preview.scss.template`, "utf8");
        block = block.replace(/##class##/g, this.previewClass);
        fs.writeFileSync(`${this.previewDir}${this.previewClass}.scss`, block);

        block = fs.readFileSync(`${this.templateFolder}preview/preview.html.twig.template`, "utf8");
        block = block.replace(/##class##/g, this.previewClass);
        block = block.replace(/##block##/g, this.previewBlock);
        fs.writeFileSync(`${this.previewDir}${this.previewClass}.html.twig`, block);

        block = fs.readFileSync(`${this.templateFolder}preview/index.js.template`, "utf8");
        block = block.replace(/##class##/g, this.previewClass);
        fs.writeFileSync(`${this.previewDir}index.js`, block);
    }

    createIndex(){
        let block = fs.readFileSync(`${this.templateFolder}index.js.template`, "utf8");
        block = block.replace(/##name##/g, this.name);
        block = block.replace(/##block-type##/g, this.blockType);
        block = block.replace(/##preview-class##/g, this.previewClass);
        if(this.configClass){
            block = block.replace(/##config-class##/g, this.configClass);
        }
        block = block.replace(/##component-class##/g, this.componentClass);
        fs.writeFileSync(`${this.adminDir}index.js`, block);
    }
}

module.exports = adminTemplateClass;
