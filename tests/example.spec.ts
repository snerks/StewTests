import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  const url =
    "https://earth.google.com/web/@0,-5.104,0a,22251752.77375655d,35y,0h,0t,0r/data=CgRCAggBQgIIAEoNCP___________wEQAA";

  await page.goto(url);

  // // Expect a title "to contain" a substring.
  // // await expect(page).toHaveTitle(/Playwright/);
  // // await page
  // //   .locator("main")
  // //   .filter({ hasText: "Showing events for " })
  // //   .first()
  // //   .isVisible();

  // const showingElement = page
  //   .locator("p")
  //   .filter({ hasText: "No events match your search criteria for " })
  //   .first();

  // await expect(showingElement).not.toBeVisible();

  // await page
  //   .locator("main")
  //   .filter({ hasText: "No events match your search criteria for " })
  //   .first()
  //   .isVisible();

  // await page.goto("https://bristolbeacon.org/whats-on/2025/10/18/");

  // // Expect a title "to contain" a substring.
  // // await expect(page).toHaveTitle(/Playwright/);
  // await page
  //   .locator("main")
  //   .filter({ hasText: "No events match your search criteria for " })
  //   .first()
  //   .isVisible();

  // // await expect(
  // //   page.getByRole("main").filter({ hasText: "Showing results for " })
  // // ).toBeTruthy();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
