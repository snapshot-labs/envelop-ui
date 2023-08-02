/// <reference types="cypress-image-snapshot" />
import '../support';

describe('update', () => {
  const email = 'test@snapshot.org';
  const signature = '0x0000';

  it('sends the correct request body to the backend API', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200, body: {} }).as('update');
    cy.visit(`#/update?signature=${signature}&email=${email}`);
    cy.get('[data-test="btn-submit"]').click();
    cy.get('@update')
      .its('request.body')
      .should('deep.equal', {
        method: 'snapshot.update',
        params: {
          email,
          signature,
          subscriptions: ['summary']
        }
      });
  });

  it('shows the success message when the preferences are updated', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200, body: {} }).as('update');
    cy.visit(`#/update?signature=${signature}&email=${email}`);
    cy.get('[data-test="btn-submit"]').click();
    cy.get('[data-test="message-success"]').should('exist');
    cy.get('[data-test="btn-redirect"]').should('exist');
    cy.get('@update')
      .its('request.body')
      .should('deep.equal', {
        method: 'snapshot.update',
        params: {
          email,
          signature,
          subscriptions: ['summary']
        }
      });

    cy.matchImageSnapshot();
  });

  it('shows an error message when the unable to build the subscriptions list', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, { statusCode: 500 });
    cy.visit('#/update');
    cy.get('[data-test="message-error"]').should('exist');
    cy.get('[data-test="form"]').should('not.exist');
    cy.get('[data-test="btn-submit"]').should('not.exist');

    cy.matchImageSnapshot();
  });

  it('shows an error message when the update request is failing', () => {
    cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/subscriptionsList`, {
      statusCode: 200,
      body: { summary: { name: 'Summary', description: 'Summary description' } }
    }).as('subscriptionsList');
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 500 }).as('post');
    cy.visit('#/update');
    cy.get('[data-test="btn-submit"]').click();
    cy.get('[data-test="btn-submit"]').should('exist');
    cy.get('[data-test="message-error"]').should('exist');
    cy.get('[data-test="form"]').should('exist');

    cy.matchImageSnapshot();
  });
});
