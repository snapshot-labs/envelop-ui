describe('Unsubscribe', () => {
  const email = 'test@snapshot.org';
  const signature = '0x0000';

  it('sends the correct request body to the backend API', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 }).as('unsubscribe');
    cy.visit(`unsubscribe?signature=${signature}&email=${email}`);
    cy.get('[data-test="btn-submit"]').click();
    cy.get('@unsubscribe')
      .its('request.body')
      .should('deep.equal', {
        method: 'snapshot.unsubscribe',
        params: {
          email,
          signature,
          subscriptions: ['summary']
        }
      });
  });

  it('shows the unsubscribe success message when the email is unsubscribed', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 }).as('unsubscribe');
    cy.visit(`unsubscribe?signature=${signature}&email=${email}`);
    cy.get('form input:first-child()').click();
    cy.get('[data-test="btn-submit"]').click();
    cy.get('[data-test="message-success-unsubscribe"]').should('exist');
    cy.get('[data-test="btn-redirect"]').should('exist');
    cy.get('@unsubscribe')
      .its('request.body')
      .should('deep.equal', {
        method: 'snapshot.unsubscribe',
        params: {
          email,
          signature,
          subscriptions: []
        }
      });
  });

  it('shows the update success message when the preferences are updated', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 }).as('unsubscribe');
    cy.visit(`unsubscribe?signature=${signature}&email=${email}`);
    cy.get('[data-test="btn-submit"]').click();
    cy.get('[data-test="message-success-update"]').should('exist');
    cy.get('[data-test="btn-redirect"]').should('exist');
    cy.get('@unsubscribe')
      .its('request.body')
      .should('deep.equal', {
        method: 'snapshot.unsubscribe',
        params: {
          email,
          signature,
          subscriptions: ['summary']
        }
      });
  });

  it('shows an error message when the unable to build the subscriptions list', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, { statusCode: 500 });
    cy.visit('unsubscribe');
    cy.get('[data-test="message-error"]').should('exist');
    cy.get('[data-test="form"]').should('not.exist');
  });

  it('shows an error message when the unsubscribe request is failing', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 500 }).as('post');
    cy.visit('unsubscribe');
    cy.get('[data-test="btn-submit"]').click();
    cy.get('[data-test="message-error"]').should('exist');
    cy.get('[data-test="form"]').should('exist');
  });
});
