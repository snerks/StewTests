import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://consent.google.co.uk/m?continue=https://www.google.co.uk/maps&gl=GB&m=0&pc=m&uxe=eomtm&cm=2&hl=en&src=1"
  );
  await page.getByRole("button", { name: "Reject all" }).click();
  await page.goto("https://www.google.co.uk/maps");
  await page.getByLabel("Search Google Maps").click();
  await page.getByLabel("Search Google Maps").fill("Schools near Dursley");
  // await page.locator("#searchboxinput").click();
  // await page.locator("#searchboxinput").click();
  // await page.locator("#searchboxinput").press("ArrowRight");
  // await page.locator("#searchboxinput").press("ArrowRight");
  // await page.locator("#searchboxinput").press("ArrowRight");
  await page.locator("#searchboxinput").press("Enter");
  await page
    .getByLabel("Dursley C of E Primary School", { exact: true })
    .click();
  await page
    .getByRole("main", { name: "Dursley C of E Primary School" })
    .getByLabel("Close", { exact: true })
    .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "Dursley C of E Primary School", exact: true })
  //   .click();
  // await page
  //   .getByRole("link", { name: "Dursley C of E Primary School", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "Dursley C of E Primary School", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "Dursley C of E Primary School", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "Dursley C of E Primary School", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByLabel("Into The Green Forest School", { exact: true })
  //   .click();
  // await page
  //   .getByRole("heading", { name: "Into The Green Forest School", exact: true })
  //   .click();
  // await page.getByLabel("Address: C/O Breakheart").click();
  // await page.getByLabel("Phone: 07962").click();
  // await page.getByLabel("The Peak Academy", { exact: true }).click();
  // await page
  //   .getByRole("link", { name: "The Peak Academy", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "The Peak Academy", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "The Peak Academy", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "The Peak Academy", exact: true })
  //   .press("ArrowDown");
  // await page
  //   .getByRole("link", { name: "The Peak Academy", exact: true })
  //   .press("ArrowDown");
});
