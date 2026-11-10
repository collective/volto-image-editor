import { createContent } from './content';
import { login } from './login';
import { expect, test } from './test';

test.describe('Visit a page', () => {
  test.beforeEach(async ({ page, request }) => {
    // Given a logged in editor
    await createContent(request, {
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Test document',
    });
    await login(page);
  });

  test('As editor I can open the edit page', async ({ page }) => {
    await page.goto('/document');
    await page.goto('/document/edit');
    await expect(page.locator('form #field-title')).toBeVisible();
    await expect(page).toHaveURL(/\/document\/edit$/);
    await expect(page.locator('#toolbar-save')).toBeVisible();
  });
});
