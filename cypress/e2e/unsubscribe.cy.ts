/// <reference types="cypress-image-snapshot" />
import '../support';

describe('Unsubscribe', () => {
  const email = 'test@snapshot.org';
  const signature = '0x0000';
  const subscriptions = [];

  it('sends the correct request body to the backend API', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 }).as('unsubscribe');
    cy.visit(`#/unsubscribe?signature=${signature}&email=${email}`);

    cy.get('@unsubscribe').its('request.body').should('deep.equal', {
      method: 'snapshot.unsubscribe',
      params: {
        email,
        signature,
        subscriptions
      }
    });
  });

  it('shows the success message when the email is unsubscribed', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 });
    cy.visit('#/unsubscribe');
    cy.get('[data-test="message-success"]').should('exist');
    cy.get('[data-test="btn-redirect"]').should('exist');

    cy.matchImageSnapshot();
  });

  it('shows an error message when the unsubscribe request is failing', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 500 });
    cy.visit('#/unsubscribe');
    cy.get('[data-test="message-error"]').should('exist');

    cy.matchImageSnapshot();
  });

  it('shows a button to retry when the unsubscribe request is failing', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 500 });
    cy.visit('#/unsubscribe');
    cy.get('[data-test="btn-submit"]').should('exist');
  });
});
