import type { APIRequestContext, Locator, Page } from '@playwright/test';
import { createContent } from './content';
import { makePNG } from './images';
import { expect } from './test';

type FilePayload = { name: string; mimeType: string; buffer: Buffer };
type Box = { x: number; y: number; width: number; height: number };

function apiURL() {
  const hostname = process.env.BACKEND_HOST || '127.0.0.1';
  const siteId = process.env.SITE_ID || 'plone';
  return process.env.API_PATH || `http://${hostname}:55001/${siteId}`;
}

/** The editor's tool buttons, in the order the navigation shows them. */
export const TOOLS = [
  'crop',
  'rotate-left',
  'rotate-right',
  'flip-horizontal',
  'flip-vertical',
  'reset-rotation',
  'saturation',
  'brightness',
  'contrast',
  'hue',
] as const;

/** A tool button of the editor's navigation. The buttons have no labels. */
export function tool(page: Page, name: (typeof TOOLS)[number]): Locator {
  return page
    .locator('.image-editor-navigation__buttons button')
    .nth(TOOLS.indexOf(name));
}

/** The cancel and save buttons of the editor. */
export function cancelButton(page: Page) {
  return page.locator('.image-editor-navigation__action-buttons .cancel');
}

export function saveButton(page: Page) {
  return page.locator('.image-editor-navigation__action-buttons button').last();
}

/** Opens the add form of an Image through the toolbar, as an editor does. */
export async function openAddImageForm(page: Page) {
  await page.goto('/');
  await page.locator('#toolbar-add').click();
  await page.locator('#toolbar-add-image').click();
  await expect(page.locator('#toolbar-save')).toBeVisible();
}

/** Drops a file on the image field and waits for its preview. */
export async function uploadImage(page: Page, file: FilePayload) {
  await page.locator('input#field-image').setInputFiles(file);
  await expect(page.locator('#field-image-image')).toBeVisible();
}

/** Creates an Image content item with a generated PNG. */
export async function createImage(
  request: APIRequestContext,
  id: string,
  width: number,
  height: number,
) {
  await createContent(request, {
    contentType: 'Image',
    contentId: id,
    contentTitle: id,
    bodyModifier: (body) => ({
      ...body,
      image: {
        data: makePNG(width, height).toString('base64'),
        encoding: 'base64',
        filename: `${id}.png`,
        'content-type': 'image/png',
      },
    }),
  });
}

/**
 * The editor loads a stored image from its `download` URL, which points to
 * the backend. The acceptance backend runs on another origin and sends no
 * CORS headers, so the browser would refuse the image. Adds the header, as a
 * deployment that serves both under one origin (or allows CORS) would.
 */
export async function allowBackendImages(page: Page) {
  const backend = new URL(apiURL()).origin;
  await page.route(`${backend}/**/@@images/**`, async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), 'access-control-allow-origin': '*' },
    });
  });
}

/** Opens the image editor and waits until the cropper shows the image. */
export async function openEditor(page: Page) {
  await page.getByRole('button', { name: 'Edit image' }).click();
  const modal = page.locator('.image-cropper-modal');
  await expect(modal).toBeVisible();
  await waitForCropper(page);
  return modal;
}

/** Waits until the cropper has drawn the image and its stencil. */
export async function waitForCropper(page: Page) {
  const modal = page.locator('.image-cropper-modal');
  await expect(
    modal.locator('.advanced-cropper-stencil-wrapper'),
  ).toBeVisible();
  await expect
    .poll(async () => (await cropperImage(page).boundingBox())?.width ?? 0)
    .toBeGreaterThan(0);
}

/** The canvas the cropper draws the image on. */
export function cropperImage(page: Page) {
  return page.locator('.image-cropper-modal .adjustable-image-element').first();
}

/** Clicks the editor's save button and waits for the modal to close. */
export async function saveEditor(page: Page) {
  await saveButton(page).click();
  await expect(page.locator('.image-cropper-modal')).toBeHidden();
}

/** The source and natural size of the image shown in the field's preview. */
export async function previewImage(page: Page) {
  return page.locator('#field-image-image').evaluate(async (element) => {
    const image = element as HTMLImageElement;
    await image.decode();
    return {
      src: image.currentSrc || image.src,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  });
}

/** Saves the content form and returns the path of the saved content. */
export async function saveContent(page: Page) {
  await page.locator('#toolbar-save').click();
  await expect(page).not.toHaveURL(/\/(add|edit)(\?.*)?$/);
  await expect(page.locator('#toolbar-save')).toBeHidden();
  return new URL(page.url()).pathname;
}

/** Reads the stored image field of a content item through the REST API. */
export async function storedImage(request: APIRequestContext, path: string) {
  const response = await request.get(`${apiURL()}${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from('admin:secret').toString('base64')}`,
    },
  });
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as {
    image: { width: number; height: number; 'content-type': string };
  };
  return body.image;
}

/** The bounding boxes of the cropper, the image and the stencil. */
export async function cropperLayout(page: Page) {
  const modal = page.locator('.image-cropper-modal');
  const [cropper, image, stencil] = await Promise.all([
    modal.locator('.advanced-cropper').boundingBox(),
    cropperImage(page).boundingBox(),
    modal.locator('.advanced-cropper-stencil-wrapper').boundingBox(),
  ]);
  if (!cropper || !image || !stencil) {
    throw new Error('The cropper is not rendered');
  }
  return { cropper, image, stencil };
}

const centre = (box: Box) => ({
  x: box.x + box.width / 2,
  y: box.y + box.height / 2,
});

/** Asserts that two boxes share their centre, within `tolerance` pixels. */
export function expectCentred(inner: Box, outer: Box, tolerance = 2) {
  const a = centre(inner);
  const b = centre(outer);
  expect(Math.abs(a.x - b.x), 'horizontal offset').toBeLessThanOrEqual(
    tolerance,
  );
  expect(Math.abs(a.y - b.y), 'vertical offset').toBeLessThanOrEqual(tolerance);
}

/**
 * Asserts that `image` fits `area`: it lies inside, and fills it along one
 * axis, as the `fit-area` restriction shows a whole image as large as it can.
 */
export function expectFitted(image: Box, area: Box, tolerance = 2) {
  expect(image.width).toBeLessThanOrEqual(area.width + tolerance);
  expect(image.height).toBeLessThanOrEqual(area.height + tolerance);
  const gap = Math.min(area.width - image.width, area.height - image.height);
  expect(gap, 'gap along the filled axis').toBeLessThanOrEqual(tolerance);
}
