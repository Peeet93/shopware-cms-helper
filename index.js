'use strict';
const inquirer = require('inquirer');
const currentDir = process.cwd();
const fs = require('fs');

let questions = [
    {
        type: 'list',
        name: 'type',
        message: "Block or Element?",
        choices: ['Block', 'Element'],
    },
    {
        type: 'input',
        name: 'name',
        message: 'Choose your name:',
        validate: function (input) {
            return input !== "";
        }
    }
];

let createDirectory = function(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        return true;
    }
    return false;
}

inquirer.prompt(questions).then((answers) => {
    const swPrefix = "sw-cms-";

    let elementDir = currentDir + "/" + answers.name + "/";

    let preview = elementDir + "preview/";
    let config = elementDir + "config/";
    let component = elementDir + "component/";

    let block;
    let templateFolder;
    let previewClass;
    let previewBlock;
    let componentClass;
    let componentBlock;
    let configClass;
    let configBlock;


    if(!createDirectory(elementDir)){
        console.log("Folder already exists!");
        return;
    }
    createDirectory(preview);
    createDirectory(component);

    if(answers.type === "Block"){
        templateFolder = `${__dirname}/templates/block/`;
        previewClass = `${swPrefix}block-preview-${answers.name}`;
        previewBlock = `${swPrefix.replace(/-/g, '_')}block_preview_${answers.name.replace(/-/g, '_')}`;

        componentClass = `${swPrefix}block-${answers.name}`;
        componentBlock = `${swPrefix.replace(/-/g, '_')}block_${answers.name.replace(/-/g, '_')}`;

    }else{
        templateFolder = `${__dirname}/templates/element/`;
        previewClass = `${swPrefix}el-preview-${answers.name}`;
        previewBlock = `${swPrefix.replace(/-/g, '_')}element_preview_${answers.name.replace(/-/g, '_')}`;

        configClass = `${swPrefix}el-config-${answers.name}`
        configBlock = `${swPrefix.replace(/-/g, '_')}element_config_${answers.name.replace(/-/g, '_')}`

        componentClass = `${swPrefix}el-${answers.name}`;
        componentBlock = `${swPrefix.replace(/-/g, '_')}element_${answers.name.replace(/-/g, '_')}`;

        createDirectory(config);

        /////////////////////// SCSS ////////////////////////
        block = fs.readFileSync(`${templateFolder}config/config.scss.template`, "utf8");
        block = block.replace(/##class##/g, configClass);
        fs.writeFileSync(`${config}${configClass}.scss`, block);
        /////////////////////// TWIG ////////////////////////
        block = fs.readFileSync(`${templateFolder}config/config.html.twig.template`, "utf8");
        block = block.replace(/##class##/g, configClass);
        block = block.replace(/##block##/g, configBlock);
        fs.writeFileSync(`${config}${configClass}.html.twig`, block);
        /////////////////////// JS ////////////////////////
        block = fs.readFileSync(`${templateFolder}config/index.js.template`, "utf8");
        block = block.replace(/##class##/g, configClass);
        block = block.replace(/##name##/g, answers.name);
        fs.writeFileSync(`${config}index.js`, block);
    }

    /////////////////////// SCSS ////////////////////////
    block = fs.readFileSync(`${templateFolder}preview/preview.scss.template`, "utf8");
    block = block.replace(/##class##/g, previewClass);
    fs.writeFileSync(`${preview}${previewClass}.scss`, block);

    block = fs.readFileSync(`${templateFolder}component/component.scss.template`, "utf8");
    block = block.replace(/##class##/g, componentClass);
    fs.writeFileSync(`${component}${componentClass}.scss`, block);
    /////////////////////// TWIG ////////////////////////
    block = fs.readFileSync(`${templateFolder}preview/preview.html.twig.template`, "utf8");
    block = block.replace(/##class##/g, previewClass);
    block = block.replace(/##block##/g, previewBlock);
    fs.writeFileSync(`${preview}${previewClass}.html.twig`, block);

    block = fs.readFileSync(`${templateFolder}component/component.html.twig.template`, "utf8");
    block = block.replace(/##class##/g, componentClass);
    block = block.replace(/##block##/g, componentBlock);
    fs.writeFileSync(`${component}${componentClass}.html.twig`, block);
    /////////////////////// JS ////////////////////////
    block = fs.readFileSync(`${templateFolder}preview/index.js.template`, "utf8");
    block = block.replace(/##class##/g, previewClass);
    fs.writeFileSync(`${preview}index.js`, block);

    block = fs.readFileSync(`${templateFolder}component/index.js.template`, "utf8");
    block = block.replace(/##class##/g, componentClass);
    block = block.replace(/##name##/g, answers.name);
    fs.writeFileSync(`${component}index.js`, block);
    /////////////////////// index.js ////////////////////////
    block = fs.readFileSync(`${templateFolder}index.js.template`, "utf8");
    block = block.replace(/##name##/g, answers.name);
    block = block.replace(/##preview-class##/g, previewClass);
    if(configClass){
        block = block.replace(/##config-class##/g, configClass);
    }
    block = block.replace(/##component-class##/g, componentClass);
    fs.writeFileSync(`${elementDir}index.js`, block);
});
