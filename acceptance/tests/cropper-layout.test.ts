import {
  allowBackendImages,
  createImage,
  cropperLayout,
  expectCentred,
  expectFitted,
  openAddImageForm,
  openEditor,
  uploadImage,
} from './editor';
import { pngFile } from './images';
import { login } from './login';
import { expect, test } from './test';

// When the editor opens, the image must be shown whole, as large as the
// cropper allows and centred in it, with the stencil centred on the image.
// The image was displaced on first use (issue 27): an image that is ready
// while the modal still zooms in was laid out in the scaled-down box. These
// cases open the editor with an image that is ready at once and with one that
// loads slowly, as a large image does.
test.describe('Cropper layout when the editor opens', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  async function expectLaidOut(page) {
    // Give a late measurement the time to happen before asserting.
    await page.waitForTimeout(1000);
    const { cropper, image, stencil } = await cropperLayout(page);
    expectFitted(image, cropper);
    expectCentred(image, cropper);
    expectCentred(stencil, image);
  }

  test('An uploaded image fills the cropper', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(1200, 800));
    await openEditor(page);
    await expectLaidOut(page);
  });

  test('A stored image fills the cropper', async ({ page, request }) => {
    await createImage(request, 'picture', 1200, 800);
    await allowBackendImages(page);
    await page.goto('/picture/edit');
    await expect(page.locator('#toolbar-save')).toBeVisible();
    await openEditor(page);
    await expectLaidOut(page);
  });

  test('A slowly loading image fills the cropper', async ({
    page,
    request,
  }) => {
    await createImage(request, 'picture', 1200, 800);
    await allowBackendImages(page);
    await page.goto('/picture/edit');
    await expect(page.locator('#toolbar-save')).toBeVisible();
    // Delay the image the editor loads, not the preview of the form.
    await page.route('**/@@images/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await route.fallback();
    });
    await openEditor(page);
    await expectLaidOut(page);
  });
});
