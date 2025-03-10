import { test, expect } from "@playwright/test";
import * as fs from "fs";

const placeTypes = [
  "School",
  "Care Home",
  "Hospital",
  "Business",
  "Place Of Worship",
];

interface Place {
  type: string;
  category?: string;
  name?: string;
  address?: string;

  postCode?: string;

  phoneNumber?: string;
  webSite?: string;

  latitudeText?: string;
  longitudeText?: string;
}

test("test", async ({ page }) => {
  let places: Place[] = [];

  // await page.goto(
  //   "https://consent.google.co.uk/m?continue=https://www.google.co.uk/maps&gl=GB&m=0&pc=m&uxe=eomtm&cm=2&hl=en&src=1"
  // );
  // await page.getByRole("button", { name: "Reject all" }).click();
  // await page.getByLabel("Search Google Maps").click();
  // await page.getByLabel("Search Google Maps").fill("Schools near Dursley");
  await page.goto("https://www.google.co.uk/maps");
  await page.getByRole("button", { name: "Reject all" }).click();

  const searchProximity = "near";
  const searchLocation = "Dursley";

  for (const placeType of placeTypes) {
    // const searchTerm = `${placeType} near Stinchcombe`;
    // const searchTerm = `${placeType} in Shepton Mallet`;
    const searchTerm = `${placeType} near Dursley`;

    await page.locator("#searchboxinput").click();
    // await page.locator("#searchboxinput").fill("Schools near Dursley");
    await page.locator("#searchboxinput").fill(searchTerm);
    await page.locator("#searchboxinput").press("Enter");

    // const anchorUrlToken = "/maps/place";

    await page.waitForTimeout(5000);
    const allListings = await page
      // .locator('//a[contains(@href, "https://www.google.com/maps/place")]')
      .locator('//a[contains(@href, "/maps/place")]')
      .all();

    let placeCount = allListings.length;

    if (placeCount < 1) {
      // expect(false).toBe(true);
      continue;
    }

    // const endOfListLocator = page.locator('//span[contains(@class, "HlvSq")]');
    // # scrolling
    await page.hover('//a[contains(@href, "/maps/place")]');

    // # this variable is used to detect if the bot
    // # scraped the same number of listings in the previous iteration
    let previously_counted = placeCount;

    let listings = await page
      .locator('//a[contains(@href, "/maps/place")]')
      .all();
    // print(f"Arrived at all available\nTotal Scraped: {len(listings)}")

    console.log(`listingsCount = ${listings.length}`);

    previously_counted = listings.length;

    while (true) {
      await page.mouse.wheel(0, 10000);
      await page.waitForTimeout(3000);

      //         # logic to break from loop to not run infinitely
      //         # in case arrived at all available listings
      // const currentItemCount = await page
      //   .locator('//a[contains(@href, "/maps/place")]')
      //   .count();

      listings = await page
        .locator('//a[contains(@href, "/maps/place")]')
        .all();

      await page.waitForTimeout(3000);

      const currentItemCount = listings.length;

      if (currentItemCount == previously_counted) {
        listings = await page
          .locator('//a[contains(@href, "/maps/place")]')
          .all();
        console.log(
          `Arrived at all available\nTotal Scraped: ${listings.length}`
        );

        previously_counted = currentItemCount;

        break;
      } else {
        previously_counted = await page
          .locator('//a[contains(@href, "/maps/place")]')
          .count();

        console.log(`Currently Scraped: ${previously_counted}`);
      }

      // while True:

      //     if (
      //         page.locator(
      //             '//a[contains(@href, "https://www.google.com/maps/place")]'
      //         ).count()
      //         >= total
      //     ):
      //         listings = page.locator(
      //             '//a[contains(@href, "https://www.google.com/maps/place")]'
      //         ).all()[:total]
      //         listings = [listing.locator("xpath=..") for listing in listings]
      //         print(f"Total Scraped: {len(listings)}")
      //         break
      //     else:
      //         # logic to break from loop to not run infinitely
      //         # in case arrived at all available listings
      //         if (
      //             page.locator(
      //                 '//a[contains(@href, "https://www.google.com/maps/place")]'
      //             ).count()
      //             == previously_counted
      //         ):
      //             listings = page.locator(
      //                 '//a[contains(@href, "https://www.google.com/maps/place")]'
      //             ).all()
      //             print(f"Arrived at all available\nTotal Scraped: {len(listings)}")
      //             break
      //         else:
      //             previously_counted = page.locator(
      //                 '//a[contains(@href, "https://www.google.com/maps/place")]'
      //             ).count()
      //             print(
      //                 f"Currently Scraped: ",
      //                 page.locator(
      //                     '//a[contains(@href, "https://www.google.com/maps/place")]'
      //                 ).count(),
      //             )
    }

    //         name_attibute = 'aria-label'
    //         address_xpath = '//button[@data-item-id="address"]//div[contains(@class, "fontBodyMedium")]'
    //         website_xpath = '//a[@data-item-id="authority"]//div[contains(@class, "fontBodyMedium")]'
    //         phone_number_xpath = '//button[contains(@data-item-id, "phone:tel:")]//div[contains(@class, "fontBodyMedium")]'
    //         review_count_xpath = '//button[@jsaction="pane.reviewChart.moreReviews"]//span'
    //         reviews_average_xpath = '//div[@jsaction="pane.reviewChart.moreReviews"]//div[@role="img"]'
    const name_attibute = "aria-label";
    const category_xpath = '//button[contains(@class, "DkEaL ")]';

    const address_xpath =
      '//button[@data-item-id="address"]//div[contains(@class, "fontBodyMedium")]';
    const phone_number_xpath =
      '//button[contains(@data-item-id, "phone:tel:")]//div[contains(@class, "fontBodyMedium")]';
    const website_xpath =
      '//a[@data-item-id="authority"]//div[contains(@class, "fontBodyMedium")]';

    let listingIndex = 0;

    for (const listing of listings) {
      await page.waitForTimeout(3000);
      // let listing = listings[0];

      const headlineLocator = listing
        .locator("..")
        .locator("..")
        .locator('//div[contains(@class, "qBF1Pd")]');

      const headline = await headlineLocator.innerText();

      await headlineLocator.click({ force: true });
      await headlineLocator.click({ force: true });
      await page.waitForTimeout(3000);

      console.log(`placeIndex [${++listingIndex}] of [${previously_counted}]`);

      const urlText = page.url();
      console.log(`URL = [${urlText}]`);

      const url = new URL(urlText);
      const urlPathName = url.pathname;
      console.log(`urlPathName = [${urlPathName}]`);
      const urlPathNameParts = urlPathName.split("/");
      const coordsSegment = urlPathNameParts[4];
      console.log(`coordsSegment = [${coordsSegment}]`);
      const coordsTrimmed = coordsSegment.replace("@", "").replace("z", "");
      console.log(`coordsSegment = [${coordsTrimmed}]`);
      const coordsParts = coordsTrimmed.split(",");
      console.log(`coordsParts[0] = [${coordsParts[0]}]`);
      console.log(`coordsParts[1] = [${coordsParts[1]}]`);

      const dataSegment = urlPathNameParts.find((val) =>
        val.startsWith("data=")
      );
      const dataParts = dataSegment?.replace("data=", "").split("!");
      const latDataPart = dataParts
        ?.find((val) => val.startsWith("3d"))
        ?.replace("3d", "");
      const longDataPart = dataParts
        ?.find((val) => val.startsWith("4d"))
        ?.replace("4d", "");

      // const coordsParts = coordsTrimmed.split(",");
      console.log(`latDataPart = [${latDataPart}]`);
      console.log(`longDataPart = [${longDataPart}]`);

      const nameValue = await listing.getAttribute(name_attibute);
      const category = await page.locator(category_xpath).innerText();

      const businessName = nameValue!.length ? nameValue : "";

      const addressLocator = page.locator(address_xpath).last();
      const haveAddress = (await addressLocator.count()) > 0;

      const addressLocators = await addressLocator.all();
      // const firstAddressLocator = haveAddress ? addressLocators[0] : null;
      const lastAddressLocator = haveAddress ? addressLocator : null;

      // const firstAddressLocatorOuterHtml =
      //   await firstAddressLocator!.innerHTML();

      const address = haveAddress ? await lastAddressLocator!.innerText() : "";

      let postCode = "";
      if (!!address) {
        const addressParts = address.split(" ");
        const postCodeParts =
          addressParts.length > 2 ? addressParts.slice(-2) : [];
        postCode = postCodeParts.join(" ");
      }

      const phoneNumberLocator = page.locator(phone_number_xpath).last();
      const havePhoneNumber = (await phoneNumberLocator.count()) > 0;

      const phoneNumber = havePhoneNumber
        ? await phoneNumberLocator.innerText()
        : "";

      // const website = await page.locator(website_xpath).innerText();
      const websiteLocator = page.locator(website_xpath).last();
      const haveWebsite = (await websiteLocator.count()) > 0;

      const websiteDomain = haveWebsite ? await websiteLocator.innerText() : "";

      const listingPlace: Place = {
        type: placeType,
        category: category,
        name: businessName || undefined,
        address: address || undefined,
        postCode: postCode,
        phoneNumber: phoneNumber,
        webSite: !!websiteDomain ? `https://${websiteDomain}` : "",
        latitudeText: latDataPart,
        longitudeText: longDataPart,
      };

      console.log(`The placeType is ${listingPlace.type}`);
      console.log(`The category is ${listingPlace.category}`);
      console.log(`The businessName is ${listingPlace.name}`);
      console.log(`The business Address is ${listingPlace.address}`);
      console.log(`The business PostCode is ${listingPlace.postCode}`);
      console.log(`The business Phone is ${listingPlace.phoneNumber}`);
      console.log(`The business Web Site is ${listingPlace.webSite}`);
      console.log(`The business latitudeText is ${listingPlace.latitudeText}`);
      console.log(
        `The business longitudeText is ${listingPlace.longitudeText}`
      );

      places.push(listingPlace);
    }
  }

  const placesCsv = [
    [
      "Type",
      "Category",
      "Name",
      "Address",
      "Postcode",
      "Telephone",
      "WebSite",
      "Latitude",
      "Longitude",
    ],
    ...places.map((place) => [
      place.type,
      place.category,
      place.name,
      place.address,
      place.postCode,
      place.phoneNumber,
      place.webSite,
      place.latitudeText,
      place.longitudeText,
    ]),
  ]
    .map((e) => e.join("|"))
    .join("\n");

  console.log(placesCsv);

  const fileFullPath = `C:\\Martin\\Docs\\2025\\Gis\\${searchLocation}.${searchProximity}.csv`;

  fs.writeFileSync(fileFullPath, placesCsv, "utf-8");

  // // # scraping
  // listings.forEach((listing) => {
  //   listing.click();
  // });
  // for listing in listings:
  //     try:
  //         listing.click()
  //         page.wait_for_timeout(5000)

  //         name_attibute = 'aria-label'
  //         address_xpath = '//button[@data-item-id="address"]//div[contains(@class, "fontBodyMedium")]'
  //         website_xpath = '//a[@data-item-id="authority"]//div[contains(@class, "fontBodyMedium")]'
  //         phone_number_xpath = '//button[contains(@data-item-id, "phone:tel:")]//div[contains(@class, "fontBodyMedium")]'
  //         review_count_xpath = '//button[@jsaction="pane.reviewChart.moreReviews"]//span'
  //         reviews_average_xpath = '//div[@jsaction="pane.reviewChart.moreReviews"]//div[@role="img"]'

  //         business = Business()

  //         if len(listing.get_attribute(name_attibute)) >= 1:

  //             business.name = listing.get_attribute(name_attibute)
  //         else:
  //             business.name = ""
  //         if page.locator(address_xpath).count() > 0:
  //             business.address = page.locator(address_xpath).all()[0].inner_text()
  //         else:
  //             business.address = ""
  //         if page.locator(website_xpath).count() > 0:
  //             business.website = page.locator(website_xpath).all()[0].inner_text()
  //         else:
  //             business.website = ""
  //         if page.locator(phone_number_xpath).count() > 0:
  //             business.phone_number = page.locator(phone_number_xpath).all()[0].inner_text()
  //         else:
  //             business.phone_number = ""
  //         if page.locator(review_count_xpath).count() > 0:
  //             business.reviews_count = int(
  //                 page.locator(review_count_xpath).inner_text()
  //                 .split()[0]
  //                 .replace(',','')
  //                 .strip()
  //             )
  //         else:
  //             business.reviews_count = ""

  //         if page.locator(reviews_average_xpath).count() > 0:
  //             business.reviews_average = float(
  //                 page.locator(reviews_average_xpath).get_attribute(name_attibute)
  //                 .split()[0]
  //                 .replace(',','.')
  //                 .strip())
  //         else:
  //             business.reviews_average = ""

  //         business.latitude, business.longitude = extract_coordinates_from_url(page.url)

  //         business_list.business_list.append(business)
  //     except Exception as e:
  //         print(f'Error occured: {e}')

  // await page
  //   .getByLabel("Dursley C of E Primary School", { exact: true })
  //   .click();
  // await page
  //   .getByRole("heading", { name: "Dursley C of E Primary School" })
  //   .click();
  // await page
  //   .getByRole("heading", { name: "Dursley C of E Primary School" })
  //   .click();
});
