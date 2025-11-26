context('Image Editor Integration Tests', () => {
  describe('ImageEditorWrapper Component', () => {
    beforeEach(() => {
      cy.viewport('macbook-16');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'test-document',
        contentTitle: 'Test Document with Image',
      });
    });

    afterEach(() => {
      cy.removeContent('test-document');
    });

    it('Should open image editor modal when clicking edit button', () => {
      cy.visit('/test-document/edit');

      cy.get('button').contains('Edit image').should('be.visible');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-cropper-modal').should('be.visible');
      cy.get('.image-editor').should('be.visible');
    });

    it('Should display image editor with navigation controls', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation').should('be.visible');
      cy.get('.image-editor-navigation__buttons').should('be.visible');

      cy.get('.image-editor-navigation__buttons button').should(
        'have.length.at.least',
        1,
      );
    });

    it('Should allow crop mode selection', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button').first().click();

      cy.get('.image-editor-button--active').should('exist');
    });

    it('Should display settings modal when clicking settings icon', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-settings-modal__toggle').should('be.visible');
      cy.get('.image-editor-settings-modal__toggle').click();

      cy.get('.image-editor-settings-modal__overlay').should('be.visible');
      cy.get('.image-editor-settings-modal__content').should('be.visible');
    });

    it('Should close settings modal when clicking close button', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();
      cy.get('.image-editor-settings-modal__toggle').click();

      cy.get('.image-editor-settings-modal__close').click();

      cy.get('.image-editor-settings-modal__overlay').should('not.exist');
    });

    it('Should close settings modal when pressing Escape key', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();
      cy.get('.image-editor-settings-modal__toggle').click();

      cy.get('.image-editor-settings-modal__overlay').type('{esc}');

      cy.get('.image-editor-settings-modal__overlay').should('not.exist');
    });

    it('Should close editor when clicking cancel button', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__action-buttons .cancel').click();

      cy.get('.image-cropper-modal').should('not.exist');
    });

    it('Should allow aspect ratio selection in settings', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();
      cy.get('.image-editor-settings-modal__toggle').click();

      cy.get('.image-editor-settings-modal__icon-option')
        .contains('1:1')
        .parent()
        .click();

      cy.get('.image-editor-settings-modal__icon-option.active').should(
        'exist',
      );
    });

    it('Should display color adjustment sliders when selecting adjustment modes', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button')
        .contains(/brightness/i)
        .click();

      cy.get('.image-editor__slider').should('be.visible');
      cy.get('.react-aria-Slider').should('be.visible');
    });

    it('Should apply rotation transformations', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button').eq(1).click();

      cy.get('.image-editor-navigation__reset-rotation')
        .should('be.visible')
        .should('not.have.class', 'image-editor-navigation__button--disabled');
    });

    it('Should enable reset rotation button after transformations', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__reset-rotation').should(
        'have.class',
        'image-editor-navigation__button--disabled',
      );

      cy.get('.image-editor-navigation__buttons button').eq(1).click();

      cy.get('.image-editor-navigation__reset-rotation').should(
        'not.have.class',
        'image-editor-navigation__button--disabled',
      );
    });

    it('Should display cropper with stencil', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor__cropper').should('be.visible');

      cy.get('.image-editor__cropper-overlay').should('exist');
    });

    it('Should show preview of cropped area', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor__preview').should('be.visible');
    });

    it('Should have accessible keyboard navigation', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button')
        .first()
        .focus()
        .should('have.focus');

      cy.focused().type('{enter}');
      cy.get('.image-editor-button--active').should('exist');
    });

    it('Should display all required icons in navigation', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons svg').should(
        'have.length.at.least',
        5,
      );
    });

    it('Should switch between different adjustment modes', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button').eq(7).click();
      cy.get('.image-editor__slider').should('be.visible');

      cy.get('.image-editor-navigation__buttons button').eq(8).click();
      cy.get('.image-editor__slider').should('be.visible');
    });

    it('Should respect image restrictions in settings', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();
      cy.get('.image-editor-settings-modal__toggle').click();

      cy.get('.image-editor-settings-modal__icon-option')
        .contains(/stencil/i)
        .parent()
        .click();

      cy.get('.image-editor-settings-modal__close').click();

      cy.get('.image-editor__cropper').should('exist');
    });

    it('Should toggle between rectangle and circle stencil', () => {
      cy.visit('/test-document/edit');
      cy.get('button').contains('Edit image').click();
      cy.get('.image-editor-settings-modal__toggle').click();

      cy.get('.image-editor-settings-modal__icon-option')
        .contains(/circle/i)
        .parent()
        .click();

      cy.get('.image-editor-settings-modal__close').click();

      cy.get('.image-editor__cropper').should('exist');
    });
  });

  describe('Image Editor Workflow', () => {
    beforeEach(() => {
      cy.viewport('macbook-16');
      cy.autologin();
      cy.createContent({
        contentType: 'Image',
        contentId: 'test-image',
        contentTitle: 'Test Image',
      });
    });

    afterEach(() => {
      cy.removeContent('test-image');
    });

    it('Should complete full edit workflow: crop, adjust, and save', () => {
      cy.visit('/test-image/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button').first().click();

      cy.get('.image-editor-navigation__buttons button').eq(7).click();
      cy.get('.react-aria-Slider').should('be.visible');

      cy.get('.image-editor-navigation__action-buttons button')
        .contains(/save/i)
        .click();

      cy.get('.image-cropper-modal').should('not.exist');
    });

    it('Should reset all adjustments when clicking reset button', () => {
      cy.visit('/test-image/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation__buttons button').eq(7).click();

      cy.get('.image-editor__reset-button').should('be.visible').click();

      cy.get('.image-editor-navigation__buttons button')
        .first()
        .should('have.class', 'image-editor-button--active');
    });
  });

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'responsive-test',
        contentTitle: 'Responsive Test',
      });
    });

    afterEach(() => {
      cy.removeContent('responsive-test');
    });

    it('Should display correctly on mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.visit('/responsive-test/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor-navigation').should('be.visible');
      cy.get('.image-editor-navigation__buttons').should('be.visible');
    });

    it('Should display correctly on tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.visit('/responsive-test/edit');
      cy.get('button').contains('Edit image').click();

      cy.get('.image-editor').should('be.visible');
      cy.get('.image-editor__cropper').should('be.visible');
    });
  });
});
