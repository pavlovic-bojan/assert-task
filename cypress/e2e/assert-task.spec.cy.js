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

    it('Validate that the buttons are visible', () => {
        cy.get(elements.Button).should('be.visible')
    })

    it('Validate that the buttons edit & delete are visible', () => {
        cy.get(elements.EditDeleteButtonLocator).should('be.visible')
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

    it('Validate clicks on each button with page reload after each click', () => {
        cy.get(elements.button).then(($buttons) => {
            const totalButtons = $buttons.length
            for (let i = 0; i < totalButtons; i++) {
                cy.visit(elements.FullPageUrl)
                cy.get(elements.button).eq(i).click()
                cy.get(elements.button).eq(i)
                    .invoke('attr', 'class')
                    .then((className) => {
                        switch (i) {
                            case 0:
                                expect(className).to.contain(elements.button_1)
                                break;
                            case 1:
                                expect(className).to.contain(elements.button_2)
                                break;
                            case 2:
                                expect(className).to.contain(elements.button_3)
                                break
                            default:
                                throw new Error(`Unexpected button index: ${i}`)
                        }
                    })
            }
        })
    })

    it('Validate that the user is on the task page and perform lighthouse performance', () => {
        cy.url().should('contains', elements.PageUrl)
        cy.title().should('eq', elements.PageTitle)
        cy.get(elements.H3OnPageLocator).should('have.text', elements.H3OnPageText)
        cy.lighthouse({
            performance: 10,
            accessibility: 10,
            "best-practices": 10,
            seo: 10,
            pwa: 10,
        })
    })

})
