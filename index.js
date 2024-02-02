'use strict';

import inquirer from "inquirer";
import Rx from 'rxjs';
import AdminTemplateController from './adminTemplateController.js';
import StorefrontTemplateController from './storefrontTemplateController.js';

export default function () {
    let questions = [
        {
            type: 'list',
            name: 'type',
            message: "Block or Element?",
            choices: ['block', 'element'],
        },
        {
            type: 'list',
            name: 'block-type',
            message: 'Choose your block-type:',
            choices: ["text", "text-image", "image", "commerce", "form", "sidebar", "video"],
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

    const prompts = new Rx.Subject();
    const adminTemplate = new AdminTemplateController("", "");
    const storefrontTemplate = new StorefrontTemplateController("", "");

    inquirer.prompt(prompts).ui.process.subscribe(async function (event) {
        let nextQuestion = null;

        switch (event.name) {
            case "type":
                adminTemplate.setType(event.answer);
                storefrontTemplate.setType(event.answer);
                if (event.answer === "block") {
                    nextQuestion = questions[1];
                } else {
                    nextQuestion = questions[2];
                }
                break;
            case "block-type":
                nextQuestion = questions[2];
                adminTemplate.setBlockType(event.answer);
                break;
            case "name":
                adminTemplate.setName(event.answer);
                storefrontTemplate.setName(event.answer);
                break;
        }

        if (nextQuestion) {
            prompts.next(nextQuestion);
        } else {
            adminTemplate.createFromTemplates();
            storefrontTemplate.createFromTemplates();
            prompts.complete();
        }
    });

    prompts.next(questions[0]);

}
