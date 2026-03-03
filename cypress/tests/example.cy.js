context('Example Acceptance Tests', () => {
  describe('Visit a page', () => {
    beforeEach(() => {
      // Given a logged in editor
      cy.viewport('macbook-16');
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.autologin();
      cy.intercept('GET', '/**/document*').as('content');
    });

    it('As editor I can open the edit page', function () {
      cy.visit('/document');
      cy.navigate('/document/edit');
      cy.wait('@content');
      cy.get('form').should('exist');
      cy.url().should('include', '/document/edit');
      cy.get('#toolbar-save').should('be.visible');
    });
  });
});
