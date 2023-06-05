describe('Verify', () => {
  const email = 'test@snapshot.org';
  const signature = '0x0000';
  const address = '0x1111';
  const salt = '10';

  it('sends the correct request body to the backend API', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200, body: {} }).as('verify');
    cy.visit(`#/verify?address=${address}&signature=${signature}&email=${email}&salt=${salt}`);

    cy.get('@verify').its('request.body').should('deep.equal', {
      method: 'snapshot.verify',
      params: {
        email,
        address,
        signature,
        salt
      }
    });
  });

  it('shows the success message when the email is verified', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200, body: {} });
    cy.visit(`#/verify?address=${address}&signature=${signature}&email=${email}&salt=${salt}`);
    cy.get('[data-test="message-success"]').should('exist');
    cy.get('[data-test="btn-redirect"]').should('exist');
    cy.get('[data-test="btn-verify"]').should('not.exist');
  });

  it('shows an error message when the verify request is failing', () => {
    cy.visit(`#/verify?address=${address}&signature=${signature}&email=${email}&salt=${salt}`);
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 500 });
    cy.get('[data-test="message-error"]').should('exist');
    cy.get('[data-test="btn-verify"]').should('exist');
    cy.get('[data-test="btn-redirect"]').should('not.exist');
  });
});
