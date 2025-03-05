import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://earth.google.com/web/");
  await page.goto(
    "https://earth.google.com/static/multi-threaded/versions/10.75.0.2/index.html?"
  );
  await page.goto("https://earth.google.com/web/");
  await page.goto(
    "https://earth.google.com/web/@0,0,0a,22251752.77375655d,35y,0h,0t,0r/data=QgIIAA"
  );
  await page.goto(
    "https://earth.google.com/web/@0,0,0a,22251752.77375655d,35y,0h,0t,0r/data=CgRCAggBQgIIAEoNCP___________wEQAA"
  );
  await page.goto(
    "https://earth.google.com/web/@0,-0.21432495,0a,22251752.77375655d,35y,0h,0t,0r/data=CgRCAggBQgIIAEoNCP___________wEQAA"
  );
  await page.goto(
    "https://earth.google.com/web/@0,-2.21812988,0a,22251752.77375655d,35y,0h,0t,0r/data=CgRCAggBQgIIAEoNCP___________wEQAA"
  );
  await page.goto(
    "https://earth.google.com/web/@0,-6.331,0a,22251752.77375655d,35y,0h,0t,0r/data=CgRCAggBQgIIAEoNCP___________wEQAA"
  );
  await page.locator("#earth-canvas").click({
    position: {
      x: 181,
      y: 48,
    },
  });
  await page
    .getByPlaceholder("Search Google Earth")
    .fill("Schools near Dursly");
  await page.getByPlaceholder("Search Google Earth").press("ArrowLeft");
  await page
    .getByPlaceholder("Search Google Earth")
    .fill("Schools near Dursley");
  await page.getByPlaceholder("Search Google Earth").press("ArrowRight");
  await page.getByPlaceholder("Search Google Earth").press("Enter");
  await page.goto(
    "https://earth.google.com/web/search/Schools+near+Dursley/@51.6885769,-2.3306718,109.54992125a,14411.65043276d,35y,0h,0t,0r/data=CiwiJgokCT61e4A0WjhAET61e4A0WjjAGRGfP2q-KDVAISMSp3Onf1XAQgIIAUICCABKDQj___________8BEAA"
  );
  await page.locator("#earth-canvas").click({
    position: {
      x: 59,
      y: 144,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 170,
      y: 159,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 1006,
      y: 171,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 1029,
      y: 314,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 116,
      y: 230,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 1023,
      y: 167,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 1050,
      y: 307,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 1036,
      y: 461,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 987,
      y: 555,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 640,
      y: 422,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 246,
      y: 460,
    },
  });
  await page.locator("#earth-canvas").click({
    position: {
      x: 79,
      y: 52,
    },
  });
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#earth-canvas").click({
    position: {
      x: 177,
      y: 311,
    },
  });
  const download = await downloadPromise;
});
