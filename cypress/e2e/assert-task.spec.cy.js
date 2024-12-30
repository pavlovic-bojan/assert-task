import elements from '../fixtures/elements.json'

describe('Task page for Assert QA', () => {

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
    })

    it('Validate that the user is on the task page', () => {
        cy.url().should('contains', elements.PageUrl)
        cy.title().should('eq', elements.PageTitle)
        cy.get(elements.H3OnPageLocator).should('have.text', elements.H3OnPageText)
    })


    it.skip('Validate that the buttons are visible', () => {
        cy.get(elements.Button).should('be.visible')
    })

    it.skip('Validate that the buttons edit & delete are visible', () => {
        cy.get(elements.EditDeleteButtonLocator).should('be.visible')
    })

    const buttons = [elements.Button, elements.EditDeleteButtonLocator]
    buttons.forEach((button, i) => {
        it(`Validate that the buttons, and edit - delete are visible`, () => {
            cy.get(button).should('be.visible')
        })
    })

    it('Click on each edit button with text "Edit" and validate URL contains #edit', () => {
        cy.get(elements.EditDeleteButtonLocator)
            .each(($btn, i) => {
                cy.wrap($btn)
                    .invoke('text')
                    .then((buttonText) => {
                        buttonText = buttonText.trim()
                        if (buttonText === elements.EditButtonText) {
                            cy.wrap($btn)
                                .should('have.text', elements.EditButtonText)
                                .should('have.attr', 'href')
                                .and('include', elements.EditButtonUrl)
                            cy.wrap($btn).click()
                            cy.url().should('include', elements.EditButtonUrl)
                        } else {
                            cy.log(`Skipped button at index ${i} because it has text: "${buttonText}"`)
                        }
                    })
            })
    })

    it('Click on each delete button with text "Delete" and validate URL contains #delete', () => {
        cy.get(elements.EditDeleteButtonLocator)
            .each(($btn, i) => {
                cy.wrap($btn)
                    .invoke('text')
                    .then((buttonText) => {
                        buttonText = buttonText.trim()
                        if (buttonText === elements.DeleteButtonText) {
                            cy.wrap($btn)
                                .should('have.text', elements.DeleteButtonText)
                                .should('have.attr', 'href')
                                .and('include', elements.DeleteButtonUrl)
                            cy.wrap($btn).click()
                            cy.url().should('include', elements.DeleteButtonUrl)
                        } else {
                            cy.log(`Skipped button at index ${i} because it has text: "${buttonText}"`)
                        }
                    })
            })
    })

    it('Validate that the buttons are not visible - this test should always fail', () => {
        cy.get(elements.Button).should('not.be.visible')
    })

})
