'use strict';

const templateClass = require('./templateClass');
const inquirer = require('inquirer');

let questions = [
    {
        type: 'list',
        name: 'type',
        message: "Block or Element?",
        choices: ['block', 'element'],
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

inquirer.prompt(questions).then((answers) => {
    let template = new templateClass(answers.type, answers.name);
    template.createFromTemplates();
});
