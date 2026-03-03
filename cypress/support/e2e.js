import 'cypress-axe';
import 'cypress-file-upload';
import './commands';
import { setup, teardown } from '@plone/volto/cypress/support/reset-fixture';

Cypress.on('uncaught:exception', (err, _runnable, promise) => {
  const errorText = `${err?.message || ''} ${err?.stack || ''}`.toLowerCase();

  if (
    errorText.includes('script error') ||
    errorText.includes('cross origin script') ||
    promise
  ) {
    return false;
  }
});

beforeEach(function () {
  cy.log('Setting up API fixture');
  setup();
});

afterEach(function () {
  cy.log('Tearing down API fixture');
  teardown();
});
