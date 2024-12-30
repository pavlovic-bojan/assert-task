// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />
import "@cypress-audit/lighthouse/commands"
import elements from "../fixtures/elements.json"

Cypress.Commands.add('attachVideoOnFail', () => {
    Cypress.on('test:after:run', (test, runnable) => {
        if (test.state === 'failed') {
            const videoName = `${runnable.title} (failed).mp4`
            cy.task('addAttachment', { name: 'Video', path: videoName, type: 'video/mp4' })
        }
    })
})

Cypress.Commands.add('attachScreenshotOnFail', () => {
    Cypress.on('test:after:run', (test, runnable) => {
        if (test.state === 'failed') {
            const screenshotName = `${runnable.title} (failed).png`
            cy.task('addAttachment', { name: 'Screenshot', path: screenshotName, type: 'image/png' })
        }
    })
})