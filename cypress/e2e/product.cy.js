const productResponse = require('../fixtures/product.json')
const activeSession = require('../fixtures/activeSession.json')

describe('product page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: '**/checkForActive'
      },
      {
        statusCode: 200,
        body: { ...activeSession }
      }
    ).as('getActiveSession')
    
    cy.setupPact(Cypress.env('PACT_CONSUMER'), Cypress.env('PACT_PROVIDER'))

    const auth =  {
        username:"sally",
        password:"ilovesally<3",
      };
  cy.visit('https://www.admin.stg.supplyally.gov.sg/', { auth });
  })

  it('displays cfp card', () => {
    cy.get(`[data-cy="mock-sp-login-button"]`).click();
    cy.get(`[data-cy=cfp-campaign-card]`).first().should("be.visible"); // should validate the stubbed response
  })

  after(() => {
    cy.usePactWait(['getActiveSession'])
  })
})
