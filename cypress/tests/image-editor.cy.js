context('Image Editor Add-on Acceptance Tests', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      const errorText =
        `${err?.message || ''} ${err?.stack || ''}`.toLowerCase();
      if (
        errorText.includes('script error') ||
        errorText.includes('cross origin script')
      ) {
        return false;
      }
    });
  });

  const openImageAddFormWithUpload = () => {
    cy.viewport('macbook-16');
    cy.autologin();
    cy.visit('/');

    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    cy.get('input[name="title"]').clear().type('Image editor acceptance test');

    cy.fixture('image.png', 'base64')
      .then((fc) => Cypress.Blob.base64StringToBlob(fc))
      .then((fileContent) => {
        cy.get('input#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
      });

    cy.get('#field-image-image').should('be.visible');
  };

  const openEditor = () => {
    cy.get('.image-widget-cropper button').first().should('be.visible').click();
    cy.get('.image-cropper-modal').should('be.visible');
  };

  it('shows the image editor CTA only after image upload', () => {
    cy.viewport('macbook-16');
    cy.autologin();
    cy.visit('/');

    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    cy.get('.image-widget-cropper').should('not.exist');

    cy.fixture('image.png', 'base64')
      .then((fc) => Cypress.Blob.base64StringToBlob(fc))
      .then((fileContent) => {
        cy.get('input#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
      });

    cy.get('.image-widget-cropper').should('be.visible');
  });

  it('opens editor modal and renders navigation controls', () => {
    openImageAddFormWithUpload();
    openEditor();

    cy.get('.image-editor').should('be.visible');
    cy.get('.image-editor-navigation').should('be.visible');
    cy.get('.image-editor-navigation__buttons button').should(
      'have.length',
      10,
    );
  });

  it('opens and closes settings modal', () => {
    openImageAddFormWithUpload();
    openEditor();

    cy.get('.image-editor-settings-modal__toggle').click();
    cy.get('.image-editor-settings-modal__overlay').should('be.visible');

    cy.get('.image-editor-settings-modal__close').click();
    cy.get('.image-editor-settings-modal__overlay').should('not.exist');
  });

  it('shows adjustment slider on brightness mode', () => {
    openImageAddFormWithUpload();
    openEditor();

    cy.get('.image-editor-navigation__buttons button').eq(7).click();
    cy.get('.image-editor__slider').should('be.visible');
    cy.get('.react-aria-Slider').should('be.visible');
  });

  it('closes modal on cancel and on save', () => {
    openImageAddFormWithUpload();
    openEditor();

    cy.get('.image-editor-navigation__action-buttons .cancel').click();
    cy.get('.image-cropper-modal').should('not.exist');

    openEditor();
    cy.get('.image-editor-navigation__action-buttons button').last().click();
    cy.get('.image-cropper-modal').should('not.exist');
  });
});
