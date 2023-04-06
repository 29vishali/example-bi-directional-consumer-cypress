const productResponse = require('../fixtures/product.json')

describe('product page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/userLocationRoles'
      },
      {
        statusCode: 200,
        body: { ...productResponse },
        headers: {
          'access-control-allow-origin': '*',
          Cookie:
            'token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4OTYwMzNhZC0yYzcwLTRkNmMtOTY1Ny1mZWVlOWE0OGQxOTUiLCJzZXNzaW9uSWQiOiI4MjhjMDkyOC0xNTE1LTQyZWQtYmJkOS1jM2Q4OTBhOTBlMDkiLCJleHAiOjE2ODA3OTUyNjUsImlhdCI6MTY4MDc5MTY2NX0.diE_CJjg1aI0g7CNlLNc-9Q-J0Bqj5CtC0hB5JYIC1WI4Ooi5aE06OsQaEy2ChxF_HeNH2dYSDvMJtREfkJV3Q'
        }
      }
    ).as('getProduct')
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
    cy.usePactWait(['getProduct'])
  })
})
