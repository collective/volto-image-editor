import {
  TOOLS,
  allowBackendImages,
  cancelButton,
  createImage,
  openAddImageForm,
  openEditor,
  previewImage,
  saveContent,
  saveEditor,
  storedImage,
  tool,
  uploadImage,
} from './editor';
import { pngFile } from './images';
import { login } from './login';
import { expect, test } from './test';

// The default `aspectRatio` in the add-on settings.
const DEFAULT_RATIO = 16 / 9;

test.describe('Image editor', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('The Edit image button appears only after an image is uploaded', async ({
    page,
  }) => {
    await openAddImageForm(page);
    await expect(page.locator('.image-widget-cropper')).toHaveCount(0);

    await uploadImage(page, pngFile(400, 300));
    await expect(
      page.getByRole('button', { name: 'Edit image' }),
    ).toBeVisible();
  });

  test('The editor shows the image and its tools', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(400, 300));
    await openEditor(page);

    await expect(page.locator('.image-editor')).toBeVisible();
    await expect(
      page.locator('.image-editor-navigation__buttons button'),
    ).toHaveCount(TOOLS.length);
    await expect(
      page.locator('.image-editor-navigation__action-buttons button'),
    ).toHaveCount(2);
    await expect(tool(page, 'crop')).toHaveClass(/image-editor-button--active/);
    await expect(tool(page, 'reset-rotation')).toBeDisabled();
  });

  test('The settings open and close', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(400, 300));
    await openEditor(page);

    await page.locator('.image-editor-settings-modal__toggle').click();
    const overlay = page.locator('.image-editor-settings-modal__overlay');
    await expect(overlay).toBeVisible();
    await expect(
      overlay.getByRole('heading', { name: 'Editor Settings' }),
    ).toBeVisible();

    await page.locator('.image-editor-settings-modal__close').click();
    await expect(overlay).toHaveCount(0);
  });

  for (const mode of ['saturation', 'brightness', 'contrast', 'hue'] as const) {
    test(`The ${mode} mode shows its slider`, async ({ page }) => {
      await openAddImageForm(page);
      await uploadImage(page, pngFile(400, 300));
      await openEditor(page);
      await expect(page.locator('.image-editor__slider')).toHaveCount(0);

      await tool(page, mode).click();
      await expect(tool(page, mode)).toHaveClass(/image-editor-button--active/);
      await expect(tool(page, 'crop')).not.toHaveClass(
        /image-editor-button--active/,
      );
      const slider = page.locator('.image-editor__slider .react-aria-Slider');
      await expect(slider).toBeVisible();
      await expect(slider.locator('.react-aria-Label')).toHaveText(
        mode.charAt(0).toUpperCase() + mode.slice(1),
      );
    });
  }

  test('An adjustment can be reset', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(400, 300));
    await openEditor(page);
    const reset = page.locator('.image-editor__reset-button');
    await expect(reset).toHaveClass(/image-editor__reset-button--hidden/);

    await tool(page, 'brightness').click();
    const thumb = page.locator('.image-editor__slider input[type="range"]');
    await thumb.focus();
    for (let step = 0; step < 5; step++) {
      await thumb.press('ArrowRight');
    }
    await expect(page.locator('.image-editor__slider output')).toHaveText('5');
    await expect(reset).not.toHaveClass(/image-editor__reset-button--hidden/);

    await reset.click();
    await expect(reset).toHaveClass(/image-editor__reset-button--hidden/);
    await expect(tool(page, 'crop')).toHaveClass(/image-editor-button--active/);
    await expect(page.locator('.image-editor__slider')).toHaveCount(0);
  });

  test('Rotating and flipping can be reset', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(400, 300));
    await openEditor(page);
    const resetRotation = tool(page, 'reset-rotation');
    await expect(resetRotation).toBeDisabled();

    for (const action of [
      'rotate-left',
      'rotate-right',
      'flip-horizontal',
      'flip-vertical',
    ] as const) {
      await tool(page, action).click();
      await expect(resetRotation).toBeEnabled();
      await resetRotation.click();
      await expect(resetRotation).toBeDisabled();
    }
  });

  test('Cancel closes the editor and keeps the image', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(400, 300));
    const before = await previewImage(page);
    await openEditor(page);

    await tool(page, 'rotate-right').click();
    await cancelButton(page).click();
    await expect(page.locator('.image-cropper-modal')).toBeHidden();
    expect(await previewImage(page)).toEqual(before);
  });

  test('Saving replaces the image with the crop', async ({ page, request }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(600, 600));
    const before = await previewImage(page);
    await openEditor(page);
    await saveEditor(page);

    // The default stencil crops to 16:9.
    await expect
      .poll(async () => (await previewImage(page)).src)
      .not.toBe(before.src);
    const after = await previewImage(page);
    expect(after.width / after.height).toBeCloseTo(DEFAULT_RATIO, 1);

    // And that is the image stored with the content.
    const path = await saveContent(page);
    const stored = await storedImage(request, path);
    expect(stored.width).toBe(after.width);
    expect(stored.height).toBe(after.height);
  });

  test('The aspect ratio can be changed in the settings', async ({ page }) => {
    await openAddImageForm(page);
    await uploadImage(page, pngFile(800, 400));
    const before = await previewImage(page);
    await openEditor(page);

    await page.locator('.image-editor-settings-modal__toggle').click();
    const square = page
      .locator('.image-editor-settings-modal__icon-option')
      .filter({ hasText: /^1:1$/ });
    await square.click();
    await expect(square).toHaveClass(/active/);
    await page.locator('.image-editor-settings-modal__close').click();
    await saveEditor(page);

    await expect
      .poll(async () => (await previewImage(page)).src)
      .not.toBe(before.src);
    const after = await previewImage(page);
    expect(after.width / after.height).toBeCloseTo(1, 1);
  });

  test('An existing image can be edited', async ({ page, request }) => {
    await createImage(request, 'picture', 900, 600);
    await allowBackendImages(page);
    await page.goto('/picture/edit');
    await expect(page.locator('#toolbar-save')).toBeVisible();

    await openEditor(page);
    await saveEditor(page);
    await expect
      .poll(async () => {
        const { width, height } = await previewImage(page);
        return width / height;
      })
      .toBeCloseTo(DEFAULT_RATIO, 1);

    await saveContent(page);
    const stored = await storedImage(request, '/picture');
    expect(stored.width / stored.height).toBeCloseTo(DEFAULT_RATIO, 1);
  });
});
